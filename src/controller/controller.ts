import Ddong from "../obj/ddong"

interface Controller{
    context : CanvasRenderingContext2D;
    ddongGenerator : ()=>Ddong[];
    ddongs:Ddong[];
    showDdong():void;
    appendNewDdong():void;
    ddongCreateTimer:number | null;
    stop(fn:(id:number)=>void):void;
}

export default class ControllerImpl implements Controller{

    ddongCreateTimer: number;
    ddongGenerator: () => Ddong[];
    ddongs: Ddong[];
    context: CanvasRenderingContext2D;

    constructor(ddongGenerator:()=>Ddong[], context:CanvasRenderingContext2D){
        this.ddongGenerator = ddongGenerator;
        this.context = context;
        this.ddongs = ddongGenerator();
        this.ddongCreateTimer = null;
    }   

    stop(fn:(id:number)=>void): void {
       if(this.ddongCreateTimer) fn(this.ddongCreateTimer);
    }

    showDdong(): void {
        requestAnimationFrame(()=>{
        this.draw();
        this.showDdong()
        });
        
    }

    appendNewDdong(): void {
        const id =  window.setInterval(()=>{
            this.ddongs = [...this.ddongs, ...this.ddongGenerator()];
        },1000)


        this.ddongCreateTimer  = id;
    }



    private draw() {
        this.context.clearRect(0, 0, 1000, 1000);
        this.ddongs
            .forEach(ddong => this.context.fillRect(ddong.currentX, ddong.currentY, 10, 10));

        this.ddongs = this.ddongs
            .map(ddong => ({ ...ddong, currentY: ddong.currentY + 1 }))
            .filter(ddong => ddong.currentY < 1000);

    }
}