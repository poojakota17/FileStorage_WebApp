/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())

app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const AWS = require('aws-sdk');

/**********************
 * Example get method *
 **********************/

app.get('/items', function (req, res) {
  // Add your code here
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2t0TwoMshWsqazhBaqWj83R3J8zzqAV8VC0jCn7UO/ZIBX/j
53/J7lqheezazh6pHUHS4fbe+bZBgOxxgQ4ZK4Nn/n7EmPWf740fHQSSyFj0C3Pl
Tc2PqrcnrbNO1KtlvoSYiPZO/r+zzzZC9vuenfRU47SHphwsyFOVBl2T9A4CsZiD
eteE5uGgCgB6hT7LfwE9Hc+QGKVcXIGT2od6I5n+ZtBRCd8YXf1lGqNFa1r1nga+
AdoLbIoU5KkkeuWR9rO6PieZDbk/BKXD1YJEhm3OHKB3qa+KSdqvJsm39C6GIgof
pGGKsF+9z9K7b1k8Y6cZkgOBfEDmBGEoV511UwIDAQABAoIBAFvLQ4FegOrIYrcr
lgxDwrrWSy+PP1ZmTpoDgGHjheJMTjK4S/8JUsk8i+NWWwL+SxGxTOBnKWf0cA7B
nG1zW00rxQ8xXgWFZ3oSZ01FYMbUwC6ZgkAaijogrWyl+tcpt/erJ0qye7lO7/xl
lrp+GC3Jj10dl5Ms1/+BRsyvrOE7xH14gmY08vMFTZK2HhL0Mm3HiJlliQhY4dnn
HJbbzVjyUzzl7gq6B71I4soL2alS36PtxLlFW7p+d2auCXRo431PiMT6POgm7rC7
GaiMO2JVJRDkDA4li+jeEj5lpFH25YmLrOl/I7X/w6hPWpTJUC05IRqZDJgyzkj5
t05fFzECgYEA8cx2gzyMwAZ01oBBpMpTN0XibLgDnc79ngU5Wt0nFWL9RuWVZ0oX
IsQI2JnWpg5q9CD7v4pvwiZQWuNwcnSOe3t/qbCsDeFqCn0rhXPLCdaqGTx9YARs
XvGzNRMheRV38OYNhm2gZkyCsiJFVJX1pXQoCwG8BySYHfpGQ2CAKPsCgYEA57fG
rvBtknaHNqLd6B1EqLQm52l0o0OJfc9L0COC+2HB3dsOpYfvzFSSv0WIFlT89hJr
E0NcfjHpM/3WKq1KacBYtmcQeg+BFvioM7+8id+7vWNCvXhzFjLo459LpOcolbIl
IGXL41Mhyq2p/GKkmR6EbX+ic0fN03NWlPrt5YkCgYEA6LQ92k+LpcKQ716/zjhp
nehD4R23XUi4DDw61pe/5XU/C9wnzSAg4/SGDu7/BREbHZggsFYq+E6nRtFchspl
1bElS8oby8AErdOI7wZhgTZ2vZLZlm6rXTR/o7SlokJnDBBbM+SNWeaIYadZ0e4A
WxtO7kjdDILLYw5aUL2umcECgYEAhl63xHJ/19MMDc7cR+HREtOFS+SHUrWzYVV4
bTZqmkPSHEkPcUYm9KKGhoxXojuehUOg/Aav+C4RQakNLKpY4II972hM0btz7FI9
l+Sz/G/Verm41g6nDlRvYK/bOcEic8xeYy8k0KpAijuyuzyonnJn8Od22MrmvJvB
tZrdoaECgYAHrz1UCXqkLYWSG15V2T59eW+fPXULgrBc55As9v1jB+5uLip+H++8
H6Bz5mqu6rCV/0L6r+6ayNNijnDkJILi5TcN08VDQ3CCFyWwGoqdOCrOPI/czfxA
dvqKw5ICEHW3bS5lSw7IosiZAJSjl+cD9A3IjC7E+Q+1SaO4EzeJkQ==
-----END RSA PRIVATE KEY----- `

  const cloudFront = new AWS.CloudFront.Signer('APKAIEAXM73CGCK56LNQ', privateKey);
  con.connect(function (err) {
    let querystring = `SELECT * FROM records.userobjects where username  = '${req.apiGateway.event.requestContext.authorizer.claims['cognito:username']}' `
    if ((req.apiGateway.event.requestContext.authorizer.claims['custom:Role'] == 'Admin') || (req.apiGateway.event.requestContext.authorizer.claims['custom:Role'] == 'admin')) {
      querystring = `Select * FROM records.userobjects`
    }
    con.query(querystring, function (err, result, fields) {
      if (err) res.send(err);
      if (result) 
        console.log(typeof (result))
      var abc = JSON.parse(JSON.stringify(result));
      for (var i = 0; i < abc.length; i++) {
        var obj = abc[i];

        console.log(obj.filename);

        cloudFront.getSignedUrl({

          url: encodeURI(`https://d2rvkw8krwbi10.cloudfront.net/${obj.filename}`),
          expires: Math.floor((new Date()).getTime() / 1000) + (600 * 3600 * 1) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
        }, (err, url) => {
          if (err) throw err;
          console.log(url);
          abc[i].link = url;
        }
        );
      }
      res.json(abc);
    });
  });
});

