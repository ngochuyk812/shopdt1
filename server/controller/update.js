
import pool from '../model/connectDB'
import multer from 'multer';
var upload = multer({
    storage: storage
});
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let updateImg = (req, res) => {

    const { name, price, content } = req.body
    if (!req.file && !name && !price && !content) {
        console.log("No file upload");
        res.send("Update Ko Thanh Cong")

    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://localhost:5000/public/images/' + req.file.filename

        pool.query("insert into product(name, price, content, image_link) values(?, ?, ?, ?)", [name, price, content, imgsrc])
        res.send("Update Thanh Cong")

    }

}

let updataProfile = async (req, res) => {

    const { name, surname, phone, address, id } = req.body

    if (!name && !surname && !phone && !address && !req.file) {
        console.log("No file upload");
        res.send("Update Ko Thanh Cong")

    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://localhost:5000/public/images/' + req.file.filename
        await pool.query("UPDATE user SET name = ?, surname = ?, phone = ?, address = ?, img = ?  WHERE id = ? ", [name, surname, phone, address, id, imgsrc])

        res.send(req.body)

    }

}

module.exports = {
    updateImg,
    updataProfile
}