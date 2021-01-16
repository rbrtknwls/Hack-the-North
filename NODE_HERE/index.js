var express = require("express");
var path = require("path");
var aws = require("aws-sdk")
var imageToBase64 = require('image-to-base64');
// CONSTANTS AND API KEYS
const PORT = process.env.PORT || 3000;
aws.config.loadFromPath('./config.json');

// Instancate OBJECTS
var app = express();
var server = require("http").createServer(app);
s3 = new aws.S3();
rek  = new aws.Rekognition();
const collectionName = "crimedata"
const bucketName = "crimedatabase"
var currcount = 0;

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
			makecollection();
		}else{
			console.log("DELETED COLLECTION: " + collectionName);
			makecollection();
		}
	});
}

function makecollection(){
	rek.createCollection({CollectionId: collectionName}, function(err, data) {
		if (err){
			console.log(err, err.stack);
		} else {
			console.log("Made Collection: "+ collectionName);
			gets3();
		}
	});
}

function gets3 (){
	s3.listObjects({Bucket: bucketName, MaxKeys: 100}, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}else{
			appendToCollection(data.Contents)
		}
	});
}

function appendToCollection(data){
	for (var i = 0; i < data.length; i ++){
		var locparams = {
			CollectionId: collectionName,
			Image: { /* required */
				S3Object: {
					Bucket: bucketName,
					Name: data[i].Key
				}
			},
		}
		rek.indexFaces(locparams, function(err, img) {
			if (err){
				 console.log(err, err.stack);
			 }
			else{
				currcount++;
				if (currcount == data.length-1){
					console.log("Just being safe...")
					setTimeout(function(){
						listFaces(collectionName);
					}, 1000);
				}
			 }
		});
	}
}

function compareface (face){

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
