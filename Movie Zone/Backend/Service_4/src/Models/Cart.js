const mongoose =require('mongoose');

const CartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    movie:{
        type:String,
        required:true
    },
    reservation_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Cart = mongoose.model('carts', CartSchema);