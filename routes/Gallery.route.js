const express = require('express');
const app = express();
const galleryRoute = express.Router();
const path = require('path');
// Postmodel
let Post = require('../models/Post');
const fs = require('fs');

//Setting Files Path
const filesPath = path.resolve(__dirname,'..','..','tekupApp-fronted','src','assets','images','gallery-training-images');
var files = fs.readdirSync(filesPath);

// Get Gallery (all images)
galleryRoute.route('/').get((req, res) => {
    filesSent = files.slice(0,6)
    res.json(filesSent);
})

module.exports = galleryRoute;