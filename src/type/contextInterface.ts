import DefaultObject from "../obj/defaultObject";
import PlaceAble from "./position";

export interface ContextWrapper {
    draw:(object : PlaceAble[])=>void;
    clear:()=>void;
}