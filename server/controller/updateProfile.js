
import pool from '../model/connectDB'
import multer from 'multer';
var upload = multer({
    storage: storage
});
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/avatar/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let updateProfile = async (req, res) => {

    const { name, surname, phone, address, id } = req.body
    if (!name && !surname && !phone && !address && !req.file) {
        console.log("No file upload");

    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://localhost:5000/public/avatar/' + req.file.filename
        await pool.query("UPDATE user SET name = ?, surname = ?, phone = ?, address = ?, img = ?  WHERE id = ? ", [name, surname, phone, address, imgsrc, id])

        res.send(req.body)

    }




}


export default updateProfile