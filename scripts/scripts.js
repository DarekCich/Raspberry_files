let table ;
let configPanel;
let option;
let colors;
let login = "adam22ew3"
let haslo = "abcwqeewq"
//konfiguracja
let back1 = "#000000";
let back2 = "#003e93";
let font1 = "#E05E1F";
let font2 = "#ffffff";
let back12 = "#0a1e34";
//let back12 = "#1B1B32";
let back22 = "#003e93";
let font12 = "#E05E1F";
let font22 = "#ffffff";
let Responses;
let temp=0;
let numberOfStation="";
let cityName=""
let mode    ="";
let typeOfTransport =""
let listOfTrips = [];
let indexOfShowTrip;
function config(){
    // Get the root element
    colors      = document.querySelector ( ":root");
    table       = document.getElementById("myTable");
    configPanel = document.getElementById("configPanel");
    option      = document.getElementById("setOption");
    configPanel.style.zIndex    = "-1"
    option.style.zIndex         = "-1"
    colors.style.setProperty('--back-color', back12);
    colors.style.setProperty('--font-color', font1);
    document.getElementById("motyw").innerHTML            = "Retro Style"
    document.getElementById("rodzajTransportu").innerHTML = "Transport Miejski"
    //config przystanku
    // cityName        = "gdansk";
    typeOfTransport = "publicTransport"
    // numberOfStation = "20"
    //axios
    axios.defaults.baseURL = 'http://localhost:8080'
    //axios.defaults.baseURL = 'http://192.168.0.2:8080'
}
//interfejs użytkownika
function time(){
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
setInterval(time,10)

function moveBottom(){
    indexOfShowTrip++;
    loadOnViewTrips();
}
function moveTop(){
    indexOfShowTrip--;
    loadOnViewTrips();
}
function timeClick() {
    configPanel.style.zIndex==="-1" ? configPanel.style.zIndex="5" :  configPanel.style.zIndex="-1";
}
function changeColor(){
    console.log(colors.style.getPropertyValue('--back-color'))
    if(colors.style.getPropertyValue('--back-color')===back1){
        colors.style.setProperty('--back-color', back2);
        colors.style.setProperty('--font-color', font2);
        document.getElementById("motyw").innerHTML="New Style"
    }
    else {
        colors.style.setProperty('--back-color', back1);
        colors.style.setProperty('--font-color', font1);
        document.getElementById("motyw").innerHTML="Retro Style"
    }
}
//main
async function onstart(){
    config();
    await userSignIn(login, haslo)
    await setStartValue();
}
//logowanie
async function userSignIn(username, password) {
    await axios.post('api/auth/signin', {
        "username": username,
        "password": password,
    }).then(response => {

        axios.defaults.headers.common['Authorization'] = response.headers.authorization;
    }).catch(error => {
        console.log(error);
    });
}

//loaders

async function loadData(json) {
    listOfTrips.splice(0,listOfTrips.length)
    json.map((x) => {
        listOfTrips.push(x);
    })
    indexOfShowTrip = 0;
    await loadOnViewTrips()
}
function loadOnViewTrips(){
    if(listOfTrips.length===0)
        return
    if(indexOfShowTrip === listOfTrips.length)
        indexOfShowTrip = 0
    if(indexOfShowTrip === -1)
        indexOfShowTrip = listOfTrips.length -1
    for(let i =1 ; i<3 ; i++){
        let number = document.getElementById(`number${i}`)
        let direction = document.getElementById(`direction${i}`)
        let time = document.getElementById(`time${i}`)
        let temp = indexOfShowTrip;
        temp = temp + i - 1;
        if(temp === listOfTrips.length)
            temp=0
        let date = listOfTrips[temp].estimatedTime;
        switch (cityName){
            case "warszawa":
                part = date.split(":")
                break;
            case "gdansk":
                part = date.split("T")
                part = part[1].split("Z")
                part = part[0].split(":")
                part[0]  = parseInt(part[0])+2;
                break;
            }
        number.innerHTML= listOfTrips[temp].tripId;
        if(listOfTrips[temp].headsign.length>15)
            direction.innerHTML = `<MARQUEE>${listOfTrips[temp].headsign}</MARQUEE>`;
        else
            direction.innerHTML = listOfTrips[temp].headsign
        time.innerHTML = `${part[0]}:${part[1]}`

        }
}

async function loadStationOptions() {
    if(Responses.length===0){
        document.getElementById("Przystanek").innerHTML = "brak przystankow"
        return;
    }
    if(Responses.length===1){
        await setStationName(0);
        return;
    }
    if(temp===Responses.length){
        temp=0;
    }
    else if(temp<0){
        temp=Responses.length-1;
    }
    if(temp+2>=Responses.length){
        if(temp+1>=Responses.length){
            setOptionValuesStation("secondRow",0);
            setOptionValuesStation("thirdRow" ,1);
        }
        else {
            setOptionValuesStation("secondRow",temp+1);
            setOptionValuesStation("thirdRow" ,0);
        }
    }
    else{
        setOptionValuesStation("secondRow",temp+1);
        setOptionValuesStation("thirdRow" ,temp+2);
    }
    setOptionValuesStation("firstRow" ,temp);
}

function loadCityOptions(){
    if(Responses.length===0){
        document.getElementById("Miasto").innerHTML = "brak Miast"
        return;
    }
    if(Responses.length===1){
        setCityName(0)
        return;
    }
    if(temp===Responses.length){
        temp=0;
    }
    else if(temp<0){
        temp=Responses.length-1;
    }
    if(temp+2>=Responses.length){
        if(temp+1>=Responses.length){
            setOptionValues("secondRow",0);
            setOptionValues("thirdRow" ,1);
        }
        else {
            setOptionValues("secondRow",temp+1);
            setOptionValues("thirdRow" ,0);
        }
    }
    else{
        setOptionValues("secondRow",temp+1);
        setOptionValues("thirdRow" ,temp+2);
    }
    setOptionValues("firstRow" ,temp);
}

// gettery

async function getZtmInfo(url,number){
    document.getElementById("loading").style.zIndex="2"
    await axios.get(`api/ztm/${url}/info/${number}`).then(response => {
        switch (cityName){
            case "warszawa":
                loadData(response.data)
                return;
            case "gdansk":
                loadData(response.data.departures)
                return;
            default:
                return;
        }
    }).catch(() => {
    });
    document.getElementById("loading").style.zIndex="-1"
}
async function getResponse(path){
    await axios.get(path).then(response => {
        Responses = response.data;
    }).catch(error => {
        console.log(error);
    });
}

//changers

function changeTypeOfTransport(){
    if (document.getElementById("rodzajTransportu").innerHTML === "Kolej"){
        document.getElementById("rodzajTransportu").innerHTML = "Transport Miejski"
        typeOfTransport="publicTransport"
    }
    else{
        document.getElementById("rodzajTransportu").innerHTML = "Kolej"
        typeOfTransport="trains"
    }
}

async function changeTemp(number){
    temp += number;
    if(mode==='city'){
        await loadCityOptions();
        return;
    }
    if(mode === "station"){
        await loadStationOptions();
        return
    }
    option.style.zIndex="-1";
}

//setters

function setCityName(id){
    document.getElementById("Miasto").innerHTML = Responses[id]
    switch (Responses[id].toLowerCase()){
        case "warszawa":
            cityName="warszawa";
            return;
        case "gdańsk":
            cityName="gdansk";
            return;
        default:
            cityName=""
            return;
    }
}
async function setCity(){
    mode = "city"
    await getResponse(`api/displays/all/${typeOfTransport}`);
    await loadCityOptions();
    option.style.zIndex = "6";
}
async function setStartValue(){
    await getResponse(`api/displays/all/${typeOfTransport}`);
   // console.log(Responses)
    setCityName(0)
    await getResponse(`/api/ztm/${cityName}/displays`);
    setStationName(0)
    getZtmInfo(cityName, numberOfStation).then(() => {});

}
async function setStation() {
    mode="station"
    await getResponse(`/api/ztm/${cityName}/displays`);
    await loadStationOptions();
    option.style.zIndex = "6";
}

 function setStationName(id){
    SetStationNames(Responses[id].name)
    numberOfStation=Responses[id].displayCode;
    getZtmInfo(cityName, numberOfStation).then(() => {});
}

function setOptionValues(id, value){
    document.getElementById(id).innerHTML=Responses[value];
    document.getElementById(id ).setAttribute("value",`${value}`)
}

function setOptionValuesStation(id, value){
    document.getElementById(id).innerHTML=Responses[value].name;
    document.getElementById(id ).setAttribute("value",`${value}`)
}

async function setOption(id){
    if(mode==='city'){
        setCityName(parseInt(document.getElementById(id).getAttribute("value")))
    }
    else if(mode ==="station"){
        await setStationName(document.getElementById(id).getAttribute("value"))
    }
    option.style.zIndex="-1";
}
function SetStationNames(name){
    if(name.length>9){
        document.getElementById("StationName").innerHTML = `<MARQUEE>${name}</MARQUEE>`;
    }
    else{
        document.getElementById("StationName").innerHTML = name;
    }
    document.getElementById("Przystanek").innerHTML = name;

}

