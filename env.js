var http = require('http')
var express = require('express')
var path = require('path')
var session = require('express-session')
var cookeParser = require('cookie-parser')
var flash= require('connect-flash')
var bodyParser = require('body-parser')
var errorHandler = require('errorhandler')
var expressLayouts = require('express-ejs-layouts')
var validator = require('express-validator')
var upload = require('express-fileupload')
var fs = require('fs')
var xlsx = require('xlsx')
const csv = require('fast-csv');
var multer = require('multer')
const uploadfile = multer({ dest: './public/files/' })

// var mongoose = require('mongoose');
const mysql = require('mysql')
var app = express();
const router = express.Router(); 



app.use(express.json());
app.use(upload());

// all environments
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')))

//configuration session
app.use(cookeParser('secret'))
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: false,
        saveUninitialized:true
    })
)
app.use(flash())

module.exports = { http, express, path, session, bodyParser, errorHandler , app, router, expressLayouts , validator,mysql, fs, upload, multer,uploadfile,csv,xlsx}