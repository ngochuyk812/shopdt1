
import express from "express";
import homeController from "../controller/homeController"
let router = express.Router();


const initAPI = (app) => {




    return app.use("/api-v1", router);
}

export default initAPI
