
//get canvas, export it and also export main sizes
export const canvas = document.getElementById('drawboard');
export const BOARD_SIZE = canvas.width;
export const CELL_SIZE = canvas.width / 3;
const ctx = canvas.getContext('2d');

//preload images from base64 encoded images
let circleImg = new Image();
let crossImg = new Image();
//Circle Shape Outline icon made by Dave Gandy from www.flaticon.com,  licensed by CC 3.0 BY
circleImg.src ='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MzguNTMzIiBoZWlnaHQ9IjQzOC41MzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzOC41MzMgNDM4LjUzMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxyZWN0IGlkPSJiYWNrZ3JvdW5kcmVjdCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgeD0iMCIgeT0iMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIi8+PGcgY2xhc3M9ImN1cnJlbnRMYXllciIgc3R5bGU9IiI+PHRpdGxlPkxheWVyIDE8L3RpdGxlPjxnIGlkPSJzdmdfMSIgY2xhc3M9InNlbGVjdGVkIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGw9IiM4YmMzNGEiPjxwYXRoIGQ9Ik00MDkuMTMzLDEwOS4yMDNjLTE5LjYwOC0zMy41OTItNDYuMjA1LTYwLjE4OS03OS43OTgtNzkuNzk2QzI5NS43MzYsOS44MDEsMjU5LjA1OCwwLDIxOS4yNzMsMCAgIGMtMzkuNzgxLDAtNzYuNDcsOS44MDEtMTEwLjA2MywyOS40MDdjLTMzLjU5NSwxOS42MDQtNjAuMTkyLDQ2LjIwMS03OS44LDc5Ljc5NkM5LjgwMSwxNDIuOCwwLDE3OS40ODksMCwyMTkuMjY3ICAgYzAsMzkuNzgsOS44MDQsNzYuNDYzLDI5LjQwNywxMTAuMDYyYzE5LjYwNywzMy41OTIsNDYuMjA0LDYwLjE4OSw3OS43OTksNzkuNzk4YzMzLjU5NywxOS42MDUsNzAuMjgzLDI5LjQwNywxMTAuMDYzLDI5LjQwNyAgIHM3Ni40Ny05LjgwMiwxMTAuMDY1LTI5LjQwN2MzMy41OTMtMTkuNjAyLDYwLjE4OS00Ni4yMDYsNzkuNzk1LTc5Ljc5OGMxOS42MDMtMzMuNTk2LDI5LjQwMy03MC4yODQsMjkuNDAzLTExMC4wNjIgICBDNDM4LjUzMywxNzkuNDg1LDQyOC43MzIsMTQyLjc5NSw0MDkuMTMzLDEwOS4yMDN6IE0zNTMuNzQyLDI5Ny4yMDhjLTEzLjg5NCwyMy43OTEtMzIuNzM2LDQyLjYzMy01Ni41MjcsNTYuNTM0ICAgYy0yMy43OTEsMTMuODk0LTQ5Ljc3MSwyMC44MzQtNzcuOTQ1LDIwLjgzNGMtMjguMTY3LDAtNTQuMTQ5LTYuOTQtNzcuOTQzLTIwLjgzNGMtMjMuNzkxLTEzLjkwMS00Mi42MzMtMzIuNzQzLTU2LjUyNy01Ni41MzQgICBjLTEzLjg5Ny0yMy43OTEtMjAuODQzLTQ5Ljc3Mi0yMC44NDMtNzcuOTQxYzAtMjguMTcxLDYuOTQ5LTU0LjE1MiwyMC44NDMtNzcuOTQzYzEzLjg5MS0yMy43OTEsMzIuNzM4LTQyLjYzNyw1Ni41MjctNTYuNTMgICBjMjMuNzkxLTEzLjg5NSw0OS43NzItMjAuODQsNzcuOTQzLTIwLjg0YzI4LjE3MywwLDU0LjE1NCw2Ljk0NSw3Ny45NDUsMjAuODRjMjMuNzkxLDEzLjg5NCw0Mi42MzQsMzIuNzM5LDU2LjUyNyw1Ni41MyAgIGMxMy44OTUsMjMuNzkxLDIwLjgzOCw0OS43NzIsMjAuODM4LDc3Ljk0M0MzNzQuNTgsMjQ3LjQzNiwzNjcuNjM3LDI3My40MTcsMzUzLjc0MiwyOTcuMjA4eiIgZmlsbD0iIzhiYzM0YSIgaWQ9InN2Z18yIi8+PC9nPjxnIGlkPSJzdmdfMyI+PC9nPjxnIGlkPSJzdmdfNCI+PC9nPjxnIGlkPSJzdmdfNSI+PC9nPjxnIGlkPSJzdmdfNiI+PC9nPjxnIGlkPSJzdmdfNyI+PC9nPjxnIGlkPSJzdmdfOCI+PC9nPjxnIGlkPSJzdmdfOSI+PC9nPjxnIGlkPSJzdmdfMTAiPjwvZz48ZyBpZD0ic3ZnXzExIj48L2c+PGcgaWQ9InN2Z18xMiI+PC9nPjxnIGlkPSJzdmdfMTMiPjwvZz48ZyBpZD0ic3ZnXzE0Ij48L2c+PGcgaWQ9InN2Z18xNSI+PC9nPjxnIGlkPSJzdmdfMTYiPjwvZz48ZyBpZD0ic3ZnXzE3Ij48L2c+PC9nPjwvc3ZnPg==';
//Cancel Icon made by Eleonor Wang from www.flaticon.com,  licensed by CC 3.0 BY
crossImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIxLjkgMjEuOSIgd2lkdGg9IjIxLjkiIGhlaWdodD0iMjEuOSI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz4gIDxnIGNsYXNzPSJjdXJyZW50TGF5ZXIiIHN0eWxlPSIiPjx0aXRsZT5MYXllciAxPC90aXRsZT48cGF0aCBkPSJNMTQuMSwxMS4zYy0wLjItMC4yLTAuMi0wLjUsMC0wLjdsNy41LTcuNWMwLjItMC4yLDAuMy0wLjUsMC4zLTAuN3MtMC4xLTAuNS0wLjMtMC43bC0xLjQtMS40QzIwLDAuMSwxOS43LDAsMTkuNSwwICBjLTAuMywwLTAuNSwwLjEtMC43LDAuM2wtNy41LDcuNWMtMC4yLDAuMi0wLjUsMC4yLTAuNywwTDMuMSwwLjNDMi45LDAuMSwyLjYsMCwyLjQsMFMxLjksMC4xLDEuNywwLjNMMC4zLDEuN0MwLjEsMS45LDAsMi4yLDAsMi40ICBzMC4xLDAuNSwwLjMsMC43bDcuNSw3LjVjMC4yLDAuMiwwLjIsMC41LDAsMC43bC03LjUsNy41QzAuMSwxOSwwLDE5LjMsMCwxOS41czAuMSwwLjUsMC4zLDAuN2wxLjQsMS40YzAuMiwwLjIsMC41LDAuMywwLjcsMC4zICBzMC41LTAuMSwwLjctMC4zbDcuNS03LjVjMC4yLTAuMiwwLjUtMC4yLDAuNywwbDcuNSw3LjVjMC4yLDAuMiwwLjUsMC4zLDAuNywwLjNzMC41LTAuMSwwLjctMC4zbDEuNC0xLjRjMC4yLTAuMiwwLjMtMC41LDAuMy0wLjcgIHMtMC4xLTAuNS0wLjMtMC43TDE0LjEsMTEuM3oiIGZpbGw9IiNiZGJkYmQiIGlkPSJzdmdfMSIgY2xhc3M9InNlbGVjdGVkIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9zdmc+'

