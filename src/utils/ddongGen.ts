import Ddong from "../obj/ddong";

export default function ddongGenerator(){
    const arr : Ddong[] = [];
    for(let i=1; i<5; i++){

        const obj = new Ddong({currentX:Math.random()*Math.random() * 1000, currentY:0});

        arr.push(obj);
    }
    
    return arr;
}
