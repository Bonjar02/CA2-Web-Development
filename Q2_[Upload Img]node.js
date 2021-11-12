var express=require('express');
var multer=require('multer');
var path=require('path');

var app=express();

var img_storage=multer.diskStorage({
    //-------------------- 'images' Folder For Storing Img Files ------------------------
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    //-------------------- Img file Name and Data ---------------------------------------
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() +"-"+ path.extname(file.originalname));
    }
});
var upload=multer({
    storage:img_storage,
    //-------------------- Filtering Only Images ---------------------------------------
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=="img/png" || file.mimetype=="image/jpg"|| file.mimetype=="image/jpeg"){
            cb(null,true);
        }
        else{
            return cb("File Format Not suppported..!");
        }
    }
});
//------------------- HTML Page -------------------------------------
app.get('/',(req,res)=>{
    res.sendFile( __dirname + "/" + "ca2img.html" ); 
});
//------------------- Uploading Img in Html page --------------------
app.post('/',upload.single('image'),(req,res)=>{
    res.send("Image Uploaded");
});
//-------------------- Server --------------------------------------
app.listen(3000,()=>{
    console.log("Server is Running...");
});
