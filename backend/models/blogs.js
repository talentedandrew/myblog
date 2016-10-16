var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  author: String,
  content: String,
  tags: String,
  comments: [{ user: String, body: String, date: Date , replies :[{user: String, reply: String, date: Date}] }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

var Blog = module.exports = mongoose.model('Blog', blogSchema);
module.exports.createBlog = function (newBlog, callback) {
  newBlog.save(callback);
};
module.exports.getAllBlogs = function (callback) {
  Blog.find({}, function (err, blogs) {
     if(err) throw err;    
      callback (null,blogs); 
  });
};
module.exports.getBlogById = function (id,callback) {
  Blog.findById(id, function (err, blog) {
     if(err) throw err;    
      callback(null,blog); 
  });
};
module.exports.postComment = function (id,user,body,date,callback) {
  var comment ={ user: user, body: body, date: date };
  Blog.findByIdAndUpdate(id, {$push:{comments:comment}}, {new: true}, function(err, blog){
    if(err){
        throw err;
    }
    callback(null,blog);
});
};
module.exports.replyToComment = function (bid,id,user,rep,date,callback) {
  var reply ={ user: user, reply: rep, date: date };
  Blog.findOneAndUpdate({_id : bid ,'comments._id' : id}, {$push:{'comments.0.replies':reply}}, {new: true}, function(err, comments){
    if(err){
        throw err;
    }
    callback(null,comments);
});
};