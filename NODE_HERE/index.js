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
const collectionName = "crimedata"

app.use(express.static(__dirname + "/public"));

// PAGE BUILDING STUFF
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

server.listen(PORT);
console.log("CHECKING PORT " + PORT);

init()
function init (){
	rek.deleteCollection({CollectionId: collectionName}, function(err, data) {
	   if (err){
			  console.log("No Collection Found");
		 }else{
			  console.log("DELETED COLLECTION: " + collectionName);
		 }
  });
}

function gets3 (){
	s3.listBuckets(function(err, data) {
		if (err) {
			console.log("Error", err);
		} else {
			console.log("Success", data.Buckets[0].Name);
		}
	});
}


function listFaces (colid){
	var params = {
	 CollectionId: colid,
	 MaxResults: 20
	};
	rek.listFaces(params, function(err, data) {
		if (err) console.log(err, err.stack);
		else     console.log(data);
	})
}
