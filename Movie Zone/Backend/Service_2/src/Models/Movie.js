const mongoose =require('mongoose');

const MovieSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    cast:{
        type:Array,
        required:true
    },
    showTime:{
        type:String,
        required:true
    },
    showTheatre:{
        type: String,
        required: true
    },
    showDate:{
        type:String,
        required:true
    },
    update_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Movie = mongoose.model('movies',MovieSchema);