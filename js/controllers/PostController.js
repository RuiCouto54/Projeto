import PostModel from '../models/PostModel.js'

export default class PostController {
    constructor() {
        this.postModel = new PostModel()
    }

    addPost(username, sentence, img) {
        this.postModel.create(username, sentence, img)
    }

    getPosts() {
        return this.postModel.getAll()
    }

    removePost(name) {
        this.postModel.remove(name)
    }
}