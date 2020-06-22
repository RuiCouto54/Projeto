import EventController from '../controllers/EventController.js'
import UserController from '../controllers/UserController.js'

export default class EventView {
    constructor() {
        this.eventController = new EventController();
        this.userController = new UserController();

        // catalogo
        this.catalog = document.querySelector("#eventsCatalog")
        this.btnSearch = document.querySelector("#btnSearch")
        this.btnSort = document.querySelector("#btnSort")
        this.btnAdd = document.querySelector("#btnAdd")
        this.txtEventName = document.querySelector("#txtEventName")
        this.txtLocation = document.querySelector("#txtLocation")
        this.sltDistance = document.querySelector("#sltDistance")
        this.imgNav = document.querySelector("#imgNav")

        this.renderCatalog(this.eventController.getEvents())
        this.fillUserData()
        this.bindAddFilterEvent()
        this.bindAddSortEvent()
        this.bindAddAddEvent()
        this._renderAddBandButton()
        this.bindAddRemoveEvent()
    }

    fillUserData() {
        const currentUser = this.userController.getCurrentUser()
        this.imgNav.src = currentUser.img
    }

    bindAddFilterEvent() {
        this.btnSearch.addEventListener('click', () => {
            this.renderCatalog(this.eventController.getEvents(this.txtEventName.value, this.txtLocation.value, this.sltDistance.value))
        })
    }

    bindAddSortEvent() {
        this.btnSort.addEventListener('click', () => {
            this.renderCatalog(this.eventController.getEvents(this.txtEventName.value, this.txtLocation.value, this.sltDistance.value, true))
        })
    }

    bindAddAddEvent() {
        this.btnAdd.addEventListener('click', () => {
            location.href='../html/addEvent.html';
        })
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.getElementsByClassName("see")) {
            btnSee.addEventListener('click', event => {
                this.eventController.setCurrentEvent(event.target.id)  
                location.href='../html/event.html';
            })
        }
    }

    bindAddRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.eventController.removeEvent(event.target.id)
                this.renderCatalog(this.eventController.getEvents(this.txtEventName.value, this.txtLocation.value, this.sltDistance.value))
            })
        }
    }

    renderCatalog(provas = []) {
        let result = ''
        let i=0
        for (const prova of provas) {
            if(i % 3 === 0) { result+=`<div class="row mb-2">` }
            result += this._generateEventCard(prova)
            i++
            if(i % 3 ===0) {result+=`</div>`}            
        }

        this.catalog.innerHTML = result;
        

        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    _generateEventCard(prova) {
        let html = `
        <div class="col-sm-4">
            <div class="card">
                <img class="card-img-top" src="${prova.logo}" alt="" width="200px" height="300px">
                <div class="card-body">
                    <h4 class="card-title" >${prova.name}</h4>
                    <button id="${prova.id}" class="btn btn-primary see">Ver mais</button>
            `
            if(this.userController.checkLoginStatus()) {
                html+= `<button id="${prova.name}" class="btn btn-danger remove">Remover</button>`
            }
                
            html+= `
                </div>
            </div>
        </div>        
        `
        return html
    }

    _renderAddBandButton() {
        if(this.userController.checkLoginStatus()) {
            this.btnAdd.style.visibility = 'visible';
        } else {
            this.btnAdd.style.visibility = 'hidden';
        }
    }
}