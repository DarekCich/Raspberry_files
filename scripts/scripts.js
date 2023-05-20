let table ;
let option;
let colors;
let login = "adam22ew3"
let haslo = "abcwqeewq"
//konfiguracja

const colorSets = [];
let indexOfSelectedTheme= -1;
let indexOfShowedOption =  0;
let indexOfShowTrip     =  0;
let Responses;
let numberOfStation= "";
let cityName= ""
let mode    = "";
let typeOfTransport = ""
let listOfTrips = [];
let auto= true;
// on Start
async function onstart(){
    config();
    loadColors();
    await userSignIn(login, haslo)
    await setStartValue();
    auto= true
}
function config(){
    // Get the root element
    colors  = document.querySelector ( ":root");
    table   = document.getElementById( "myTable");
    option  = document.getElementById( "setOption");
    option.style.zIndex         = "-1"
    document.getElementById("typeOfTransport").innerHTML = "Transport Miejski"
    axios.defaults.baseURL = 'http://localhost:8080'
    //axios.defaults.baseURL = 'http://192.168.0.2:8080'
}
function loadColors(){
    colorSets.push(new SetColor("#000000","#E05E1F","Retro Style"))
    colorSets.push(new SetColor("#003e93","#f5f6f7","New Style"))
    colorSets.push(new SetColor("#0a0a23","#f5f6f7","Wiktor Style"))
    changeColor();
}
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
async function setStartValue(){
    typeOfTransport = "publicTransport"
    await getResponse(`api/displays/all/${typeOfTransport}`);
    setCityName(1)
    await getResponse(`/api/ztm/${cityName}/displays`);
    setStationName(0)
    await getZtmInfo(cityName, numberOfStation);
}
//interfejs użytkownika

function moveArrivals(iter){
    indexOfShowTrip+=iter;
    loadOnViewTrips();
}

