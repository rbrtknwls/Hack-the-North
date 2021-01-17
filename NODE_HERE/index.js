var express = require("express");
var path = require("path");
var aws = require("aws-sdk");
const fs = require("fs");
// CONSTANTS AND API KEYS
const PORT = process.env.PORT || 3000;
aws.config.loadFromPath("./config.json");

// Instancate OBJECTS
var app = express();
var server = require("http").createServer(app);
s3 = new aws.S3();
rek = new aws.Rekognition();
const collectionName = "crimedata";
const bucketName = "crimedatabase";
var currcount = 0;

const file = "test1.jpg";
const bitmap = fs.readFileSync(file);
const buffer = new Buffer.from(bitmap, "base64");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var db;

// PAGE BUILDING STUFF
app.get("/", function(req, res) {
	console.log(db);
	res.render("post", { db });
});

app.post("/post", function(req, res) {
	console.log(req.body);
	db = req.body;
	res.redirect("/");
});

server.listen(PORT);
console.log("CHECKING PORT " + PORT);

init();
// --------------- GET STUFFFF ---------------//

// --------------- RUNTIME STUFFFF ---------------//

function init() {
	rek.deleteCollection({ CollectionId: collectionName }, function(err, data) {
		if (err) {
			console.log("No Collection Found");
			makecollection();
		}
		else {
			console.log("DELETED COLLECTION: " + collectionName);
			makecollection();
		}
	});
}

function makecollection() {
	rek.createCollection({ CollectionId: collectionName }, function(err, data) {
		if (err) {
			console.log(err, err.stack);
		}
		else {
			console.log("Made Collection: " + collectionName);
			gets3();
		}
	});
}

function gets3() {
	s3.listObjects({ Bucket: bucketName, MaxKeys: 100 }, function(err, data) {
		if (err) {
			console.log(err, err.stack);
		}
		else {
			appendToCollection(data.Contents);
		}
	});
}

function appendToCollection(data) {
	for (var i = 0; i < data.length; i++) {
		var locparams = {
			CollectionId: collectionName,
			ExternalImageId: data[i].Key,
			Image: {
				S3Object: {
					Bucket: bucketName,
					Name: data[i].Key
				}
			}
		};
		rek.indexFaces(locparams, function(err, img) {
			if (err) {
				console.log(err, err.stack);
			}
			else {
				currcount++;
				if (currcount == data.length - 1) {
					console.log("Just being safe...");
					setTimeout(function() {
						compareface(buffer);
					}, 1000);
				}
			}
		});
	}
}

function compareface(face) {
	var params = {
		CollectionId: collectionName,
		Image: {
			Bytes: face
		},
		FaceMatchThreshold: 0,
		MaxFaces: 1
	};
	rek.searchFacesByImage(params, function(err, data) {
		if (err) {
			console.log(err, err.stack);
		}
		else {
			if (data.FaceMatches.length == 0) {
				notfound();
			}
			else {
				found(data.FaceMatches);
			}
		}
	});
}

// --------------- DEBUG STUFFFF ---------------//
function listFaces(colid) {
	var params = {
		CollectionId: colid,
		MaxResults: 90
	};
	rek.listFaces(params, function(err, data) {
		if (err) console.log(err, err.stack);
		else console.log(data);
	});
}

// --------------- POST STUFFFF ---------------//
function notfound() {
	console.log("FACE NOT FOUND");
}
function found(data) {
	console.log("FACE MATCH (s):");
	console.log(data);
}
