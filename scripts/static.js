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
    fetch('../alarms.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(alarm => {
                    ifAlarm(alarm);
                });
            } else {
                console.error('Błąd: "alarms.json" nie jest tablicą JSON.');
            }
        })
        .catch(error => {
            console.error('Błąd odczytu pliku alarms.json:', error);
        });
    setInterval(() => {
        fetch('../alarms.json')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    data.forEach(alarm => {
                        ifAlarm(alarm);
                    });
                } else {
                    console.error('Błąd: "alarms.json" nie jest tablicą JSON.');
                }
            })
            .catch(error => {
                console.error('Błąd odczytu pliku alarms.json:', error);
            });


    }, 60000); // Co 60 000 milisekund (1 minuta)
}
function ifAlarm(alarm){
    if(alarm.on){
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if(currentHour === parseInt(alarm.hour))
            if (currentMinute === parseInt(alarm.minute))
                showAlarm()
    }
}
function showAlarm(){
    console.log("git")
    let x =document.getElementById("alarm")
    x.style.zIndex="7"
    x.style.background="red"
    setTimeout(() => {
        x.style.background = "yellow"
    }, 500)
    setTimeout(()=>{
        x.style.background = "blue"
    },1000)
    setTimeout(() => {
        x.style.background = "red"
    }, 1500)
    setTimeout(() => {
        x.style.background = "yellow"
    }, 2000)
    setTimeout(() => {
        x.style.background = "blue"
    }, 2500)
    setTimeout(()=>{
        x.style.zIndex="-1"
    },3000)

}
alarmOn();