export default class EventModel {
    constructor() {
        this.provas = localStorage.provas ? JSON.parse(localStorage.provas) : [];
        this.TemposProvas = localStorage.TemposProvas ? JSON.parse(localStorage.TemposProvas) : [];
    }

    getAll() {
        return this.provas;
    }

    getAllTime() {
        return this.TemposProvas;
    }

    create(name, location, date, price, retrieve, record, timeLimit, personLimit, logo, description, course, coordBegin, coordEnd) {
        const prova = {
            id: this.provas.length > 0 ? this.provas[this.provas.length - 1].id + 1 : 1,
            name: name,
            location: location,
            date: date,
            price: price,
            retrieve: retrieve,
            record: record,
            timeLimit: timeLimit,
            personLimit: personLimit,
            logo: logo,
            description: description,
            course: course,
            coordBegin: coordBegin,
            coordEnd: coordEnd
        }
        this.provas.push(prova);
        this._saveStorage();
    }

    sort() {
        this.provas.sort(this._compare);
        this._saveStorage();
    }

    setCurrentEvent(id) {
        localStorage.setItem('prova', id);
    }

    getCurrentEvent() {
        return this.provas.find(prova => prova.id === +localStorage.prova)
    }

    removeUserTime(username, eventName) {
        this.TemposProvas = this.TemposProvas.filter(eventTime => eventTime.username !== username)
        localStorage.setItem(`${eventName}`, JSON.stringify(this.TemposProvas))
    }

    remove(name, eventName) {
        this.provas = this.provas.filter(prova => prova.name != name)
        this._saveStorage()
    }

    _saveStorage() {
        localStorage.setItem('provas', JSON.stringify(this.provas));
        
    }

    createEventArray(username, time, eventName) {
        
        

        if (localStorage.getItem(`${eventName}`)) {
            this.TemposProvas = JSON.parse(localStorage.getItem(`${eventName}`))

            const eventTime = {
                username: username,
                time: time
            }

            this.TemposProvas.push(eventTime)
        } else {
            const eventTime = {
                username: username,
                time: time
            }
    
            this.TemposProvas.push(eventTime)
            
        }

        localStorage.setItem(`${eventName}`, JSON.stringify(this.TemposProvas))
        
    }

    _compare(provaA, provaB) {
        if (provaA.name < provaB.name)
            return -1;
        if (provaA.name > provaB.name)
            return 1;
        return 0;
    }
}