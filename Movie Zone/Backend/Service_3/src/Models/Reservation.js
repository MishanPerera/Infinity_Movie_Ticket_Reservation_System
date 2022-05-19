const mongoose =require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    movieId:{
        type: String,
        required: true
    },
	movieUserId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
	showDate:{
		type: String,
        required: true
	},
	showTime:{
		type: String,
        required: true
	},
	showTheatre:{
		type: String,
        required: true
	},
    reservation_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Reservation = mongoose.model('reservations', ReservationSchema);