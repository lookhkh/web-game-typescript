import Cordinate from "./Cordinate";

export interface Style{
    backgroundColor : string;
}


export default interface PlaceAble{
    position : Cordinate;
    style?:Style;
    getX:()=>number;
    getY:()=>number;
}

