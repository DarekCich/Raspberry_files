let lastTime = 0;
let replaceable = true;
const option  = document.getElementById( "setOption");
let Responses=[];
let indexOfShowedOption = 0;
//emulate mouse press events via keyboard keypress
function loadData(data){
    Responses.slice(0,Responses.length)
    data.forEach((x)=>{
        if(x.ssid!==""){
            Responses.push(x)
        }
    })
}
function loadOption(){
    loadWifiOptions()
    option.style.zIndex = "6";
}
async function changeTemp(number){
    indexOfShowedOption += number;
    loadWifiOptions();
}
function setOption(id){
    console.log(document.getElementById(id).getAttribute("value"))
    document.getElementById("netButt").innerHTML=document.getElementById(id).getAttribute("value")
    option.style.zIndex = "-1";
    document.getElementById("ConnectButt").removeAttribute("disabled");
}
function setOptionValues(id, value){
    document.getElementById(id).innerHTML=Responses[value].ssid;
    document.getElementById(id ).setAttribute("value",`${Responses[value].ssid}`)
}
function loadWifiOptions(){
    if(Responses.length===0){
        document.getElementById("netButt").innerHTML = "brak Wifi"
        return;
    }
    if(Responses.length===1){
        console.log(document.getElementById("id").getAttribute("value"))
        document.getElementById("netButt").innerHTML=Responses[0].ssid
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




document.querySelector("html").addEventListener("keydown", ()=>{
    document.getElementById("data").innerHTML = ""
});
let passwordField = document.getElementById('passwordInput');
let timer;

passwordField.addEventListener('mousedown', () => {
    timer = setTimeout(() => {
        passwordField.type = 'text';
        setTimeout(() => {
            passwordField.type = 'password';
        }, 5000);
    }, 1000);
});

passwordField.addEventListener('mouseup', () => {
    clearTimeout(timer);
});


//to add or not to add
const buttons = document.querySelectorAll(".t9-button");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const thisTime = event.timeStamp;				//determine the event timestamp

        //determine whether to replace the last entered character or not
        replaceable = (thisTime - lastTime) <= 1000;

        //reset lastTime value
        lastTime = thisTime;

        document.getElementById("passwordInput").value = type(button.getAttribute("data-value"));
    });
});

