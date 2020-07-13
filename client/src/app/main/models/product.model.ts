export class Product {
    _id: number;
    name: string;
    author: string;
    description: string;
    price: string;
    link: string;
    imageUrl: string;

    constructor(_id,name,author,description='',price='0',link,imageUrl='') {
        this._id=_id
        this.name= name
        this.author= author
        this.description= description
        this.price= price
        this.link= link
        this.imageUrl= imageUrl
    }
}