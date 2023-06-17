function setTime(id, val){
    let time = document.getElementById(id)
    if(!time.value)
        time.value = 0;
    time.value = parseInt(time.value) + val;
    if(id[0]==='h'){
        if(parseInt(time.value)>23)
            time.value=0
        else if (parseInt(time.value)<0)
            time.value=23
    }
    else{
        if(parseInt(time.value)>59)
            time.value=0
        else if (parseInt(time.value)<0)
            time.value=59
    }
}
function getTimes(){
    let tab = [];
    for(let i = 1 ; i<=3; i++){
        let t = true
        if (document.getElementById(`but${i}`).innerHTML==='off')
            t = false
        let x = {
            hour: document.getElementById(`hour${i}`).value,
            minute: document.getElementById(`minutes${i}`).value,
            on: t
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
