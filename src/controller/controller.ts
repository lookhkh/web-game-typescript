import { ContextWrapper } from "../type/contextInterface";
import Ddong from "../obj/ddong"
import Character from "../obj/character";
import { debounce, throttle } from "lodash";

interface Controller{
    score:number;
    character : Character;
    context : ContextWrapper;
    ddongGenerator : ()=>Ddong[];
    ddongs:Ddong[];
    ddongsSnapshot:Ddong[];
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
    ddongsSnapshot:Ddong[] | undefined;
    context: ContextWrapper;
    score: number;
    constructor(ddongGenerator:()=>Ddong[], context:ContextWrapper){
        this.ddongGenerator = ddongGenerator;
        this.context = context;
        this.ddongs = ddongGenerator();
        this.ddongsSnapshot = undefined;
        this.ddongCreateTimer = null;
        this.character = new Character(null,{backgroundColor:'red'});
        this.score = 0;
    }   

    Init(fn:((ch:Character)=>void)){
        fn(this.character);
        
    }

    stop(fn:(id:number, context:ContextWrapper, score:number)=>void): void {
        fn(this.ddongCreateTimer, this.context, this.score);
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

    private clearMethod(): (id: number, context: ContextWrapper , score:number) => void {
        return (id, context, score) => {
            alert("Gane Over");

            if (id)
                window.clearInterval(id);
                context.clear();

            if(window) {
                this.fireGameOverEvent(score);
            }
        };
    }

    private fireGameOverEvent(score: number) {
        const detail: CustomEventInit = { detail: { score } };
        const event = new CustomEvent("gameOver", detail);

        window.dispatchEvent(event);
    }

    private draw() {
        this.context.clear();
        this.context.draw(this.ddongs);
        this.context.draw([this.character])
        this.ddongsSnapshot = this.ddongs;
        this.ddongs = this.ddongs
            .map(ddong => new Ddong({currentX:ddong.getX(), currentY:ddong.getY()+1}))
            .filter(ddong=>ddong.getY() < 1000)
        throttle(this.fireGameScoreChangeEvent(),1000)();
    }

    private fireGameScoreChangeEvent() {
              this.score+=1;
              return ()=>window.dispatchEvent(new CustomEvent('scoreChange',{detail:{score:this.score}}));
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

