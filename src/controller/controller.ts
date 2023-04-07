import { ContextWrapper } from "../type/contextInterface";
import Ddong from "../obj/ddong"
import Character from "../obj/character";

interface Controller{
    character : Character;
    context : ContextWrapper;
    ddongGenerator : ()=>Ddong[];
    ddongs:Ddong[];
    start():void;
    appendNewDdong():void;
    ddongCreateTimer:number | null;
    stop(fn:(id:number)=>void):void;
    Init(initFn:(ch:Character)=>void):void;
    detectIfCharacterCrushed():boolean;
}

class ControllerImpl implements Controller{
    character: Character;
    ddongCreateTimer: number;
    ddongGenerator: () => Ddong[];
    ddongs: Ddong[];
    context: ContextWrapper;

    constructor(ddongGenerator:()=>Ddong[], context:ContextWrapper){
        this.ddongGenerator = ddongGenerator;
        this.context = context;
        this.ddongs = ddongGenerator();
        this.ddongCreateTimer = null;
        this.character = new Character(null,{backgroundColor:'red'});
    }   

    Init(fn:((ch:Character)=>void)){
        fn(this.character);
    }

    stop(fn:(id:number, context:ContextWrapper)=>void): void {
        fn(this.ddongCreateTimer, this.context);
    }

  
    start(): void {
        requestAnimationFrame(()=>{
            this.draw();
            if(!this.detectIfCharacterCrushed()) this.start();
            else this.stop(this.clearMethod());
        });
        
    }


    detectIfCharacterCrushed(){
        const xRange = this.character.getX()+10;
        const yRange = this.character.getY();

        const r = this.ddongs.filter(ddong=>{
                                        const x = ddong.getX();
                                        const y = ddong.getY();

                                        if(y == yRange-8){
                                            if(x>=this.character.getX() && x<xRange){
                                                return true;
                                            }
                                        }
                                        return false;
                                    }).length
    
        if(r > 0){
            return true;
        }
        return false;
                                }



    appendNewDdong(): void {
        const id =  window.setInterval(()=>{
            this.ddongs = [...this.ddongs, ...this.ddongGenerator()];
        },1000)


        this.ddongCreateTimer  = id;
    }

    private clearMethod(): (id: number, context: ContextWrapper) => void {
        return (id, context) => {
            alert("Gane Over");

            if (id)
                window.clearInterval(id);
                context.clear();

            if(window) window.dispatchEvent(new Event("gameOver"));

        };
    }

    private draw() {
        this.context.clear();
        this.context.draw(this.ddongs);
        this.context.draw([this.character])
        this.ddongs = this.ddongs
            .map(ddong => new Ddong({currentX:ddong.getX(), currentY:ddong.getY()+1}))
            .filter(ddong=>ddong.getY() < 1000)
            

    }
}

interface StateManager{
    impl : Controller | null;
    getControllerInstance(ddongGenerator: () => Ddong[], context: ContextWrapper):Controller;
    initController():void;
}

export const StateManager :StateManager = {
    impl : null,

    getControllerInstance(ddongGenerator: () => Ddong[], context: ContextWrapper) : Controller{

        if(this.impl!==null) {
            console.log("impl이 존재함")
            return this.impl;
        }
        else if(this.impl === null){
            console.log("imple이 존재하지 않음.")
            this.impl =  new ControllerImpl(ddongGenerator,context);
            return this.impl;
        }
    },

     initController(){
        console.log(this.impl+" 초기화")
        this.impl = null;  
    }

}

