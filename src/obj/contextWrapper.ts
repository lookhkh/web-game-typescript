import { ContextWrapper } from "../type/contextInterface";
import PlaceAble from "../type/position";
import DefaultObject from "./defaultObject";

export class ContextCanvasWrapper implements ContextWrapper{

    private context : CanvasRenderingContext2D;

    constructor(context:CanvasRenderingContext2D ){
        this.context = context;
    }

    draw(object : PlaceAble[]){
        object.forEach(obj=>{

            const { backgroundColor } = obj.style;
            const {currentX, currentY} = obj.position;
            
            this.context.fillStyle=backgroundColor;
            this.context.fillRect(currentX, currentY,10,10);
        });
    };

    clear(){
        this.context.clearRect(0, 0, 1000, 1000);
    }

}