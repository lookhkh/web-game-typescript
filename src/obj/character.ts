import Cordinate from "../type/Cordinate";
import PlaceAble from "../type/position";

const DEFAULT_MOVE = 3;

export default class Character implements PlaceAble{
    position: Cordinate;
    constructor(position?:Cordinate){
        this.position = position?position:{currentX:100,currentY:130};
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

 
