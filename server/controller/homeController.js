
import pool from '../model/connectDB'
let homeRender = async (req, res) => {
    let data = [];

    const [rows, fields] = await pool.execute('SELECT * FROM product');
    console.log(">>>> check row: ", rows);
    const h = ` <h1>INDEX</h1>`
    return res.render("admin/index.ejs", { list: rows })


}
// let details = async (req, res) => {

//     const [rows, fields] = await pool.execute('SELECT * FROM student');
//     let rs = "";
//     for (let i = 0; i < rows.length; i++) {
//         if (rows[i].id == req.params.id) {
//             rs = JSON.stringify(rows[i])
//         }
//     }
//     return res.send(rs)




// }
// let addStudent = async (req, res) => {
//     let { mssv, name, age } = req.body;
//     await pool.execute(`insert into student (mssv, name, age) values (?,?,?)`, [mssv, name, age])
//     console.log(req.body);
//     return res.redirect("/")
// }
// let deleteStudent = (req, res) => {
//     pool.execute(`delete from student where id= ?;`, [req.body.id])
//     return res.redirect('/')
// }

// let editStudent = async (req, res) => {
//     let [user] = await pool.execute("select * from student where id = ?", [req.params.id])
//     console.log(">>>> user: ", user);
//     return res.render('update.ejs', { infoUSer: user[0] })
// }
// let updateStudent = async (req, res) => {
//     let { id, mssv, name, age } = req.body
//     await pool.execute(`update student set mssv = ?, name = ?, age= ? where id = ?`, [mssv, name, age, id])
//     res.redirect('/')
// }
// let homeAPI = async (req, res) => {
//     const [rows, fields] = await pool.execute('SELECT * FROM student');
//     res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

//     return res.status(200).json({
//         masseage: "ok",
//         data: rows
//     },
//     )
// }






module.exports = {
    homeRender
}