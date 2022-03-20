import express from "express";
import update from "../controller/update"
import homeController from '../controller/homeController'
import checkAdmin from "../controller/checkAdmin";
import updateProfile from "../controller/updateProfile";
import detail from "../controller/detailProduct";
import multer from 'multer'
import path from "path"
import check from '../js/check'
import search from '../controller/search'
import pool from '../model/connectDB'
import { query } from "express";
let router = express.Router();
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

//! Routes start

const initWebRouter = (app) => {
    router.get('/login', (req, res) => {
        if (!req.session.loggedin) {
            res.render('user/login.ejs')
        } else {
            res.redirect('/')

        }
    })
    router.post('/check-login', async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {
            const [rows, results] = await pool.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password]);
            const length = rows.length + ""
            if (rows.length > 0) {
                req.session.loggedin = true;
                req.session.userPro = rows;
                return res.redirect('/')
            } else {
                return res.send('Incorrect Username and/or Password!');
            }


        } else {
            res.send('đ')
        }
    })
    router.get('/', homeController.homeRender)

    router.get('/profile', (req, res) => {
        if (req.session.loggedin) {
            res.render('user/profile.ejs', { userProfile: req.session.userPro })

        } else {
            res.redirect('/login')
        }
    })
    router.post('/admin', checkAdmin)

    router.post('/filter', search)
    router.get('/login-admin', (req, res) => {
        res.render("admin/admin.ejs")
    })

    router.get('/logout', (req, res) => {
        res.render("user/logout.ejs")
    })
    router.post('/check-logout', async (req, res) => {

        const { username, password, rePassword, email } = req.body

        if (password == rePassword) {
            const [rows, results] = await pool.query('SELECT * FROM user WHERE username = ? ', [username]);
            if (rows.length == 0) {
                await pool.query("INSERT INTO user(username,password,email) values(?,?, ?)", [username, password, email]);
                req.session.checkEdit = true;
                const [rows2, results] = await pool.query('SELECT * FROM user WHERE username = ? ', [username]);
                res.render('user/editProfile.ejs', { idUser: rows2 })
            } else {
                res.send('Tk da co ')

            }
        } else {
            res.send('MK ko trung')

        }
    })
    router.post('/saveProfile', upload.single('image'), updateProfile)
    router.post('/ss', (req, res) => {
        res.send(req.body)
    })
    //@type   POST
    //route for post data
    router.get('/dangxuat', (req, res) => {
        req.session.loggedin = false
        req.session.userPro = ''
        res.redirect('/login')
    })
    router.post("/update-product", upload.single('image'), update.updateImg);
    router.get("/detail/:idProduct", detail)
    router.get('/cart', async (req, res) => {
        if (req.session.loggedin) {
            const [rows, results] = await pool.query('SELECT * FROM oderitem WHERE orderid = ? ', [req.session.userPro[0].id]);

            const arr = []
            if (rows.length > 0) {
                let condition = '';
                for (let index = 0; index < rows.length; index++) {
                    arr.push(rows[index].idproduct)
                    if (index == 0) {
                        condition += "id = ? "
                    } else {
                        condition += "or id = ? "

                    }
                }

                const [rows2, rs] = await pool.query('SELECT * FROM product WHERE  ' + condition, arr);
                res.render('user/cart.ejs', { list: rows2, listoder: rows })

            } else {
                res.render('user/cart.ejs', { list: [], listoder: [] })

            }


        } else {
            res.redirect('/login')
        }
    })
    router.post('/add-cart', async (req, res) => {
        const [rows, rs] = await pool.query('SELECT * FROM oderitem WHERE idproduct= ? AND orderid = ? ', [parseInt(req.body.idProduct), req.session.userPro[0].id]);
        if (rows.length == 0) {
            await pool.query("INSERT INTO oderitem (orderid,idproduct,amount) values(?,?, ?)", [req.session.userPro[0].id, parseInt(req.body.idProduct), 1]);
            res.redirect('/')

        } else {
            await pool.query("UPDATE oderitem SET amount = ?  WHERE id = ? ", [rows[0].amount + 1, rows[0].id])

            res.redirect('/')

        }

    })
    return app.use("/", router);
}


module.exports = {
    initWebRouter
}
