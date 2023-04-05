import Cordinate from "../type/Cordinate";
import PlaceAble, { Style } from "../type/position";
import getDefaultBackground from "../utils/styleGen";

const DEFAULT_MOVE = 3;

export default class Character implements PlaceAble{
    position: Cordinate;
    style?: Style;
    constructor(position:Cordinate, style?:Style){
        this.position = position?position:{currentX:100,currentY:130};
        this.style = style? style : getDefaultBackground();
    }

    moveLeft(){
        
        console.log("MOVE LEFT")
        this.position = {...this.position, currentX:this.getX()-DEFAULT_MOVE};
    }

    moveRight(){
        console.log("MOVE RIGHT")
        this.position = {...this.position, currentX:this.getX()+DEFAULT_MOVE};

    }

    getX(){
        return this.position.currentX;
    };

    getY(){
        return this.position.currentY;
    }
}

 
