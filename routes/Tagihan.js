import express from 'express';
import TagihanController from '../controller/TagihanController.js'; // Sesuaikan path sesuai struktur project Anda

const router = express.Router();

router.post('/tagihan', TagihanController.addTagihan);
router.get('/tagihan', TagihanController.getAllTagihan);
router.get('/tagihan/:id', TagihanController.getTagihanById);
router.put('/tagihan/:id', TagihanController.updateTagihan);
router.delete('/tagihan/:id', TagihanController.deleteTagihan);

export default router;
