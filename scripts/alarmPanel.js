function setTime(id, val){
    let time = document.getElementById(id)
    if(!time.value)
        time.value = 0;
    time.value = parseInt(time.value) + val;
    if(id[0]==='h')
        time.value = Math.min(Math.max(parseInt(time.value || 0), 0), 23)
    else
        time.value = Math.min(Math.max(parseInt(time.value || 0), 0), 59)
}
function getTimes(){
    let tab = [];
    for(let i = 1 ; i<=3; i++){
        let x = {
            hour: document.getElementById(`hour${i}`).value,
            minute: document.getElementById(`minutes${i}`).value,
            on: document.getElementById(`minutes${i}`).value
        }
        tab.push(x)
    }
    return tab;
}
function changeStat(id){
    let x = document.getElementById(id)
    if (x.innerHTML === "on")
        x.innerHTML = "off"
    else
        x.innerHTML = "on"
}
