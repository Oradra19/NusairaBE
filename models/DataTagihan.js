import db from '../database/Nusairadb.js';

class Tagihan {
    constructor(data) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.dueDate = data.dueDate;
        this.amount = data.amount;
        this.total = data.total;
        this.user_id = data.user_id;
        this.created_at = data.created_at || new Date();
        this.updated_at = data.updated_at || new Date();
    }

    // Method untuk menyimpan data Tagihan
    static async save(data) {
        return new Promise((resolve, reject) => {
            const tagihan = new Tagihan(data);

            db.query(
                'INSERT INTO tagihan (id, invoiceNumber, dueDate, amount, total, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    tagihan.id,
                    tagihan.invoiceNumber,
                    tagihan.dueDate,
                    tagihan.amount,
                    tagihan.total,
                    tagihan.user_id,
                    tagihan.created_at,
                    tagihan.updated_at
                ],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }

    // Method untuk mendapatkan semua data Tagihan
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tagihan', (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    // Method untuk mendapatkan data Tagihan berdasarkan ID
    static getById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tagihan WHERE id = ?', [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    }

    // Method untuk memperbarui data Tagihan berdasarkan ID
    static update(id, data) {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE tagihan SET invoiceNumber = ?, dueDate = ?, amount = ?, total = ?, user_id = ?, updated_at = ? WHERE id = ?',
                [
                    data.invoiceNumber,
                    data.dueDate,
                    data.amount,
                    data.total,
                    data.user_id,
                    new Date(),  // updated_at
                    id
                ],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }

    // Method untuk menghapus data Tagihan berdasarkan ID
    static delete(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM tagihan WHERE id = ?', [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

export default Tagihan;
