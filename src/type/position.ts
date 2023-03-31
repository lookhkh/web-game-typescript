import Cordinate from "./Cordinate";

export default interface PlaceAble{
    position : Cordinate;
    getX:()=>number;
    getY:()=>number;
}