import pool from '../model/connectDB'
import check from '../js/check'

let checkAdmin = async (req, res) => {
    const { username, password } = req.body
    check.person.setCheck = true
    let getUse = null;
    const [rows, fields] = await pool.execute(`SELECT * FROM admin WHERE username = ?`, [username]);
    if (rows.length != 0) {
        if (rows[0].password == password) {
            check.person.setCheck = true
            console.log(check.person.check);
            return res.render('admin/product.ejs')



        }
    } else {
        check.person.setCheck = false
        return res.redirect('/')



    }

}

export default checkAdmin