//draw a line
const drawLine = (initCoords, endCoords) => {
    ctx.beginPath();
    ctx.moveTo(initCoords.x, initCoords.y);
    ctx.lineTo(endCoords.x, endCoords.y);
    ctx.strokeStyle = '#1976D2';
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.closePath();
}

//draw an image inside a cell
const drawImage = (img, x, y)=>{
    const margin = 20;
    ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight, 
        x+margin, y+margin, CELL_SIZE-2*margin, CELL_SIZE-2*margin);
}

//draws the player icon in a specific cell
const drawPlayerIconAtCell = (playerId, x, y) => {
    const data = playerId == 1 ? circleImg : crossImg;
    drawImage(data, x*CELL_SIZE, y*CELL_SIZE);
}

//clear canvas
const clearCanvas = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//draws canvas background
const drawBackground = () =>{
    //paint board background
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2196F3";
    ctx.fill();
}

//draws empty board
const drawBoard = () =>{
    clearCanvas();
    drawBackground();
    //paint board lines
    for(let i=1; i< 3; i++){
        drawLine( { x:i*CELL_SIZE, y:0 }, { x:i*CELL_SIZE, y:BOARD_SIZE } );
        drawLine( { x:0, y:i*CELL_SIZE }, { x:BOARD_SIZE, y:i*CELL_SIZE } );
    }
}

export const writeMessage = (message) => {
    ctx.globalAlpha = 0.8;
    drawBackground();
    ctx.textAlign = "center";
    ctx.fillStyle = "#1976D2";
    ctx.font = `${BOARD_SIZE/6}px Arial`;
    ctx.fillText(message, BOARD_SIZE/2, BOARD_SIZE/2); 
}

//draws game movements
export const drawGame = (gameState) =>{
    if(!gameState){
        return;
    }
    drawBoard();
    for(let x = 0; x<3; x++){
        for(let y = 0; y<3; y++){
            const cell = gameState.board[y][x];
            if(cell != 0){
                drawPlayerIconAtCell(cell, x, y);
            }
        }
    }
}