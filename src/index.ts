import ControllerImpl from "./controller/controller";
import Character from "./obj/character";
import { ContextCanvasWrapper } from "./obj/contextWrapper";
import type from "./type/arrowType";
import ddongGenerator from "./utils/ddongGen";


function init(e:KeyboardEvent, character:Character){
    const {key} = e;
    if(key == type.Left || key == type.Right ){

        if(key == type.Left) character.moveLeft();
        else character.moveRight();

    }  
}

function closeModal(){
    const modal = document.querySelector('.modal');
    modal.classList.remove('active');

}


function startGame(){

        const canvas = document.querySelector('canvas');
        const context = canvas.getContext("2d");
        
        
        const contextWrapper = new ContextCanvasWrapper(context);
        
        const controller = new ControllerImpl(ddongGenerator,contextWrapper);
        
        controller.Init((character)=>{
            const gameInit = (ch: KeyboardEvent): void => init(ch, character);
            window.addEventListener('keydown',gameInit);    
            window.addEventListener('gameOver',()=>{
                window.removeEventListener('keydown',gameInit)});                    
        })
        

        closeModal();
        
        controller.start();
        controller.appendNewDdong();
        
        
}
window.addEventListener('gameOver',()=>{
    const modal = document.querySelector('.game');
    modal.classList.add('active');
})
window.addEventListener('load',startGame);
window.addEventListener('load',()=>{
    const modal = document.querySelector('.game');
    modal.addEventListener('click',()=>{
        startGame();
        const modal = document.querySelector('.game');
        modal.classList.remove('active');
    })
})