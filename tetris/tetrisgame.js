let canvas;
let ctx;
let gBAHeight = 20;
let gBAWidth = 12;
let startX = 4;
let startY = 0;
let coordArray = [...Array(gBAHeight)].map(e => Array(gBAWidth).fill(0));
let curTetramino = [[1,0],[0,1],[1,1],[2,1]];
let tetraminos = [];
let tColors= ['purple','cyan','orange','red','green','blue','yellow']
let curTColor;
let gBArray = [...Array(gBAHeight)].map(e=> Array(gBAWidth).fill(0));
let DIRECTION = {
    IDLE:0,
    DOWN:1,
    LEFT:2,
    RiGHT:3
};
let direction;

class Coordinates{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

document.addEventListener('DOMContentLoaded',SetupCanvas);

//Koordinaten Array
function CreateCArray(){
    let i = 0, j=0;
    for(let y=9;y<=446;y+=23){
        for(let x=11;x<=264;x+=23){
            coordArray[i][j] = new Coordinates(x,y);
            i++;
        }
        j++;
        i=0;
    }
}

function SetupCanvas(){
    canvas = document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    
    canvas.width = 936;
    canvas.height = 956;
    ctx.scale(2,2);

    ctx.fillStyle='white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.strokeStyle = 'black';
    ctx.strokeRect(8,8,280,462);

    document.addEventListener('keydown',keypress);
    CreateTetraminos();
    CreateTetramino();

    CreateCArray();
    DrawTM();
}

function DrawTM(){
    for(let i=0; i < curTetramino.length;i++){
        let x = curTetramino[i][0] + startX;
        let y = curTetramino[i][1] + startY;
        gBArray[x][y]=1;
        let coorX = coordArray[x][y].x;
        let coory = coordArray[x][y].y;
        ctx.fillStyle = curTColor;
        ctx.fillRect(coorX,coory,21,21);
    }
}

function keypress(key){
    if(key.keyCode===65){
        direction = DIRECTION.LEFT;
        DeleteT();
        startX--;
        DrawTM();
    }else if(key.keyCode===68){
        direction=DIRECTION.RiGHT;
        DeleteT();
        startX++;
        DrawTM();
    }else if(key.keyCode===83){
        direction=DIRECTION.DOWN;
        DeleteT();
        startY++;
        DrawTM();
    }
}

function DeleteT(){
    for(let i=0;i<curTetramino.length;i++){
        let x = curTetramino[i][0] +startX;
        let y = curTetramino[i][1] +startY;
        gBArray[x][y]=0;
        let coorX=coordArray[x][y].x;
        let coory=coordArray[x][y].y;
        ctx.fillStyle='white';
        ctx.fillRect(coorX,coory,21,21);
    }
}

function CreateTetraminos(){
    //push T
    tetraminos.push([[1,0],[0,1],[1,1],[2,1]]);
    //push I
    tetraminos.push([[0,0],[1,0],[2,0],[3,0]]);
    //push J
    tetraminos.push([[0,0],[0,1],[1,1],[2,1]]);
    //push Viereck
    tetraminos.push([[0,0],[1,0],[0,1],[1,1]]);
    //push L
    tetraminos.push([[2,0],[0,1],[1,1],[2,1]]);
    //push S
    tetraminos.push([[1,0],[2,0],[0,1],[1,1]]);
    //push Z
    tetraminos.push([[0,0],[1,0],[1,1],[2,1]]);
}

function CreateTetramino(){
    let rndT = Math.floor(Math.random()*tetraminos.length);
    curTetramino=tetraminos[rndT];
    curTColor=tColors[rndT];
}

function wallCollision(){
    for(let i = 0; i< curTetramino.length;i++){
        let newX = curTetramino[i][0] +startX;
        if(newX <=0 && direction===DIRECTION.LEFT){
            return true;
        }else if(newX>=11&&direction===DIRECTION.RiGHT){
            return true;
        }
    }
    return false;
}