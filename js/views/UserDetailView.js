import UserController from '../controllers/UserController.js'
import PostController from '../controllers/PostController.js'

export default class UserDetailView {
    constructor() {
        this.userController = new UserController()
        this.postController = new PostController()

        //DOM
        this.txtUserName = document.querySelector("#txtUserName")
        this.imgUser = document.querySelector("#imgUser")
        this.txtUserLocation = document.querySelector("#txtUserLocation")
        this.txtUserAge = document.querySelector("#txtUserAge")
        this.txtUserHeight = document.querySelector("#txtUserHeight")
        this.txtRunType = document.querySelector("#txtRunType")
        this.txtFavComp = document.querySelector("#txtFavComp")
        this.txtAverageKm = document.querySelector("#txtAverageKm")
        this.txtShoe = document.querySelector("#txtShoe")
        this.txtEquip = document.querySelector("#txtEquip")
        this.imgNav = document.querySelector("#imgNav")
        this.frmPost = document.querySelector("#frmPost")
        this.txtPost = document.querySelector("#txtPost")
        this.imgPost = document.querySelector("#imgPost")

        this.fillUserData()
        this.post()
    }

    fillUserData() {
        const currentUser = this.userController.getCurrentUser()
        this.imgNav.src = currentUser.img
        this.txtUserName.innerHTML = currentUser.name
        this.imgUser.src = currentUser.img
        this.txtUserLocation.innerHTML = `Localidade: ${currentUser.location}` 
        this.txtUserAge.innerHTML = `Idade: ${currentUser.age}`
        this.txtUserHeight.innerHTML = `Altura: ${currentUser.height} cm`
        this.txtRunType.innerHTML = `Tipo de Passada: ${currentUser.runType}`
        this.txtFavComp.innerHTML = `Prova Favorita: ${currentUser.favComp}`
        this.txtAverageKm.innerHTML = `Média de distância: ${currentUser.averageKm}`
        this.txtShoe.innerHTML = `Sapatilha: ${currentUser.shoe}`
        this.txtEquip.innerHTML = `Camisola: ${currentUser.equip}`
    }

    post() {
        this.frmPost.addEventListener('submit', event => {
            event.preventDefault()
            this.postController.addPost(this.txtUserName.innerHTML, this.txtPost.value , this.imgPost.value)
        })
    }
}