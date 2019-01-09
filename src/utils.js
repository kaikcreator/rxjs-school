import { withLatestFrom } from "rxjs/operators";

/* Utility to show content into the view */
export const displayLog = (content)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container");
    logContainer.appendChild(element);
}

export const updateDisplay = (content)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container");
    while(logContainer.firstChild){
        logContainer.removeChild(logContainer.firstChild);
    }
    logContainer.appendChild(element);
}