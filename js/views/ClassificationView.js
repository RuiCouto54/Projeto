import TrophieController from '../controllers/TrophieController.js'
import UserController from '../controllers/UserController.js'

export default class ClassificationView {
    constructor() {
        this.trophieController = new TrophieController();
        this.userController = new UserController();

        this.classificationTable = document.querySelector("#classificationTable tbody")
        this.imgNav = document.querySelector("#imgNav")

        this.sort()
        this.renderTable(this.userController.getAllData())
        this.fillUserData()
    }

    renderTable(usersData = []) {
        
        let result = ''
        let cont = 1;
        for (let user of usersData) {
            result += `<tr>
            <td>${cont}º lugar</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>N/A</td>
            <td>${user.points} Pts</td>
            </tr><br>`
            cont++
        }
        this.classificationTable.innerHTML += result
    }

    fillUserData() {
        const currentUser = this.userController.getCurrentUser()
        this.imgNav.src = currentUser.img
    }

    sort() {
        this.userController.sort()
    }
}