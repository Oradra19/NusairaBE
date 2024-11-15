import Tagihan from '../models/DataTagihan.js';

class TagihanController {
    // Menambahkan tagihan baru
    async addTagihan(req, res) {
        const { id, invoiceNumber, dueDate, amount, total, user_id } = req.body;

        if (!id || !invoiceNumber || !dueDate || amount === undefined || total === undefined || !user_id) {
            return res.status(400).json({ message: 'Semua kolom harus diisi!' });
        }

        try {
            const tagihan = { id, invoiceNumber, dueDate, amount, total, user_id };
            await Tagihan.save(tagihan);
            res.status(201).json({ message: 'Tagihan berhasil ditambahkan!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam menambahkan tagihan', error: err.message });
        }
    }

    // Mendapatkan semua data tagihan
    async getAllTagihan(req, res) {
        try {
            const tagihanData = await Tagihan.getAll();

            if (tagihanData.length === 0) {
                return res.status(404).json({ message: 'Tidak ada data tagihan yang ditemukan' });
            }

            res.status(200).json(tagihanData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data tagihan', error: err.message });
        }
    }

    // Mendapatkan tagihan berdasarkan ID
    async getTagihanById(req, res) {
        const tagihanId = req.params.id;

        try {
            const tagihan = await Tagihan.getById(tagihanId);
            if (!tagihan) {
                return res.status(404).json({ message: 'Tagihan tidak ditemukan' });
            }
            res.status(200).json(tagihan);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data tagihan', error: err.message });
        }
    }

    // Mengupdate tagihan berdasarkan ID
    async updateTagihan(req, res) {
        const tagihanId = req.params.id;
        const { invoiceNumber, dueDate, amount, total, user_id } = req.body;

        if (!invoiceNumber || !dueDate || amount === undefined || total === undefined || !user_id) {
            return res.status(400).json({ message: 'Semua kolom harus diisi!' });
        }

        try {
            const updatedTagihan = { invoiceNumber, dueDate, amount, total, user_id };
            await Tagihan.update(tagihanId, updatedTagihan);
            res.status(200).json({ message: 'Tagihan berhasil diperbarui!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam mengupdate tagihan', error: err.message });
        }
    }

    // Menghapus tagihan berdasarkan ID
    async deleteTagihan(req, res) {
        const tagihanId = req.params.id;

        try {
            await Tagihan.delete(tagihanId);
            res.status(200).json({ message: 'Tagihan berhasil dihapus!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus tagihan', error: err.message });
        }
    }
}

export default new TagihanController();
