const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem, uploadImage } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', protect, uploadImage, createItem);
router.put('/:id', protect, authorize(['admin', 'user']), updateItem);
router.delete('/:id', protect, authorize(['admin', 'user']), deleteItem);

module.exports = router;
