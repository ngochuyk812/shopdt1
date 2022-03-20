import express from "express";
const viewEngine = (app) => {
    app.use(express.static('./public'))
    app.set("view eyngine", "ejs")
    app.set("views", "./client")
}

export default viewEngine;