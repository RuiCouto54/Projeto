export default class PostModel {
    constructor() {
        this.posts = localStorage.posts ? JSON.parse(localStorage.posts) : [];
    }

    getAll() {
        return this.posts;
    }

    create(username, sentence, img) {
        const post = {
            username: username,
            sentence: sentence,
            img: img
        }
        this.posts.push(post);
        this._saveStorage();
    }

    remove(name) {
        this.posts = this.posts.filter(post => post.name != name)
        this._saveStorage()
    }

    _saveStorage() {
        localStorage.setItem('posts', JSON.stringify(this.posts));
    }
}