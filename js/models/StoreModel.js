export default class StoreModel {
    constructor() {
        this.sapatilhas = localStorage.sapatilhas ? JSON.parse(localStorage.sapatilhas) : [];
        this.camisolas = localStorage.camisolas ? JSON.parse(localStorage.camisolas) : [];
    }

    getAllShoes() {
        return this.sapatilhas;
    }

    getAllShirts() {
        return this.camisolas;
    }

    createShoe(name, brand, runType, size, price, img) {
        const sapatilha = {
            id: this.sapatilhas.length > 0 ? this.sapatilhas[this.sapatilhas.length - 1].id + 1 : 1,
            name: name,
            brand: brand,
            runType: runType,
            size: size,
            price: price,
            img: img
        }
        this.sapatilhas.push(sapatilha);
        this._saveStorage();
    }

    createShirt(name, brand, size, price, img) {
        const camisola = {
            id: this.camisolas.length > 0 ? this.camisolas[this.camisolas.length - 1].id + 1 : 1,
            name: name,
            brand: brand,
            size: size,
            price: price,
            img: img
        }
    }

    removeShoe(name) {
        this.sapatilhas = this.sapatilhas.filter(sapatilha => sapatilha.name != name)
        this._saveStorage()
    }

    removeShirt(name) {
        this.camisolas = this.camisolas.filter(camisola => camisola.name != name)
        this._saveStorage()
    }

    _saveStorage() {
        localStorage.setItem('sapatilhas', JSON.stringify(this.sapatilhas));
        localStorage.setItem('camisolas', JSON.stringify(this.camisolas));
    }
}