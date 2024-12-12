import db from "../database/Nusairadb.js";

const Register = {
  async create(name, username, email, hashedPassword, role = "user", no_hp, pekerjaan, jenis_kelamin) {
    const [rows] = await db.execute(
      "INSERT INTO pengguna (name, username, email, password, role, no_hp, pekerjaan, jenis_kelamin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, username, email, hashedPassword, role, no_hp, pekerjaan, jenis_kelamin]
    );
    return rows.insertId; 
  },

  async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM pengguna WHERE email = ?", [email]);
    return rows[0]; 
  }
};

export default Register;