const mysql = require('mysql');
const con = mysql.createConnection({
  host: "userrecord-database.cl1hyllqodan.us-east-1.rds.amazonaws.com",
  user: "admin",
  port: "3306",
  password: "pooja1710#"
});


app.get('/items/*', function (req, res) {
  
  res.json({ success: 'get call succeed!', url: req.url });

});

/****************************
* Example post method *
****************************/

const fs = require('fs');
var multer = require('multer');
const { type } = require('os')
//let upload = multer();
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
const s3 = new AWS.S3();

app.post('/items', upload.single('file'), function (req, res) {
  // Add your code here
  console.log('PRINT REQ')
  console.log(req.file.mimetype);
  console.log(req.file.ContentType);

  console.log(req.apiGateway.event.requestContext.authorizer.claims['cognito:username']);
  

  const params = {
    Bucket: 'cmpe281hw2',
    Key: req.file.originalname, // File name you want to save as in S3
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };
  const params1 = {
    Bucket: 'cmpe281hw2',
    Key: req.file.originalname
  };
  return uploadobject(params)
    .then(
      result => {
        console.log(`File uploaded successfully`)
        return headobject(params1)
          .then(
            result1 => {

              
              con.query(`Select filename FROM records.userobjects WHERE filename  = '${req.file.originalname}' AND username  = '${req.apiGateway.event.requestContext.authorizer.claims['cognito:username']}'`, function (err, result) {
                console.log('checking result')
                fname = JSON.parse(JSON.stringify(result));
               
                if (Array.isArray(fname) && fname.length && fname[0].filename == req.file.originalname) {
                  console.log(result);
                  con.query(`UPDATE records.userobjects SET LastModified_time = '${result1.LastModified}', file_description  = '${req.body.filedescription}' WHERE  filename = '${req.file.originalname}' `, function (err, result) {
                    if (err) (console.log(err));
                    res.json('File Updated successfully!');
                  });

                }
                else {
                  con.query(`INSERT INTO records.userobjects (username,Name,filename, Uploaded_Time,LastModified_time,file_description) VALUES ('${req.apiGateway.event.requestContext.authorizer.claims['cognito:username']}', '${req.apiGateway.event.requestContext.authorizer.claims.family_name}, ${req.apiGateway.event.requestContext.authorizer.claims.name}','${req.file.originalname}', '${result1.LastModified}' , '${result1.LastModified}' , '${req.body.filedescription}')`, function (err, result, fields) {
                    if (err) res.send(err);
                    res.json('File Uploaded successfully!');
                  });

                }
              }
              )
            }
          )
          .catch(error => {
            console.log(error)
            res.json({ body: 'Failed to retrieve', error: error })
          });
      })

    .catch(error => {
      console.log(error)
      res.json({ body: 'Failed to upload', error: error })
    });


});
// Uploading files to the bucket
async function uploadobject(params) {

  const result = await s3.upload(params).promise();//, function(err, data) {
  return result;
}
async function headobject(params) {
const result1 = await s3.headObject(params).promise();//, function(err, data) {
  return result1;
 
  //res.json({success: 'post call succeed!', url: req.url, body: data.Location})
  
}
async function deleteobject(params) {

  const result2 = await s3.deleteObject(params).promise();//, function(err, data) {
  return result2;
  
}

app.post('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/items', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function (req, res) {
  // Add your code here
 
  const params = {
    Bucket: 'cmpe281hw2',
    Key: req.body.filename
  };
  console.log('request')
  console.log(req.body.filename);
  return deleteobject(params)
    .then(
      result => {
        con.connect(function (err, data) {
          if (err) (console.log(err))
          con.query(`DELETE FROM records.userobjects WHERE filename= '${req.body.filename}'`, function (err, data) {
            if (err) (console.log(err))

            res.json('File deleted successfully!');

          });

        })
      })
    .catch(error => {
      console.log(error)
      res.json({ body: 'Delete failed', error: error })

    });
});

app.delete('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
