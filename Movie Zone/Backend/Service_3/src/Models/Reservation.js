const mongoose =require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amount:{
        type:String,
        required:true
    },
    movieList:{
        type:Object,
        required:true
    },
    reservation_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Reservation = mongoose.model('reservations', ReservationSchema);