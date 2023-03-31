import Cordinate from "../type/Cordinate";

export default class DefaultObject{
    currentX : number;
    currentY : number;  

    constructor(obj : Cordinate){
        this.currentX = obj.currentX;
        this.currentY = obj.currentY;
    }

}

