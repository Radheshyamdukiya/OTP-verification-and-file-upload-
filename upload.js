const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const flash = require("connect-flash");
const port =3000;
const mongoose=require("mongoose");
const locat=path.join(__dirname, 'upload')
function connectDb(){
    mongoose.connect('mongodb+srv://collage:123%40%40%40@collage.xzsgff2.mongodb.net/?retryWrites=true&w=majority&appName=collage')
    .then(()=>{console.log("mongo db is connected")})
    .catch(()=>{console.log("mongodb is not connected")})
}
connectDb();
app.use('/upload', express.static('upload'));

 
const userdata = new mongoose.Schema({
  photo: {
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  name: {
    type: String,
    required: true
  }
});

const profile=mongoose.model('profile',userdata);

const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,locat);
    },
    filename:function(req,file,cb){
        const randome=Date.now();
        cb(null,randome+file.originalname);
    }
})
const upload=multer({storage:storage});

app.get('/user/profile',(req,res)=>{
    res.render('profile');
})
app.post('/user/profile',upload.single("image"),async(req,res)=>{
    const {name}=req.body;
    console.log(req.file)
    const file=req.file;
    try{
   const user= new profile({
    name,
    photo:{
        type:file.mimetype,
        url:file.filename
    }
   })
 await user.save();
 console.log("dta is saved");
 console.log(user.photo.url);
  res.render('showprofile',{user:user});

}
catch(err){
    console.log(err);
}
    
})

   

app.listen(port,()=>{
    console.log("app is litining on port ");
})


