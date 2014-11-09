var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var CommentSchema = new Schema({
    text: String,
    author: String
});
mongoose.model('Comment', CommentSchema);