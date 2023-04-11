import {StateManager}  from "./controller/controller";
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

function showReButton(){
    const modal = document.querySelector('.game');
    modal.classList.add('active');
    
}

function startGame(){

        const canvas = document.querySelector('canvas');
        const context = canvas.getContext("2d");
        
        
        const contextWrapper = new ContextCanvasWrapper(context);
        
        const controller = StateManager.getControllerInstance(ddongGenerator,contextWrapper);
        const controller2 = StateManager.getControllerInstance(ddongGenerator,contextWrapper);
       
        if(controller !== controller2) throw new Error("singleTon Error")

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

function showFinalScore(e:CustomEvent){
    const score = document.querySelector('#final-score');
    score.innerHTML = e.detail.score;
}
window.addEventListener('gameOver',(e:CustomEvent)=>{
    showReButton();
    showFinalScore(e);
    StateManager.initController();
})
window.addEventListener('load',startGame);
window.addEventListener('load',()=>{
    const modal = document.querySelector('.game');
    modal.addEventListener('click',()=>{
        startGame();
        modal.classList.remove('active')
    })
})
window.addEventListener('scoreChange',(e:CustomEvent)=>{
    const score = document.querySelector('#score');
    score.innerHTML = e.detail.score;
})