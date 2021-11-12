var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./ca2_no.html", "UTF-8").pipe(res);
    } 
    else if (req.method === "POST") {
        var data = [];
        req.on("data", function (chunk) {
            data.push(chunk);
        });
        req.on("end", function(){
            //--------------------- Parsing chunk data  ----------------------------
            var parse_data=Buffer.concat(data).toString();
            var split_data=parse_data.split('=')[1];
            var num = Number(split_data);

            //--------------------- Code For Sum N Natural No.s ----------------------------
            let sum=0;
            for(var i=1;i<=num;i++){
                sum+=i;
            }
            //-------------------- Write In Text File ----------------------------------
            var stringify_sum=JSON.stringify(sum);
            console.log("Sum  = " +stringify_sum);
            var writeStream=fs.createWriteStream('sum.txt');
            writeStream.write("Sum : "+stringify_sum,'UTF8');
            writeStream.end();
            
            writeStream.on('finish',function(){
                console.log("Data is written on 'sum.txt. file..");
            });
            writeStream.on('error',function(err){
                console.log(err);
            });
        });
        res.end("The Sum of Natural No. Will be displayed on 'sum.txt' file..");
    }
}).listen(3000,function(req,res){
    console.log("Server is Running...");
});


