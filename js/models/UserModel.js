export default class UserModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
        this.usersData = localStorage.usersData ? JSON.parse(localStorage.usersData) : [];
    }

    sort() {
        this.usersData.sort(this._compare);
        this._saveStorage();
    }

    getAll() {
        return this.users;
    }

    getAllData() {
        return this.usersData
    }

    create(username, password) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length -1].id + 1 : 1,
            username: username,
            password: password
        }

        
        this.users.push(user);
        this._saveStorage();
    }

    createData(username, password, name, img, age, location, height, runType, favComp, averageKm, shoe, equip, points) {
        const userData = {
            id: this.usersData.length > 0 ? this.users[this.users.length -1].id + 1 : 1,
            username: username,
            password: password,
            name: name,
            img: img,
            age: age,
            location: location,
            height: height,
            runType: runType,
            favComp: favComp,
            averageKm: averageKm,
            shoe: shoe,
            equip: equip,
            points: points
        }
        this.usersData.push(userData);
        this._saveStorage();
    }

    login(user) {
        sessionStorage.setItem('loggedUser', user);
    }

    logout() {
        sessionStorage.removeItem('loggedUser');
    }

    userLogged() {
        return sessionStorage.getItem('loggedUser')
    }

    isLogged() {
        let v = sessionStorage.getItem('loggedUser')
        return v === 'admin' ? true : false;
    }

    userIsLogged() {
        return sessionStorage.getItem('loggedUser')
    }

    setCurrentUser(username) {
        localStorage.setItem('userData', username);
    }

    getCurrentUser() {
        return this.usersData.find(userData => userData.username === localStorage.userData)
    }

    remove(name) {
        this.users = this.users.filter(user => user.username != name)
        this._saveStorage()
    }

    removeData(name) {
        this.usersData = this.usersData.filter(user => user.username != name) 
        this._saveStorage()
    }

    _saveStorage() {
        localStorage.setItem('users' , JSON.stringify(this.users));
        localStorage.setItem('usersData' , JSON.stringify(this.usersData));
    }

    _compare(userA, userB) {
        if (userA.points < userB.points)
            return -1;
        if (userA.points > userB.points)
            return 1;
        return 0;
    }

    
}