const http = require('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const dishRouter =require('./routes/dishRouter');
const leaderRouter =require('./routes/leaderRouter');
const promoRouter =require('./routes/promoRouter');


const hostname ='localhost';
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))



app.use('/dishes',dishRouter);

app.use('/leaders',leaderRouter);

app.use('/promotions',promoRouter);



/*

app.use((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Express js</h1></body></html>');
})
*/


const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log('Server is running at http://${hostname}:${port}');
})





/*

const server = http.createServer((req,res) => {
    console.log("Request for"+req.url+'by method');


    if(req.method=="GET"){
        var fileUrl;
        if(req.url == '/')fileUrl="/index.html";
        else fileUrl=req.url;

        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt==".html"){
            fs.exists(filePath, (exists)=>{
                if(!exists){
                    res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404:'+ fileUrl +' not found </h1></body></html>');

                    return;
                }

                res.statusCode=200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else{
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>Error 404:'+ fileUrl +' is not html file </h1></body></html>');

            return;
        }
    }
    else{
        res.statusCode=404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Error 404:'+ req.meth +' not supported </h1></body></html>');

        return;
    }
})

server.listen(port,hostname,() => {
    console.log('Server at http://localhost:3000/')
});

*/