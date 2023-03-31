import ControllerImpl from "./controller/controller";
import Ddong from "./obj/ddong";

window.addEventListener('load',()=>{

const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");

const ddongGenerator = ()=>{
    const arr : Ddong[] = [];
    for(let i=1; i<6; i++){
        arr.push({currentX:Math.random()*Math.random() * 1000, currentY:0});
    }
    
    return arr;
}

const controller = new ControllerImpl(ddongGenerator,context);

controller.showDdong();
controller.appendNewDdong();


console.log(controller)

controller.stop((id)=>window.clearInterval(id));
})