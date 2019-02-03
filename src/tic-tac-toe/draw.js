
//get canvas, export it and also export main sizes
export const canvas = document.getElementById('drawboard');
export const BOARD_SIZE = canvas.width;
export const CELL_SIZE = canvas.width / 3;
const ctx = canvas.getContext('2d');

//preload images from base64 encoded images
let circleImg = new Image();
let crossImg = new Image();
//Circle Shape Outline icon made by Dave Gandy from www.flaticon.com,  licensed by CC 3.0 BY
circleImg.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4IiB2aWV3Qm94PSIwIDAgNDM4LjUzMyA0MzguNTMzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzguNTMzIDQzOC41MzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDA5LjEzMywxMDkuMjAzYy0xOS42MDgtMzMuNTkyLTQ2LjIwNS02MC4xODktNzkuNzk4LTc5Ljc5NkMyOTUuNzM2LDkuODAxLDI1OS4wNTgsMCwyMTkuMjczLDAgICBjLTM5Ljc4MSwwLTc2LjQ3LDkuODAxLTExMC4wNjMsMjkuNDA3Yy0zMy41OTUsMTkuNjA0LTYwLjE5Miw0Ni4yMDEtNzkuOCw3OS43OTZDOS44MDEsMTQyLjgsMCwxNzkuNDg5LDAsMjE5LjI2NyAgIGMwLDM5Ljc4LDkuODA0LDc2LjQ2MywyOS40MDcsMTEwLjA2MmMxOS42MDcsMzMuNTkyLDQ2LjIwNCw2MC4xODksNzkuNzk5LDc5Ljc5OGMzMy41OTcsMTkuNjA1LDcwLjI4MywyOS40MDcsMTEwLjA2MywyOS40MDcgICBzNzYuNDctOS44MDIsMTEwLjA2NS0yOS40MDdjMzMuNTkzLTE5LjYwMiw2MC4xODktNDYuMjA2LDc5Ljc5NS03OS43OThjMTkuNjAzLTMzLjU5NiwyOS40MDMtNzAuMjg0LDI5LjQwMy0xMTAuMDYyICAgQzQzOC41MzMsMTc5LjQ4NSw0MjguNzMyLDE0Mi43OTUsNDA5LjEzMywxMDkuMjAzeiBNMzUzLjc0MiwyOTcuMjA4Yy0xMy44OTQsMjMuNzkxLTMyLjczNiw0Mi42MzMtNTYuNTI3LDU2LjUzNCAgIGMtMjMuNzkxLDEzLjg5NC00OS43NzEsMjAuODM0LTc3Ljk0NSwyMC44MzRjLTI4LjE2NywwLTU0LjE0OS02Ljk0LTc3Ljk0My0yMC44MzRjLTIzLjc5MS0xMy45MDEtNDIuNjMzLTMyLjc0My01Ni41MjctNTYuNTM0ICAgYy0xMy44OTctMjMuNzkxLTIwLjg0My00OS43NzItMjAuODQzLTc3Ljk0MWMwLTI4LjE3MSw2Ljk0OS01NC4xNTIsMjAuODQzLTc3Ljk0M2MxMy44OTEtMjMuNzkxLDMyLjczOC00Mi42MzcsNTYuNTI3LTU2LjUzICAgYzIzLjc5MS0xMy44OTUsNDkuNzcyLTIwLjg0LDc3Ljk0My0yMC44NGMyOC4xNzMsMCw1NC4xNTQsNi45NDUsNzcuOTQ1LDIwLjg0YzIzLjc5MSwxMy44OTQsNDIuNjM0LDMyLjczOSw1Ni41MjcsNTYuNTMgICBjMTMuODk1LDIzLjc5MSwyMC44MzgsNDkuNzcyLDIwLjgzOCw3Ny45NDNDMzc0LjU4LDI0Ny40MzYsMzY3LjYzNywyNzMuNDE3LDM1My43NDIsMjk3LjIwOHoiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K';
//Cancel Icon made by Eleonor Wang from www.flaticon.com,  licensed by CC 3.0 BY
crossImg.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIxLjkgMjEuOSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjEuOSAyMS45IiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgogIDxwYXRoIGQ9Ik0xNC4xLDExLjNjLTAuMi0wLjItMC4yLTAuNSwwLTAuN2w3LjUtNy41YzAuMi0wLjIsMC4zLTAuNSwwLjMtMC43cy0wLjEtMC41LTAuMy0wLjdsLTEuNC0xLjRDMjAsMC4xLDE5LjcsMCwxOS41LDAgIGMtMC4zLDAtMC41LDAuMS0wLjcsMC4zbC03LjUsNy41Yy0wLjIsMC4yLTAuNSwwLjItMC43LDBMMy4xLDAuM0MyLjksMC4xLDIuNiwwLDIuNCwwUzEuOSwwLjEsMS43LDAuM0wwLjMsMS43QzAuMSwxLjksMCwyLjIsMCwyLjQgIHMwLjEsMC41LDAuMywwLjdsNy41LDcuNWMwLjIsMC4yLDAuMiwwLjUsMCwwLjdsLTcuNSw3LjVDMC4xLDE5LDAsMTkuMywwLDE5LjVzMC4xLDAuNSwwLjMsMC43bDEuNCwxLjRjMC4yLDAuMiwwLjUsMC4zLDAuNywwLjMgIHMwLjUtMC4xLDAuNy0wLjNsNy41LTcuNWMwLjItMC4yLDAuNS0wLjIsMC43LDBsNy41LDcuNWMwLjIsMC4yLDAuNSwwLjMsMC43LDAuM3MwLjUtMC4xLDAuNy0wLjNsMS40LTEuNGMwLjItMC4yLDAuMy0wLjUsMC4zLTAuNyAgcy0wLjEtMC41LTAuMy0wLjdMMTQuMSwxMS4zeiIgZmlsbD0iI0ZGREE0NCIvPgo8L3N2Zz4K';

//draw a line
const drawLine = (initCoords, endCoords) => {
    ctx.beginPath();
    ctx.moveTo(initCoords.x, initCoords.y);
    ctx.lineTo(endCoords.x, endCoords.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

//draw an image inside a cell
const drawImage = (img, x, y)=>{
    const margin = 10;
    ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight, 
        x+margin, y+margin, CELL_SIZE-2*margin, CELL_SIZE-2*margin);
}

//draws the player icon in a specific cell
const drawPlayerIconAtCell = (playerId, x, y) => {
    const data = playerId == 1 ? circleImg : crossImg;
    drawImage(data, x*CELL_SIZE, y*CELL_SIZE);
}

//draws empty board
export const drawBoard = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=1; i< 3; i++){
        drawLine( { x:i*CELL_SIZE, y:0 }, { x:i*CELL_SIZE, y:BOARD_SIZE } );
        drawLine( { x:0, y:i*CELL_SIZE }, { x:BOARD_SIZE, y:i*CELL_SIZE } );
    }
}

//draws game movements
export const drawGame = (gameState) =>{
    for(let x = 0; x<3; x++){
        for(let y = 0; y<3; y++){
            const cell = gameState.board[y][x];
            if(cell != 0){
                drawPlayerIconAtCell(cell, x, y);
            }
        }
    }
}