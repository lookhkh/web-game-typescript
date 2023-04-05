import Cordinate from "../type/Cordinate";
import PlaceAble, { Style } from "../type/position";

export default class Ddong implements PlaceAble{
   
    position:Cordinate;
    style?: Style;

    constructor(position:Cordinate , style?:Style){
        this.position = position;
        this.style = style? style : {
            backgroundColor:'black'
        }
    }

    getX(){
        return this.position.currentX;
    };

    getY(){
        return this.position.currentY;
    }
}

