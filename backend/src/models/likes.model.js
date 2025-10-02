const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    // either a normal user or a foodPartner can create a like
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner',
        required: false
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    }
}, {
    timestamps: true
})

const Like = mongoose.model('like', likeSchema);
module.exports = Like;