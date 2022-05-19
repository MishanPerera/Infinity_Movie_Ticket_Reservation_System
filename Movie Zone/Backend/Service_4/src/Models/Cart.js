const mongoose =require('mongoose');

const CartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
	movieId:{
		type:String,
        required:true
	},
	movieUserId:{
		type:String,
        required:true
	},
	name:{
        type: String,
        required: true
    },
	showDate:{
        type:String,
        required:true
    },
    showTime:{
        type:String,
        required:true
    },
    showTheatre:{
        type: String,
        required: true
    }
});

module.exports = Cart = mongoose.model('carts', CartSchema);