var express = require("express");
var path = require("path");

// CONSTANTS AND API KEYS
const PORT = process.env.PORT || 3000;

// Instancate OBJECTS
var app = express();
var server = require("http").createServer(app);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

// PAGE BUILDING STUFF
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

server.listen(PORT);
console.log("CHECKING PORT " + PORT);
