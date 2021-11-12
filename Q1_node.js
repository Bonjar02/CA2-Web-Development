var fs=require('fs');
var express=require('express');
var app=express();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {  
    res.sendFile( __dirname + "/" + "ca2_form.html" );  
 })
 app.post('/table', urlencodedParser, function (req, res) {  
     add_data = {  
        name:req.body.name,  
        email:req.body.email,
        password:req.body.password,  
        gender:req.body.gender
    }; 
    console.log(add_data);
    //------------------- HTML Table ---------------------------------------
    res.write("<html>")
        res.write("<table border=”1 | 0”> ");
            res.write("<tr>")
                res.write("<th>Name</th>")
                res.write("<th>Email</th>")
                res.write("<th>Password</th>")
                res.write("<th>Gender</th>")
            res.write("</tr>")
            res.write("<tr>")
                res.write("<td>"+add_data.name+"</td>")
                res.write("<td>"+add_data.email+"</td>")
                res.write("<td>"+add_data.password+"</td>")
                res.write("<td>"+add_data.gender+"</td>")
            res.write("</tr>")
        res.write("</table>")
    res.write("</html>")
 });

app.listen(3000,function(req,res){
    console.log("Server is Running...")
});


