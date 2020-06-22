export default class TrophieModel {
    constructor() {
        this.trofeus = localStorage.trofeus ? JSON.parse(localStorage.trofeus) : [];
    }

    getAll() {
        return this.trofeus;
    }

    create(type, logo, desc, points, date) {
        const trofeu = {
            type: type,
            logo: logo,
            desc: desc,
            points: points,
            date: date
        }
        this.trofeus.push(trofeu);
        this._saveStorage();
    }

    remove(name) {
        this.trofeus = this.trofeus.filter(trofeu => trofeu.desc != name)
        this._saveStorage()
    }

    _saveStorage() {
        localStorage.setItem('trofeus', JSON.stringify(this.trofeus));
    }
}