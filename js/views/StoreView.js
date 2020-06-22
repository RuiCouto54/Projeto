import StoreController from '../controllers/StoreController.js'
import UserController from '../controllers/UserController.js'

export default class StoreView {
    constructor() {
        this.storeController = new StoreController();
        this.userController = new UserController()

        // catalogo
        this.shoeCatalog = document.querySelector("#shoeCatalog")
        this.sltShoeBrand = document.querySelector("#sltBrand")
        this.sltShoeType = document.querySelector("#sltType")
        this.sltShoeSize = document.querySelector("#sltSize")
        this.btnShoeSearch = document.querySelector("#btnShoeSearch")
        this.shirtCatalog = document.querySelector("#shirtCatalog")
        this.sltShirtBrand = document.querySelector("#sltShirtBrand")
        this.sltShirtSize = document.querySelector("#sltShirtSize")
        this.btnShirtSearch = document.querySelector("#btnShirtSearch")
        this.imgNav = document.querySelector("#imgNav")

        this.renderShoeCatalog(this.storeController.getShoes())
        this.renderShirtCatalog(this.storeController.getShirts())
        this.fillUserData() 
        this.bindAddFilterShoeEvent()
        this.bindAddFilterShirtEvent()
        this.bindAddRemoveShoeEvent()
        this.bindAddRemoveShirtEvent()
    }

    fillUserData() {
        const currentUser = this.userController.getCurrentUser()
        this.imgNav.src = currentUser.img
    }

    bindAddFilterShoeEvent() {
        this.btnShoeSearch.addEventListener('click', () => {
            this.renderShoeCatalog(this.storeController.getShoes(this.sltShoeBrand.value, this.sltShoeType.value, this.sltShoeSize.value))
        })
    }

    bindAddFilterShirtEvent() {
        this.btnShirtSearch.addEventListener('click', () => {
            this.renderShirtCatalog(this.storeController.getShirts(this.sltShirtBrand.value, this.sltShirtSize.value))
        })
    }

    bindAddRemoveShoeEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.storeController.removeShoe(event.target.id)
                this.renderShoeCatalog(this.storeController.getShoes(this.sltShoeBrand.value, this.sltShoeType.value, this.sltShoeSize.value))
            })
        }
    }

    bindAddRemoveShirtEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.storeController.removeShirt(event.target.id)
                this.renderShirtCatalog(this.storeController.getShirts(this.sltShirtBrand.value, this.sltShirtSize.value))
            })
        }
    }

    renderShoeCatalog(sapatilhas = []) {
        let result = ''
        let i=0
        for (const sapatilha of sapatilhas) {
            if(i % 3 === 0) { result+=`<div class="row mb-4">` }
            result += this._generateShoeCard(sapatilha)
            i++
            if(i % 3 ===0) {result+=`</div>`}            
        }

        this.shoeCatalog.innerHTML = result;
        this.bindAddRemoveShoeEvent()
    }

    _generateShoeCard(sapatilha) {
        let html = `
        <div class="col-sm-4">
            <div class="card">
                <img class="card-img-top" src="${sapatilha.img}" alt="" width="250px" height="350px">
                <div class="card-body">
                    <h4 class="card-title" >${sapatilha.name}</h4>
                    <h4>${sapatilha.price}€</h4>
                    
            `
            if(this.userController.checkLoginStatus()) {
                html+= `<button id="${sapatilha.name}" class="btn btn-danger remove">Remover</button>`
            }
                
            html+= `
                </div>
            </div>
        </div>        
        `
        return html
    }

    renderShirtCatalog(camisolas = []) {
        let result = ''
        let i=0
        for (const camisola of camisolas) {
            if(i % 3 === 0) { result+=`<div class="row mb-4">` }
            result += this._generateShirtCard(camisola)
            i++
            if(i % 3 ===0) {result+=`</div>`}            
        }

        this.shirtCatalog.innerHTML = result;
        this.bindAddRemoveShirtEvent()
    }

    _generateShirtCard(camisola) {
        let html = `
        <div class="col-sm-4">
            <div class="card">
                <img class="card-img-top" src="${camisola.img}" alt="" width="250px" height="350px">
                <div class="card-body">
                    <h4 class="card-title" >${camisola.name}</h4>
                    <h4>${camisola.price}€</h4>
                    
            `
            if(this.userController.checkLoginStatus()) {
                html+= `<button id="${camisola.name}" class="btn btn-danger remove">Remover</button>`
            }
                
            html+= `
                </div>
            </div>
        </div>        
        `
        return html
    }
}