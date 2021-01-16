var express = require("express");
var path = require("path");
var aws = require("aws-sdk")
// CONSTANTS AND API KEYS
const PORT = process.env.PORT || 3000;
aws.config.loadFromPath('./config.json');

// Instancate OBJECTS
var app = express();
var server = require("http").createServer(app);
s3 = new aws.S3();
rek  = new aws.Rekognition();

app.use(express.static(__dirname + "/public"));

// PAGE BUILDING STUFF
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

server.listen(PORT);
console.log("CHECKING PORT " + PORT);


// call s3 to get all the data stored in the
// bucket
console.log("LISTING BUCKETS:")
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

// create a new collection which will contain all the
// s3 objects
rek.createCollection({CollectionId: "crimedatabase"}, function(err, data) {
   if (err){
		 console.log(err, err.stack);
	 }
   else{
		 console.log(data);
	 }
 });
