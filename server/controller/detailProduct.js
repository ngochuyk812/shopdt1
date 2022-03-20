import pool from '../model/connectDB'
let detail = async (req, res) => {

    const [rows, fields] = await pool.query("SELECT * FROM product WHERE ID = ?", [req.params.idProduct]);
    console.log(rows);
    res.render("admin/detail.ejs", { list: rows[0] })
}
export default detail   