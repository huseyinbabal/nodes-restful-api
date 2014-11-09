var mongoose = require('mongoose'),
    Comment = mongoose.model("Comment"),
    Article = mongoose.model("Article"),
    ObjectId = mongoose.Types.ObjectId

exports.viewComment = function(req, res) {
    Article.findOne({"comments._id": new ObjectId(req.params.id)}, {"comments.$": 1}, function(err, comment) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (comment) {
                res.json({
                    type: true,
                    data: new Comment(comment.comments[0])
                })
            } else {
                res.json({
                    type: false,
                    data: "Comment: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.updateComment = function(req, res, next) {
    var updatedCommentModel = new Comment(req.body);
    console.log(updatedCommentModel)
    Article.update(
        {"comments._id": new ObjectId(req.params.id)},
        {"$set": {"comments.$.text": updatedCommentModel.text, "comments.$.author": updatedCommentModel.author}},
        function(err) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                res.json({
                    type: true,
                    data: "Comment: " + req.params.id + " updated"
                })
            }
    })
}

exports.deleteComment = function(req, res, next) {
    Article.findOneAndUpdate({"comments._id": new ObjectId(req.params.id)},
        {"$pull": {"comments": {"_id": new ObjectId(req.params.id)}}},
        function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (article) {
                res.json({
                    type: true,
                    data: article
                })
            } else {
                res.json({
                    type: false,
                    data: "Comment: " + req.params.id + " not found"
                })
            }
        }
    })
}
