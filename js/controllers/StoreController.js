import StoreModel from '../models/StoreModel.js'

export default class StoreController {
    constructor() {
        this.storeModel = new StoreModel()
    }

    addShoe(name, brand, runType, size, price, img) {
        if(!this.storeModel.getAllShoes().some(sapatilha => sapatilha.name === name)) {
            this.storeModel.createShoe(name, brand, runType, size, price, img);
        } else {
            throw Error(`O produto ${name} já existe!`);
        }
    }

    addShirt(name, brand, size, price, img) {
        if(!this.storeModel.getAllShirts().some(camisola => camisola.name === name)) {
            this.storeModel.createShirt(name, brand, size, price, img)
            
        } else {
            throw Error (`O produto ${name} já existe!`);
        }
    }

    removeShoe(name) {
        this.storeModel.removeShoe(name)
    }

    removeShirt(name) {
        this.storeModel.removeShirt(name)
    }

    getShoes(filterBrand='', filterType='', filterSize='') {
        const sapatilhas = this.storeModel.getAllShoes()

        if (filterBrand === '' && filterType === '' && filterSize === '') {
            return sapatilhas;
        }

        let filteredShoes = [];

        for (const sapatilha of sapatilhas) {
            let filterShoeBrand = false , filterShoeType = false, filterShoeSize = false

            if ((sapatilha.brand.includes(filterBrand) && filterBrand != '') || filterBrand === '') {
                filterShoeBrand = true;
            }

            if ((sapatilha.runType.includes(filterType) && filterType != '') || filterType === '') {
                filterShoeType = true;
            }

            if ((sapatilha.size.includes(filterSize) && filterSize != '') || filterSize === '') {
                filterShoeSize = true;
            }

            if (filterShoeBrand && filterShoeType && filterShoeSize) {
                filteredShoes.push(sapatilha)
            }
        }

        return filteredShoes
    }

    getShirts(filterBrand='', filterSize='') {
        const camisolas = this.storeModel.getAllShirts()

        if (filterBrand === '' && filterSize === '') {
            return camisolas;
        }

        let filteredShirts = [];

        for (const camisola of camisolas) {
            let filterShirtBrand = false , filterShirtSize = false

            if ((camisola.brand.includes(filterBrand) && filterBrand != '') || filterBrand === '') {
                filterShirtBrand = true;
            }

            if ((camisola.size.includes(filterSize) && filterSize != '') || filterSize === '') {
                filterShirtSize = true;
            }

            if (filterShirtBrand && filterShirtSize) {
                filteredShirts.push(camisola)
            }
        }

        return filteredShirts
    }
}