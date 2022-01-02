var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//compileX
var compiler = require('compilex');
var option = { stats : true };
compiler.init(option);

app.use(express.static(path.resolve(__dirname + "/../client/lib")));

app.get('/' , function (req, res ) {
    res.sendFile( path.resolve(__dirname + "/../client/index.html"));
});

app.post('/compilecode', function (req, res) {
   
    var code = req.body.code;   
    var input = req.body.input;
    var inputCheck = req.body.inputCheck;
    var lang = req.body.lang;
    var platform = "windows";

    if ((lang === "C") || (lang === "C++")) {
        var envData = { OS : platform , cmd : "g++"};
        console.log(input, typeof(input)); 
         
        if(inputCheck === "true") {           
            compiler.compileCPPWithInput(envData, code, input, function(data) {
                if(data.error)
                    res.send(data.error);
                else
                    res.send(data);
            });
       }
       else { 
            compiler.compileCPP(envData, code, function(data) {
                if(data.error)
                    res.send(data.error);
                else
                    res.send(data);
            });
       }
    }

    if (lang === "Java") {
        var envData = { OS : platform }; 
        console.log(code);

        if (inputCheck === "true") {   
            compiler.compileJavaWithInput(envData, code, input, function(data) {
                res.send(data);
            });
        }
        else {  
            compiler.compileJava(envData, code, function(data) {
                res.send(data);
            });
        }
    }

    if( lang === "Python") {
    var envData = { OS : platform};
        if (inputCheck === "true") {
            compiler.compilePythonWithInput(envData, code, input, function(data) {
                res.send(data);
            });           
        }
        else {
            compiler.compilePython(envData, code, function(data) {
                res.send(data);
            });
        }
    }
});

app.get('/fullStat', function(req, res) {
    compiler.fullStat(function(data) {
        res.send(data);
    });
});

app.listen(8080);