const Bid = require('../models/bid');
const Item = require('../models/item');
const io = require('../server').io;

exports.getBids = async (req, res) => {
    try {
        const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.placeBid = async (req, res) => {
    try {
        const { bid_amount } = req.body;
        const item = await Item.findByPk(req.params.itemId);

        if (!item) return res.status(404).json({ message: 'Item not found' });
        if (bid_amount <= item.current_price) return res.status(400).json({ message: 'Bid amount must be higher than current price' });

        const bid = await Bid.create({ item_id: req.params.itemId, user_id: req.user.id, bid_amount });
        item.current_price = bid_amount;
        await item.save();

        io.emit('update', { item_id: item.id, current_price: item.current_price });

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
