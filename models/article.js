import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },

    description: { type: String },

    content: { type: String, required: true }
},{timestamps: true})

const ArticleModel = mongoose.model('Article', ArticleSchema);
export default ArticleModel;
