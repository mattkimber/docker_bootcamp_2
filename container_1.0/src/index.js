const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {callback(null, "files/")},
  filename: (req, file, callback) => {callback(null, file.originalname)}
});

const upload = multer({storage: storage});

var renderPage = (method, req, res) => {
  console.log(method + " request from " + req.ip);
  res.render(
    "index", {
      title: "Simple Photo Uploader",
      header: "Photo Uploader",
      images: getImages()
    }
  );
};

var getImages = () => {
  let result = [];
  let files = fs.readdirSync("files");

  for(file of files) {
    let location = path.join("files", file);
    var stat = fs.statSync(location);
    if(stat && stat.isFile() && [".jpg", ".png", ".gif", ".jpeg"].indexOf(path.extname(location)) != -1) {
      result.push("/static/" + file);
    }
  }

  return result;
}

var app = express();

app.set("view engine", "pug");
app.set("port", process.env.PORT || 3000);

app.use('/static', express.static(path.join(__dirname, 'files')))

app.get("/", (req, res) => {
  renderPage("GET", req, res);
});

app.post("/", upload.single("fileupload"), (req, res) => {
  renderPage("POST", req, res);
});

app.listen(app.get("port"), function() {
  console.log("Web server started");
});
