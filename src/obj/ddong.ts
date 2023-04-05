import Cordinate from "../type/Cordinate";
import PlaceAble, { Style } from "../type/position";
import getDefaultBackground from "../utils/styleGen";

export default class Ddong implements PlaceAble{
   
    position:Cordinate;
    style?: Style;

    constructor(position:Cordinate , style?:Style){
        this.position = position;
        this.style = style? style : getDefaultBackground();
    }

    getX(){
        return this.position.currentX;
    };

    getY(){
        return this.position.currentY;
    }
}

