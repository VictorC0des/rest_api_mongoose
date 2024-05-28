import express from "express"
import ArticleModel from "../models/article.js"

const router = express.Router();
router.post("/articles", async (request, response) => {
    const article = new ArticleModel(request.body)
    try {
        await article.save()
        response.status(200).json({ message: "ok", body: article })

    } catch (error) {
        response.status(500).send(error)

    }

})
router.get("/articles", async (request, response) => {
    try {
        const articles = await ArticleModel.find();;
        response.status(200).json({ message: "ok", body: articles })
    } catch (error) {
        response.status(500).json({ message: "Internal server error", body: error });
    }
})
router.get("/articles/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const article = await ArticleModel.findById(id);

        if (!article) {
            return response.status(404).json({ message: "Not found", body: `The article with ${id} was not found` });
        }
        return response.status(200).json({ message: "Ok", body: article })
    } catch (error) {
        response.status(500).json({ message: "Internal server error", body: error });
    }
});

router.put("/articles/:id", async (request, response) => {
    try {
        const allowedKeys = ["title", "description", "content"];
        for (let i = 0; i < allowedKeys.length; i++) {
            if (!(allowedKeys[i] in request.body)) {
                return response.status(400).json({ message: "Bad request", body: `Missing field: ${allowedKeys[i]}` });
            }
        }

        const article = await ArticleModel.findByIdAndUpdate(request.params.id, request.body, { new: true });

        if (!article) {
            return response.status(404).json({ message: "Not found", body: `The article with ${id} was not found` });
        }

        response.status(200).json({ message: "Ok", body: article })
    } catch (error) {
        response.status(500).send(error);
    }
});

router.patch("/articles/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const article = await ArticleModel.findByIdAndUpdate(request.params.id, request.body, { new: true })

        if (!article) {
            return response.status(404).json({ message: "Not found", body: `The article with id ${id} was not found` });
        }

        return response.status(200).json({ message: "Ok", body: article });

    } catch (error) {
        return response.status(500).json({ message: "Internal server error", body: error});
    }
})

router.delete("/articles/:id", async (request, response) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(request.params.id)

        if (!article) {
            return response.status(404).json({ message: "Not found", body: `The article with id ${request.params.id} was not found` });
        }

        return response.status(200).json({ message: "Ok", body: `The article with id ${request.params.id} was successfully deleted` });

    } catch (error) {
        return response.status(500).json({ message: "Internal server error", body: error });
    }
})

export default router