function changeColor(){
    auto=false;
    indexOfSelectedTheme++;
    if(indexOfSelectedTheme===colorSets.length){
        indexOfSelectedTheme=0;
    }
    colors.style.setProperty('--back-color', colorSets[indexOfSelectedTheme].backColor);
    colors.style.setProperty('--font-color', colorSets[indexOfSelectedTheme].fontColor);
    document.getElementById("styleOfTheme").innerHTML = colorSets[indexOfSelectedTheme].nameOfStyle;
}
//loaders
async function loadData(ListOfTrips) {
    listOfTrips.splice(0,listOfTrips.length)
    let estimatedTime = [];
    ListOfTrips.map((trip) => {
       // console.log( trip)
        let date = trip.estimatedTime;
        if(typeOfTransport !== "trains")
            switch (cityName){
                case "warszawa":
                    estimatedTime = date.split(":")
                    break;
                case "gdansk":
                    estimatedTime = date.split("T")
                    estimatedTime = estimatedTime[1].split("Z")
                    estimatedTime = estimatedTime[0].split(":")
                    estimatedTime[0]  = parseInt(estimatedTime[0])+2;
                    break;
            }
        else{
            estimatedTime = date.split(":")
        }
        trip.estimatedTime = `${estimatedTime[0]}:${estimatedTime[1]}`
        listOfTrips.push(trip);
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
        let number        = document.getElementById(`number${i}`)
        let direction     = document.getElementById(`direction${i}`)
        let time          = document.getElementById(`time${i}`)
        let tempIndexOfShowTrip= indexOfShowTrip + i - 1;
        if(tempIndexOfShowTrip === listOfTrips.length)
            tempIndexOfShowTrip=0
        number.innerHTML= listOfTrips[tempIndexOfShowTrip].tripId;
        if(listOfTrips[tempIndexOfShowTrip].headsign.length>15)
            direction.innerHTML = `<MARQUEE>${listOfTrips[tempIndexOfShowTrip].headsign}</MARQUEE>`;
        else
            direction.innerHTML = listOfTrips[tempIndexOfShowTrip].headsign
        time.innerHTML = listOfTrips[tempIndexOfShowTrip].estimatedTime
        }
}

async function loadStationOptions() {
    if(Responses.length===0){
        document.getElementById("StationName").innerHTML = "brak przystankow"
        return;
    }
    if(Responses.length===1){
        await setStationName(0);
        return;
    }
    if(indexOfShowedOption===Responses.length){
        indexOfShowedOption=0;
    }
    else if(indexOfShowedOption<0){
        indexOfShowedOption=Responses.length-1;
    }
    if(indexOfShowedOption+2>=Responses.length){
        if(indexOfShowedOption+1>=Responses.length){
            setOptionValuesStation("secondRow",0);
            setOptionValuesStation("thirdRow" ,1);
        }
        else {
            setOptionValuesStation("secondRow",indexOfShowedOption+1);
            setOptionValuesStation("thirdRow" ,0);
        }
    }
    else{
        setOptionValuesStation("secondRow",indexOfShowedOption+1);
        setOptionValuesStation("thirdRow" ,indexOfShowedOption+2);
    }
    setOptionValuesStation("firstRow" ,indexOfShowedOption);
}

function loadCityOptions(){
    if(Responses.length===0){
        document.getElementById("cityName").innerHTML = "brak Miast"
        return;
    }
    if(Responses.length===1){
        setCityName(0)
        return;
    }
    if(indexOfShowedOption===Responses.length){
        indexOfShowedOption=0;
    }
    else if(indexOfShowedOption<0){
        indexOfShowedOption=Responses.length-1;
    }
    if(indexOfShowedOption+2>=Responses.length){
        if(indexOfShowedOption+1>=Responses.length){
            setOptionValues("secondRow",0);
            setOptionValues("thirdRow" ,1);
        }
        else {
            setOptionValues("secondRow",indexOfShowedOption+1);
            setOptionValues("thirdRow" ,0);
        }
    }
    else{
        setOptionValues("secondRow",indexOfShowedOption+1);
        setOptionValues("thirdRow" ,indexOfShowedOption+2);
    }
    setOptionValues("firstRow" ,indexOfShowedOption);
}
// getters
async function getZtmInfo(url,number){
    //console.log(`api/ztm/${url}/info/${number}`)
    let x = false
    document.getElementById("loading").style.zIndex="2"
    await axios.get(`api/ztm/${url}/info/${number}`).then(response => {
        //console.log(response.data);
        try {
            //console.log(response.data.departures )
            if(response.data.departures !== undefined)
                loadData(response.data.departures);
        } catch (e) {
            console.log(response)
        }

    }).catch(() => {
    });
    document.getElementById("loading").style.zIndex="-1"
}
async function getPkpInfo(number){
    //console.log(`api/ztm/${url}/info/${number}`)
    let x = false
    document.getElementById("loading").style.zIndex="2"
    await axios.get(`api/pkp/stops/${number}`).then(response => {
        try {
            if(response.data.departures !== undefined)
                loadData(response.data.departures);
        } catch (e) {
            console.log(response)
        }
    }).catch(() => {
    });
    document.getElementById("loading").style.zIndex="-1"
}
async function getResponse(path){
    await axios.get(path).then(response => {
        Responses = response.data;
        Responses = response.data.sort( ( a, b ) =>{
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
    }).catch(error => {
        console.log(error);
    });
}
//changers
function changeTypeOfTransport(){
    auto=false;
    if (document.getElementById("typeOfTransport").innerHTML === "Kolej"){
        document.getElementById("typeOfTransport").innerHTML = "Transport Miejski"
        typeOfTransport="publicTransport"
        document.getElementById("cityDiv").style.display="flex"
        document.getElementById("cityLine").style.display="flex"
    }
    else{
        document.getElementById("typeOfTransport").innerHTML = "Kolej"
        document.getElementById("typeOfTransport").innerHTML
        typeOfTransport="trains"
        document.getElementById("cityDiv").style.display="none"
        document.getElementById("cityLine").style.display="none"

    }
}

async function changeTemp(number){
    indexOfShowedOption += number;
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
    document.getElementById("cityName").innerHTML = Responses[id]
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
    auto=false;
    mode = "city"
    await getResponse(`api/displays/all/${typeOfTransport}`);
    await loadCityOptions();
    option.style.zIndex = "6";
}

async function setStation() {
    auto=false;
    mode="station"
    if(typeOfTransport==="trains"){
        await getResponse(`/api/pkp/stops`);
    }
    else{
        await getResponse(`/api/ztm/${cityName}/displays`);
    }
    await loadStationOptions();
    option.style.zIndex = "6";
}

 function setStationName(id){
    SetStationNames(Responses[id].name)
     mode="station"
     if(typeOfTransport==="trains"){
         numberOfStation=Responses[id].stop_id;
         getPkpInfo(numberOfStation).then(() => {});
     }
     else{
         numberOfStation=Responses[id].displayCode;
         getZtmInfo(cityName, numberOfStation).then(() => {});
     }
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
    if(name.length>15){
        document.getElementById("StationName").innerHTML            = `<MARQUEE>${name}</MARQUEE>`;
        document.getElementById("stationNameInOptions").innerHTML   =`<MARQUEE>${name}</MARQUEE>`
    }
    else{
        if(name.length>11)
            document.getElementById("StationName").innerHTML = `<MARQUEE>${name}</MARQUEE>`;
        else
            document.getElementById("StationName").innerHTML        = name;
        document.getElementById("stationNameInOptions").innerHTML   = name;
    }
}
function estimatedTime(){
   if(listOfTrips<5){
       getZtmInfo(cityName, numberOfStation).then(() => {});
       return;
   }
   let temp= 0 ;
   let date  =  new Date()
   while (true){
       let part = listOfTrips[temp].estimatedTime.split(":")
       if(part[1]>=date.getMinutes()){
           break;
       }
       listOfTrips.splice(0,1)
   }
   loadOnViewTrips()
}
setInterval(estimatedTime,30000)

class SetColor {
    constructor(back, font, name) {
        this.backColor = back;
        this.fontColor = font;
        this.nameOfStyle = name;
    }
}
var timeDown;
var timeUp;
function onDownTime(){
    timeDown = Date.now();
}
function onUpTime(){
    timeUp =  Date.now() - timeDown;
    if(timeUp >= 2000) auto=true
    else timeClick();
}

function timeClick() {
    document.getElementById("configPanel").style.zIndex==="5" ? document.getElementById("configPanel").style.zIndex="-1" :  document.getElementById("configPanel").style.zIndex="5";
}
async function autoConfig(){
    if(auto){
        try{
            await axios.get(`api/favorite/stop/getAll/by/user`).then(response => {
                Responses = response.data;
                Responses = response.data.sort( ( a, b ) =>{
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });
            }).catch(error => {
                console.log(error);
            });
            Responses.map(async (resp) => {
                if (resp.status) {
                    if (numberOfStation !== resp.stopIds[0]){
                        SetStationNames(resp.stopName);
                        document.getElementById("cityName").innerHTML = resp.cityName
                        cityName = resp.cityName;
                        numberOfStation = resp.stopIds[0]
                        try {
                            await getResponse(`api/displays/all/${typeOfTransport}`);
                            if (typeOfTransport === "trains") {
                                getPkpInfo(numberOfStation).then(() => {
                                });
                            } else {
                                getZtmInfo(cityName, numberOfStation).then(() => {
                                });
                            }
                        } catch {

                        }
                    }

                }
            })
        }catch{

        }

    }
}
setInterval(autoConfig,2000)