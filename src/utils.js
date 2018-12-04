/* Utility to show content into the view */
export const displayLog = (content)=> {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = document.getElementById("log-container");
    logContainer.appendChild(element);
}