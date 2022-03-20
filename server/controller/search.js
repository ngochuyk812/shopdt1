import pool from '../model/connectDB'



let search = async (req, res) => {

    const { company, price, sort } = req.body;
    const [rows, fields] = await pool.query('SELECT * FROM product WHERE name LIKE "%' + company + '%"');
    return res.render("admin/index.ejs", { list: rows })
}

export default search