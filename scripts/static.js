function clock(){
    let date   =  new Date()
    let hours = String(date.getHours());
    if(hours.length === 1){
        hours = "0" + hours;
    }
    let minutes =  String(date.getMinutes());
    if(minutes.length === 1){
        minutes = "0" + minutes;
    }
    let seconds = String(date.getSeconds());
    if(seconds.length === 1){
        seconds = "0" + seconds;
    }
    document.getElementById('Time').innerHTML=`${hours}:${minutes}:${seconds}`
}
setInterval(clock,500)
