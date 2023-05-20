let table ;
let option;
let colors;
let login = "adam22ew3"
let haslo = "abcwqeewq"
//konfiguracja
let timeDown;
let timeUp;
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
    typeOfTransport = "publicTransport"
    //await setStartValue();
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
    colorSets.push(new SetColor("#070606","#ff6701","#3f3f3f","#ffffff","retro"))
    colorSets.push(new SetColor("#3b4bfd","#ffffff","#3b4bfd","#ffffff","basic"))
    colorSets.push(new SetColor("#000000","#6ef500","#000000","#ffffff","contrast"))
    colorSets.push(new SetColor("#242424","#ebebeb","#4e4949","#242424","dracula"))
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
    colors.style.setProperty('--containercolor', colorSets[indexOfSelectedTheme].containercolor);
    colors.style.setProperty('--bordercolor', colorSets[indexOfSelectedTheme].bordercolor);
    document.getElementById("styleOfTheme").innerHTML = colorSets[indexOfSelectedTheme].nameOfStyle;
}
//loaders
async function loadData(ListOfTrips) {
    listOfTrips.splice(0,listOfTrips.length)
    if (ListOfTrips.length===0){
        listOfTrips.push({tripId: "",headsign:"brak odjazdów",estimatedTime:""});
    }
    else{
        let estimatedTime = [];
        ListOfTrips.map((trip) => {
            // console.log( trip)
            let date = trip.estimatedTime;
            if(typeOfTransport !== "trains")
                switch (cityName){
                    case "Warszawa":
                        estimatedTime = date.split(":")
                        break;
                    case "Gdańsk":
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
    }
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
        if(listOfTrips[tempIndexOfShowTrip].headsign.length>13)
            direction.innerHTML = `<MARQUEE>${listOfTrips[tempIndexOfShowTrip].headsign}</MARQUEE>`;
        else
            direction.innerHTML = listOfTrips[tempIndexOfShowTrip].headsign
        time.innerHTML = listOfTrips[tempIndexOfShowTrip].estimatedTime
        }
}

async function loadStationOptions() {
    //console.log(Responses)
    if(typeOfTransport === "publicTransport"){
        if(!Array.isArray(Responses)){
            Responses = Object.entries(Responses);
            Responses.sort((a,b)=>{
                if ( a[0] < b[0] ){
                    return -1;
                }
                if ( a[0] > b[0] ){
                    return 1;
                }
                return 0;
            },)
        }

    }

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
    document.getElementById("loading").style.zIndex="2"
    url = url.toLowerCase();
    if(url==="gdańsk")
        url="gdansk"
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
        cityName=  cityName.charAt(0).toUpperCase() + cityName.slice(1);
        await getResponse(`/api/ztm/displays/${cityName}`);
    }
    await loadStationOptions();
    option.style.zIndex = "6";
}

 function setStationName(id){

     mode="station"
     if(typeOfTransport==="trains"){
         SetStationNames(Responses[id].name)
         numberOfStation=Responses[id].stop_id;
         getPkpInfo(numberOfStation).then(() => {});
     }
     else{
         SetStationNames(Responses[id][0])
         //console.log(Responses[id][1][0])
         numberOfStation=Responses[id][1][0];
         getZtmInfo(cityName, numberOfStation).then(() => {});
     }
}

function setOptionValues(id, value){
    document.getElementById(id).innerHTML=Responses[value];
    document.getElementById(id ).setAttribute("value",`${value}`)
}

function setOptionValuesStation(id, value){
    if(typeOfTransport==="publicTransport")
        document.getElementById(id).innerHTML=Responses[value][0];
    else{
        document.getElementById(id).innerHTML=Responses[value].name;
    }
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
        if(name.length>9)
            document.getElementById("StationName").innerHTML = `<MARQUEE>${name}</MARQUEE>`;
        else
            document.getElementById("StationName").innerHTML        = name;
        document.getElementById("stationNameInOptions").innerHTML   = name;
    }
}
function estimatedTime(){
    let temp = false
   if(listOfTrips.length<5){
       getZtmInfo(cityName, numberOfStation).then(() => {});
       return;
   }
   let date  =  new Date()
   while (true){
       let part = listOfTrips[0].estimatedTime.split(":")
       if(part[1]>=date.getMinutes()){
           break;
       }
       listOfTrips.splice(0,1)
       temp=true
   }
   if(temp)
        loadOnViewTrips()
}
setInterval(estimatedTime,30000)

class SetColor {
    constructor(back, font,container,border ,name) {
        this.backColor = back;
        this.fontColor = font;
        this.containercolor = container;
        this.bordercolor = border;
        this.nameOfStyle = name;
    }
}

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
        //favorite station
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
        try{
            await axios.get(`/api/user/all/get/app/style`).then(response => {
                Responses = response.data;
            }).catch(error => {
                console.log(error);
            });
            if(colors.nameOfStyle !== Responses.appStyle.toString()){
                colorSets.map((color)=>{
                    if(color.nameOfStyle === Responses.appStyle.toString()){
                        colors.style.setProperty('--back-color', color.backColor );
                        colors.style.setProperty('--font-color', color.fontColor );
                        colors.style.setProperty('--containercolor', color.containercolor);
                        colors.style.setProperty('--bordercolor', color.bordercolor);
                        document.getElementById("styleOfTheme").innerHTML = color.nameOfStyle ;
                    }
                })
            }
        }catch{

        }

    }
}
setInterval(autoConfig,2000)