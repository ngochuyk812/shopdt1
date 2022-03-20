import express from "express";
import viewEngine from "./configs/viewEngine";
import { initWebRouter } from "./route/web";
import api from './route/api'
import multer from 'multer'
import path from "path"
import updateProduct from "./controller/update"
import session from "express-session";

require('dotenv').config()
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
viewEngine(app);
initWebRouter(app);






app.listen(port, () => {
    console.log("Runing.....");
})
