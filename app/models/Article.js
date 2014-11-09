var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var Comment = require("./Comment");

var ArticleSchema = new Schema({
    title: String,
    slug: String,
    content: String,
    author: String,
    comments: [Comment.schema]
});
mongoose.model('Article', ArticleSchema);