import TrophieController from '../controllers/TrophieController.js'
import UserController from '../controllers/UserController.js'

export default class TrophieView {
    constructor() {
        this.trophieController = new TrophieController();
        this.userController = new UserController();

        // tabelas
        this.individualTable = document.querySelector("#individualTable")
        this.teamTable = document.querySelector("#teamTable")
        this.btnAddModal = document.querySelector("#btnAddModal")
        this.frmAddTrophies = document.querySelector("#frmAddTrophies")
        this.sltType = document.querySelector("#sltType")
        this.txtDesc = document.querySelector("#txtDesc")
        this.txtPoints = document.querySelector("#txtPoints")
        this.logo = '../img/cadeado.png'
        this.Date = 'N/A'
        this.mdlAddMessage = document.querySelector("#mdlAddMessage")
        this.imgNav = document.querySelector("#imgNav")

        this.renderTables(this.trophieController.getAllTrophies())
        this._renderAddTrophieButton()
        this.fillUserData()
        this.bindAddAddEvent()
        this.bindRemoveEvent()
        this.bindTrophieCheck()
        
    }

    fillUserData() {
        const currentUser = this.userController.getCurrentUser()
        this.imgNav.src = currentUser.img
    }

    bindAddAddEvent() {
        this.frmAddTrophies.addEventListener('submit', event=> {
            event.preventDefault()
            try {
                this.trophieController.addTrophie(
                    this.sltType.value,
                    '../img/cadeado.png',
                    this.txtDesc.value,
                    this.txtPoints.value,
                    'N/A'
                );
                this.displayAddTrophieMessage('Troféu adicionado com sucesso!', 'success');
            } catch(e) {
                this.displayAddTrophieMessage(e, 'danger');
            }
        })
    }

    bindRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName('remove')) {
            btnRemove.addEventListener('click', event => {
                this.trophieController.removeTrophie(event.target.id)
                this.renderTables(this.trophieController.getAllTrophies())
            })
        }
    }

    bindTrophieCheck() {
        const currentUser = this.userController.getCurrentUser()
        const username = currentUser.username
        const password = currentUser.password
        const name = currentUser.name
        const img = currentUser.img
        const age = currentUser.age
        const location = currentUser.location
        const height = currentUser.height
        const runType = currentUser.runType
        const favComp = currentUser.favComp
        const averageKm = currentUser.averageKm
        const shoe = currentUser.shoe
        const equip = currentUser.equip
        let points = currentUser.points
        for (const btnCheck of document.getElementsByClassName('check')) {
            btnCheck.addEventListener('click', event => {
                points += parseInt(event.target.id)
                this.userController.removeUserData(this.userController.checkUserLogged())
                this.userController.createUserData(
                    username,
                    password,
                    name,
                    img,
                    age,
                    location,
                    height,
                    runType,
                    favComp,
                    averageKm,
                    shoe,
                    equip,
                    points
                )
            })
        }
    }

    renderTables(trofeus = []) {
        let resultIndividual = ''
        let resultTeam = ''
        for (const trofeu of trofeus) {
            if (trofeu.type === 'individual') {
                resultIndividual += `<tr>
                <td><button id="${trofeu.points}" class="btn btn-success check">Feito</button></td>
                <td>${trofeu.desc}</td>
                <td>${trofeu.points}</td>
                <td>${trofeu.date}</td> `
                if(this.userController.checkLoginStatus()) {
                    resultIndividual += `<td><button id="${trofeu.desc}" class="btn btn-danger remove">Remover</button></td>`
                }
                resultIndividual += `</tr>`
            }   else if (trofeu.type === 'coletivo') {
                resultTeam += `<tr>
                <td><button id="${trofeu.points}" class="btn btn-success check">Feito</button></td>
                <td>${trofeu.desc}</td>
                <td>${trofeu.points} Pts</td>
                <td>${trofeu.date}</td> `
                if(this.userController.checkLoginStatus()) {
                    resultTeam += `<td><button id="${trofeu.desc}" class="btn btn-danger remove">Remover</button></td>`
                }
                resultTeam += `</tr>`
            }        
        }
        this.individualTable.innerHTML += resultIndividual;
        this.teamTable.innerHTML += resultTeam;

        this.bindRemoveEvent()
    }

    _renderAddTrophieButton() {
        if(this.userController.checkLoginStatus()) {
            this.btnAddModal.style.visibility = 'visible';
        } else {
            this.btnAddModal.style.visibility = 'hidden';
        }
    }

    displayAddTrophieMessage(message, type) {
        this.mdlAddMessage.innerHTML = `
        <div class="alert alert-${type}" role="alert">${message}</div>
        `;
    }
}