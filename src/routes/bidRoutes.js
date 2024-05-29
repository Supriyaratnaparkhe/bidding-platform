const express = require('express');
const { getBids, placeBid } = require('../controllers/bidController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/items/:itemId/bids', getBids);
router.post('/items/:itemId/bids', protect, placeBid);

module.exports = router;
