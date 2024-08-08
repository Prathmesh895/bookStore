const mongoose = require('mongoose');

const  BookSchema = mongoose.Schema({
title:{
    type:String,
    require:true
},
descp:{
    type:String,
    require:true
},
genre:{
    type:String,
   
},
price:{
    type:Number,
    require:true
},
tags:{
    type:String,
    require:true
},
file:{
    type:String,
},
addas:{
    type:String,
    enum: ['publish', 'draft'],
    required: true
},
publishDate:{
    type:Date
},
auther:{
    type:String
},
rating: { type: Number, min: 0, max: 5 }
},{timestamps:true}
)

const Book = mongoose.model('Book',BookSchema);

module.exports= {Book}
