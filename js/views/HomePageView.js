import UserController from '../controllers/UserController.js'
import PostController from '../controllers/PostController.js'

export default class HomePageView {
    constructor() {
        this.userController = new UserController();
        this.postController = new PostController();

        //DOM
        this.usersTable = document.querySelector("#usersTable")
        this.btnMembers = document.querySelector("#btnMembers")
        this.mdlUserGestor = document.querySelector("#mdlUserGestor")
        this.logout = document.querySelector("#logout")
        this.imgNav = document.querySelector("#imgNav")
        this.btnModalClose = document.querySelector("#btnModalClose")
        this.containerFeed = document.querySelector("#containerFeed")

        this.renderTable(this.userController.getAll())
        this.renderFeed(this.postController.getPosts())
        this._renderUserGestorButton()
        this.fillUserData()
        this.bindAddLogoutEvent()
        this.bindRemoveEvent()
    }

    renderFeed(posts = []) {
        const currentUser = this.userController.getCurrentUser()
        let result = ''
        let comment = 0
        let like = 0
        for (let post of posts) {
            result += `
            <div class="container " id="feed">
                <h4 class="align-center mt-2">${post.username} postou</h4>
                <h4 class="align-center mt-2">${post.sentence}</h4>
                <img src="${post.img}" id="imgFeed" alt="..." class="rounded-0 mt-2 " width="200px">
                <h4>${like} gostos | ${comment} comentários</h4>
                <div id="icons">
                    <button id="btnLike" type="button" class="btn btn-dark mr-2"><img src="../img/icon-like.png" id="likeIcon" alt="..." class="rounded-0 mt-2" width="25px"></button>
                    <button id="btnComment" type="button" class="btn btn-dark ml-2"><img src="../img/icon-comment.png" id="CommentIcon" alt="..." class="rounded-0 mt-2" width="25px"></button>
                </div>
                <div id="comments" class="mt-4 mb-2">
                    <img src="${currentUser.img}" id="userIcon" alt="..." class="rounded-circle mr-2" width="50px">
                    <input type="text" class="" id="txtComment" placeholder="Insira um comentário" />
                </div>
                
            </div>
            <br>
            <br>

            
            
            `
        }
        this.containerFeed.innerHTML += result
    }

    renderTable(users = []) {
        let result = "<tr><th>Username</th><th>Eliminar</th></tr>"
        this.usersTable.innerHTML = " "
        this.btnMembers.addEventListener('click', event => {
            event.preventDefault()
            for (let user of users) {
                result += `
                <tr><td>${user.username}</td><td><button id="${user.username}" class="btn btn-danger remove">Remover</button></td></tr>`
            }
            this.usersTable.innerHTML = result
            this.bindRemoveEvent()
        })
        
        
            
    }

    bindRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName('remove')) {
            btnRemove.addEventListener('click', event => {
                this.userController.removeUser(event.target.id)
                this.renderTable(this.userController.getAll())
            })
        }
    }

    fillUserData() {
        const currentUser = this.userController.getCurrentUser() 
        this.imgNav.src = currentUser.img
    }

    _renderUserGestorButton() {
        if(this.userController.checkLoginStatus()) {
            this.btnMembers.style.visibility = 'visible';
        } else {
            this.btnMembers.style.visibility = 'hidden';
        }
    }

    bindAddLogoutEvent() {
        this.logout.addEventListener('click', event => {
            this.userController.logoutUser();
            location.href="index.html";
        });
    }
}