//actual typing logic
function type(x) {
    document.getElementById("data").innerHTML = ""
    let text = document.getElementById("passwordInput").value;
    // console.log(replaceable);
    let length = text.length - 1;
    //console.log(text[length]);

    switch (x) {
        case "1":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "." :
                        text = text.slice(0, length) + ","
                        return text;

                    case ",":
                        text = text.slice(0, length) + "?";
                        return text;

                    case "?" :
                        text = text.slice(0, length) + "!";
                        return text;

                    case "!" :
                        text = text.slice(0, length) + "#"
                        return text;

                    case "#":
                        text = text.slice(0, length) + "$";
                        return text;

                    case "$":
                        text = text.slice(0, length) + "1";
                        return text;

                    default:
                        text = text + ".";
                        return text;
                }
            }

            else {
                text = text + ".";
                return text;
            }
        }

        case "2":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "a" :
                        text = text.slice(0, length) + "b"
                        return text;

                    case "b":
                        text = text.slice(0, length) + "c";
                        return text;

                    case "c" :
                        text = text.slice(0, length) + "A";
                        return text;

                    case "A" :
                        text = text.slice(0, length) + "B"
                        return text;

                    case "B":
                        text = text.slice(0, length) + "C";
                        return text;

                    case "C":
                        text = text.slice(0, length) + "2";
                        return text;

                    case "2":
                        text = text.slice(0, length) + "a";
                        return text;

                    default:
                        text = text + "a";
                        return text;

                }

            }

            else {
                text = text + "a";
                return text;
            }
        }

        case "3":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "d" :
                        text = text.slice(0, length) + "e"
                        return text;

                    case "e":
                        text = text.slice(0, length) + "f";
                        return text;

                    case "f" :
                        text = text.slice(0, length) + "D";
                        return text;

                    case "D" :
                        text = text.slice(0, length) + "E"
                        return text;

                    case "E":
                        text = text.slice(0, length) + "F";
                        return text;

                    case "F":
                        text = text.slice(0, length) + "3";
                        return text;

                    case "3":
                        text = text.slice(0, length) + "d";
                        return text;

                    default:
                        text = text + "d";
                        return text;

                }
            }

            else {
                text = text + "d";
                return text;
            }
        }

        case "4":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "g" :
                        text = text.slice(0, length) + "h"
                        return text;

                    case "h":
                        text = text.slice(0, length) + "i";
                        return text;

                    case "i" :
                        text = text.slice(0, length) + "G";
                        return text;

                    case "G" :
                        text = text.slice(0, length) + "H"
                        return text;

                    case "H":
                        text = text.slice(0, length) + "I";
                        return text;

                    case "I":
                        text = text.slice(0, length) + "4";
                        return text;

                    case "4":
                        text = text.slice(0, length) + "g";
                        return text;

                    default:
                        text = text + "g";
                        return text;
                }
            }

            else {
                text = text + "g";
                return text;
            }
        }

        case "5":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "j" :
                        text = text.slice(0, length) + "k"
                        return text;

                    case "k":
                        text = text.slice(0, length) + "l";
                        return text;

                    case "l" :
                        text = text.slice(0, length) + "J";
                        return text;

                    case "J" :
                        text = text.slice(0, length) + "K"
                        return text;

                    case "K":
                        text = text.slice(0, length) + "L";
                        return text;

                    case "L":
                        text = text.slice(0, length) + "5";
                        return text;

                    case "5":
                        text = text.slice(0, length) + "k";
                        return text;

                    default:
                        text = text + "j";
                        return text;

                }
            }

            else {
                text = text + "j";
                return text;
            }
        }

        case "6":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "m" :
                        text = text.slice(0, length) + "n"
                        return text;

                    case "n":
                        text = text.slice(0, length) + "o";
                        return text;

                    case "o" :
                        text = text.slice(0, length) + "M";
                        return text;

                    case "M" :
                        text = text.slice(0, length) + "N"
                        return text;

                    case "N":
                        text = text.slice(0, length) + "O";
                        return text;

                    case "O":
                        text = text.slice(0, length) + "6";
                        return text;

                    case "6":
                        text = text.slice(0, length) + "m";
                        return text;

                    default:
                        text = text + "m";
                        return text;

                }
            }

            else {
                text = text + "m";
                return text;
            }
        }

        case "7":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "p" :
                        text = text.slice(0, length) + "q"
                        return text;

                    case "q":
                        text = text.slice(0, length) + "r";
                        return text;

                    case "r" :
                        text = text.slice(0, length) + "s";
                        return text;

                    case "s" :
                        text = text.slice(0, length) + "P"
                        return text;

                    case "P":
                        text = text.slice(0, length) + "Q";
                        return text;

                    case "Q":
                        text = text.slice(0, length) + "R";
                        return text;

                    case "R":
                        text = text.slice(0, length) + "S";
                        return text;

                    case "S":
                        text = text.slice(0, length) + "7";
                        return text;

                    case "7":
                        text = text.slice(0, length) + "p";
                        return text;

                    default:
                        text = text + "p";
                        return text;

                }
            }

            else {
                text = text + "p";
                return text;
            }
        }

        case "8":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "t" :
                        text = text.slice(0, length) + "u"
                        return text;

                    case "u":
                        text = text.slice(0, length) + "v";
                        return text;

                    case "v" :
                        text = text.slice(0, length) + "T";
                        return text;

                    case "T" :
                        text = text.slice(0, length) + "U"
                        return text;

                    case "U":
                        text = text.slice(0, length) + "V";
                        return text;

                    case "V":
                        text = text.slice(0, length) + "8";
                        return text;

                    default:
                        text = text + "t";
                        return text;
                }
            }

            else {
                text = text + "t";
                return text;
            }
        }

        case "9":
        {
            if (replaceable === true) {
                switch (text[length]){
                    case "w" :
                        text = text.slice(0, length) + "x"
                        return text;

                    case "x":
                        text = text.slice(0, length) + "y";
                        return text;

                    case "y" :
                        text = text.slice(0, length) + "z";
                        return text;

                    case "z" :
                        text = text.slice(0, length) + "W"
                        return text;

                    case "W":
                        text = text.slice(0, length) + "X";
                        return text;

                    case "X":
                        text = text.slice(0, length) + "Y";
                        return text;
                    case "Y" :
                        text = text.slice(0, length) + "Z"
                        return text;

                    case "Z":
                        text = text.slice(0, length) + "9";
                        return text;

                    default:
                        text = text + "W";
                        return text;
                }

            }

            else {
                text = text + "w";
                return text;
            }
        }

        case "0":
        {
            if (replaceable === true) {
                if (text[length] === " ") {
                    text = text.slice(0, length) + "0";
                    return text;
                }

                else if (text[length] === "0") {
                    text = text.slice(0, length) + " ";
                    return text;
                }

                else {
                    text = text + " ";
                    return text;
                }
            }

            else {
                text = text + " ";
                return text;
            }
        }

        case "#":
        {
            text = text.slice(0, length);
            return text;
        }

        case "*":
        {
            text = "";
            return text;
        }
    }
}