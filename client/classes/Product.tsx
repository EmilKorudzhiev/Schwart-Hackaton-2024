export default class Product {
    public category: string;
    public name: string;
    public id: string;

    constructor(productString: string) {
        let productDetailCol = productString.split(",");
        this.id = productDetailCol[0];
        this.name = productDetailCol[2];
        this.category = productDetailCol[1];
    }
}