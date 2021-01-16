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

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

// PAGE BUILDING STUFF
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

server.listen(PORT);
console.log("CHECKING PORT " + PORT);

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});
