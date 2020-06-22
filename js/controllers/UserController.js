import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    createUser(username, password) {
        if(!this.userModel.getAll().some(user => user.username === username)) {
            this.userModel.create(username, password);
        } else {
            throw Error(`O nome ${username} não se encontra disponível`);
        }
    }

    getAll() {
        return this.userModel.getAll();
    }

    getAllData() {
        return this.userModel.getAllData();
    }

    createUserData(username, password, name, img, age, location, height, runType, favComp, averageKm, shoe, equip, points) {
        if(!this.userModel.getAllData().some(user => user.username === username)) {
            this.userModel.createData(username, password, name, img, age, location, height, runType, favComp, averageKm, shoe, equip, points);
        }
    }

    setCurrentUser(username) {
        this.userModel.setCurrentUser(username);
    }

    getCurrentUser() {
        return this.userModel.getCurrentUser();
    }

    loginUSer(username, password) {
        if (this.userModel.getAll().some(user => {return user.username === username && user.password === password})) {
            this.userModel.login(username);
            return true;
        } else {
            throw Error('Login inválido!');
        }
    }

    loginUserTime(username) {
        return this.userModel.userLogged(username);
    }

    logoutUser() {
        this.userModel.logout();
    }

    checkLoginStatus() {
        return this.userModel.isLogged();
    }

    checkUserLogged() {
        return this.userModel.userIsLogged();
    }

    removeUser(name) {
        this.userModel.remove(name)
    }

    removeUserData(name) {
        this.userModel.removeData(name)
    }

    sort() {
        return this.userModel.sort()
    }
}