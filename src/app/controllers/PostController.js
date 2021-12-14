const multiparty = require('multiparty')
const mongoose = require('mongoose')
const Post = require('../models/Post');
const Account = require('../models/Account');
const uploadImage = require('../lib/upload_image')
class PostController {
    async createNewPost(req, res) {
        const account = await Account.findOne({ _id: req.session.user_id }).lean();
        var form = new multiparty.Form();
        form.parse(req, async function (err, fields, files) {
            let imagePath = "";
            if (files.image[0].size > 0)
                imagePath = await uploadImage(files.image[0])
            let content = fields.content[0]
            let urlYoutube = fields.urlYoutube[0] ? fields.urlYoutube[0].replace("watch?v=", "embed/") : "";
            const id_user = account._id;
            const username = account.username;
            const userAvatar = account.avatar;
            const newPost = new Post({
                username,
                userAvatar,
                content,
                imagePath,
                urlYoutube,
                id_user,
            });
            await newPost.save();
            res.status(200).send({ newPost });
        });

    }

    async updatePost(req, res) {
        var form = new multiparty.Form();
        form.parse(req, async function (err, fields, files) {
            const { id } = req.params;
            let content = fields.content[0]
            let urlYoutube = fields.urlYoutube[0]
            let deleteimage = fields.deleteimage[0]
            urlYoutube = urlYoutube.replace("watch?v=", "embed/");
            const data = { content, urlYoutube }
            if (deleteimage) {
                data.imagePath = "";
            }
            if (files.image[0].size > 0)
                data.imagePath = await uploadImage(files.image[0])
            const updatePost = await Post.findByIdAndUpdate(id, data, { new: true });
            return res.status(200).json({ updatePost })
        })
    }

    async deletePost(req, res) {
        const { id } = req.params;
        const deletePost = await Post.findByIdAndDelete(id);
        res.status(200).send({ deletePost });
    }

    async getPosts(req, res) {
        const account = req.account;
        const { page, user } = req.query;
        if (user) {
            const posts = await Post.find({ id_user: user })
                .sort({ date: -1 })
                .skip(page * 10)
                .limit(10)
                .lean();
            res.status(200).send({ posts, user: account._id });
        } else {
            const posts = await Post.find().sort({ date: -1 }).skip(page * 10).limit(10).lean();
            res.status(200).send({ posts, user: account._id });
        }
    }

    async addComment(req, res) {
        const commentId = new mongoose.Types.ObjectId()
        const account = await Account.findOne({
            _id: req.session.user_id,
        }).lean();
        const { post_id } = req.params;
        const { content } = req.body;
        const comment = { _id: commentId, content, id_user: account._id, username: account.username, userAvatar: account.avatar };
        const post = await Post.findById(post_id);
        post.comments.push(comment)
        await post.save()
        // const cmt = new Comment(comment)
        // await Post.findByIdAndUpdate(post_id, {
        //     $push: {
        //         comments: {
        //             cmt
        //         },
        //     },
        // });
        res.status(200).send(comment);
    }

    async deleteComment(req, res) {
        const { post_id, comment_id } = req.params;
        const post = await Post.findById(post_id);
        const comment = post.comments.id(comment_id);
        comment.remove();
        await post.save();
        res.status(200).send({ comment });
    }

}

module.exports = new PostController();