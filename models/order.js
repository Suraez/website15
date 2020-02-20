const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart : {type: Object, required: true},
    phone: {type: Number, required: true},
    name: {type: String, required: true},
    address: {type: String,required: true}
});

module.exports = mongoose.model('Order', orderSchema);