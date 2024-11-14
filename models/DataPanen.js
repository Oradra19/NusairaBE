import db from '../database/Nusairadb.js';

class DataPanen {
  constructor(data) {
    this.kolam_id = data.kolam_id;  
    this.tanggal = data.tanggal;
    this.berat = data.berat;
    this.size = data.size;
    this.harga_jual = data.harga_jual;  
    this.status = data.status;
    this.catatan = data.catatan || null;  
  }

 
  static async validate(data) {
    const errors = [];

    if (!data.kolam_id) errors.push("Kolam ID harus diisi.");
    if (!data.tanggal) errors.push("Tanggal harus diisi.");
    if (data.berat <= 0) errors.push("Berat harus lebih dari 0.");
    if (!data.size) errors.push("Size harus diisi.");
    if (data.harga_jual <= 0) errors.push("Harga jual harus lebih dari 0.");
    if (!data.status) errors.push("Status harus diisi.");

    return errors;
  }

  
  static async save(data) {
    try {
      const validationErrors = await DataPanen.validate(data);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
      }

      const query = `
        INSERT INTO data_panen (kolam_id, tanggal, berat, size, harga_jual, status, catatan)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      return new Promise((resolve, reject) => {
        db.query(
          query,
          [
            data.kolam_id, 
            data.tanggal, 
            data.berat, 
            data.size, 
            data.harga_jual, 
            data.status, 
            data.catatan
          ],
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM data_panen', (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

export default DataPanen;
