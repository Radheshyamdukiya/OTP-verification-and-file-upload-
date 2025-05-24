const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const port =4000;
const mongoose=require("mongoose");
const { type } = require('os');
function connectDb(){
    mongoose.connect('mongodb+srv://collage:123%40%40%40@collage.xzsgff2.mongodb.net/?retryWrites=true&w=majority&appName=collage')
    .then(()=>{console.log("mongo db is connected")})
    .catch(()=>{console.log("mongodb is not connected")})
}
connectDb();
 
const tempschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
     type:Date,
     default:Date.now,
     expires:200
    }
})
const userotp=mongoose.model('otp',tempschema);

const nodemailer=require('nodemailer') 



function otpgenerate(){
    return Math.floor(10000+Math.random()*10000);
}

const sendotp = async (toemail, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "radheshyamdukiya002@gmail.com",
                pass: "bkkc tpje xrvu wsvf", // App Password (not Gmail login password)
            }
        });

        const mailOptions = {
            from: '"OTP Service" <radheshyamdukiya002@gmail.com>',
            to: toemail,
            subject: "Your OTP Code",
            html: `<h3>Your OTP is: <b>${otp}</b></h3>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};




app.get("/user/login",(req,res)=>{
   res.render("login")
})
app.post('/user/login',async(req,res)=>{
    const {email}=req.body;
    const otpgen=otpgenerate();
    await userotp.create({
        email,
       otp: otpgen,
    })
    .then(()=>{
        console.log("data saved")
    })
    .catch(()=>{
        console.log("data is not saved");
    })

   await sendotp(email,otpgen)
   .then(()=>{
    res.send("otp send succesfully ");
   })
   .catch(()=>{
    res.send("otp not send")
   })
})
app.post('/user/verfy-email',async(req,res)=>{
 const {otp,email}=req.body;
  const user=await userotp.findOne({email:email,otp:otp});
  if(!user){
   return res.send('otp expired');

  }
  await userotp.findOneAndDelete({email:email});
  res.send(" you are varified");

})


app.listen(port,()=>{
    console.log("app is litining on port ");
})


