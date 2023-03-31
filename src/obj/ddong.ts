import Cordinate from "../type/Cordinate";
import PlaceAble from "../type/position";

export default class Ddong implements PlaceAble{
   
    position:Cordinate;

    constructor(position:Cordinate){
        this.position = position;
    }

    getX(){
        return this.position.currentX;
    };

    getY(){
        return this.position.currentY;
    }
}

