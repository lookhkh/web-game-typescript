import Ddong from "../obj/ddong";
import ControllerImpl from "./controller";

const Controller = require("./controller");

describe("controller",()=>{

    let controller : ControllerImpl ;
    let generator:()=>Ddong[] = ()=>[{currentX:100, currentY:0},{currentX:10, currentY:0}]
    
    beforeEach(()=>{
        controller = new ControllerImpl(generator, context)
    })
    
    it("type",()=>{
        expect(1).toBe(1);
    })
})