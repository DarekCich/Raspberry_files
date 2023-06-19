let czyNieByloAlarmu = true
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
function alarmOn() {
    let tabAlarms = [];
    fetch('../alarms.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(alarm => {
                    tabAlarms.push(alarm)
                });
            } else {
                console.error('Błąd: "alarms.json" nie jest tablicą JSON.');
            }
        })
        .catch(error => {
            console.error('Błąd odczytu pliku alarms.json:', error);
        });
    setInterval(() => {
        tabAlarms.forEach(alarm => {
            ifAlarm(alarm);
        })
    }, 1000); // Co 60 000 milisekund (1 minuta)
}
function ifAlarm(alarm){
    if(alarm.on){
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        if(currentHour === parseInt(alarm.hour)){
            if (currentMinute === parseInt(alarm.minute)){
                if(czyNieByloAlarmu){
                    czyNieByloAlarmu = !czyNieByloAlarmu
                    showAlarm()
                    setTimeout(()=>{czyNieByloAlarmu = !czyNieByloAlarmu},60000)
                }
            }
        }
    }
}
function showAlarm(){
    let x =document.getElementById("alarm")
    x.style.zIndex="7"
    x.classList.toggle('element')
}
function offAlarm(){
    let x =document.getElementById("alarm")
    x.style.zIndex='-1'
    x.classList.toggle('element')
}
alarmOn();