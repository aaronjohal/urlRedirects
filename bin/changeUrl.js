var recursive = require('recursive-readdir');
var path = require('path');
var sourceDirectory = '../FixtureTest';
var regex =  /http:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

var test = '<img src="';

var fs = require('fs');

var fileListArray, updatedFileContents;

    function getFileList(dir) {
        recursive(dir, ['*.jpg', '*.gif', '.DS_Store'], function (err, files) {
            getFileContents(files);
            return files;
        })
    }

    function getFileContents(files) { 
        fileListArray = files; 
      //  console.log('total files', files.length);
        for(var i = 0; i < files.length; i++){
            var filepath = path.resolve(files[i]); //get absolute path
            getFile(filepath);

        }  
        

    }

    function getFile(file) {

        fs.readFile(file, 'utf8', function (err,data){
        // console.log(file);
        console.log('**********************');
        console.log('file is : ' + file);
        console.log('**********************');


        if(data.match(test)){
            if(data.match(/(src=")(\/+)/g)){
                
                updatedFileContents = data.replace(/(src=")(\/+)/g, 'src="http://domain/$2')
                console.log('first case : ' + updatedFileContents);
                //console.log(data + ' ---> ' + updatedFileContents);
            }  

        if(data.match(/(src=")(\w+)/g)){
            updatedFileContents = data.replace(/(src=")(\w+)/g, 'src="http://domain/$2');
            console.log('second case : ' + updatedFileContents);
            //console.log(data + ' ---> ' + updatedFileContents);
            }

        if(data.match(/(src=")(..\/)+/)) {
            var regex = /(src=")(..\/)+/;
            var regex2 = /(\/\w*)*news\//; //anything up to news
            var domain = 'http://domain/';

            updatedFileContents = data.replace(regex, path.dirname('$2').replace(regex2, domain));
            console.log('third case : ' + updatedFileContents);
        }
    
            //writeFile(file, updatedFileContents);   

         } else {
            console.log('no match');
         }
        }); 
    }


    function writeFile(file, content) {
        fs.writeFile(file, content, function (err) {
            console.log('writing to file');
            if (err) {
                throw error;
            } 


            //match cases
         });
    }

    getFileList(sourceDirectory);

    function flattenUrl(files){
     console.log(files);
    }

   //****** 1. In match statement, once detected which ones to match, create another function
              //  2. Within new function, create callback with 'rw' options and change matches 
              //(note it only deals with literal, need to do it so it does it for both upper and lowercase)