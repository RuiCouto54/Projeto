import TrophieModel from '../models/TrophieModel.js'

export default class TrophieController {
    constructor() {
        this.trophieModel = new TrophieModel()
    }

    addTrophie(type, logo, desc, points, date) {
        if(!this.trophieModel.getAll().some(prova => prova.desc === desc)) {
            this.trophieModel.create(type, logo, desc, points, date);
        } else {
            throw Error(`o troféu ${desc} já existe!`);
        }
    }

    getAllTrophies() {
        return this.trophieModel.getAll()
    }

    removeTrophie(desc) {
        this.trophieModel.remove(desc)
    }
}