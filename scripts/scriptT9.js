var lastTime = 0;
var replaceable = true;

//emulate mouse press events via keyboard keypress
$("html").keydown(function (event) {
    var pressedKey = event.key;

    //determine the key pressed and emulate the mouse click event
    switch (pressedKey) {
        case "0": document.getElementById("t9-zero").click(); break;
        case "1": document.getElementById("t9-one").click(); break;
        case "2": document.getElementById("t9-two").click(); break;
        case "3": document.getElementById("t9-three").click(); break;
        case "4": document.getElementById("t9-four").click(); break;
        case "5": document.getElementById("t9-five").click(); break;
        case "6": document.getElementById("t9-six").click(); break;
        case "7": document.getElementById("t9-seven").click(); break;
        case "8": document.getElementById("t9-eight").click(); break;
        case "9": document.getElementById("t9-nine").click(); break;
        case "#": document.getElementById("t9-hash").click(); break;
        case "Backspace": document.getElementById("t9-hash").click(); break;
        case "*": document.getElementById("t9-ast").click(); break;
        case "Delete": document.getElementById("t9-ast").click(); break;
    }
})
$(document).ready(function() {
    $("#usernameInput, #passwordInput").click(function() {
        console.log("git")
    });
});

//to add or not to add
$(".t9-button").click(function () {
    // console.log(event.which);
    var thisTime = event.timeStamp;				//determine the event timestamp

    //determine whether to replace the last entered character or not
    if ((thisTime - lastTime) > 1000) {
        replaceable = false;
    }

    else {
        replaceable = true;
    }

    //reset lastTime value
    lastTime = thisTime;

    var newText = type($(this).attr("data-value"));
    $("#t9-field").val(newText);
})


//actual typing logic
function type(x) {
    var text = $("#t9-field").val();
    // console.log(replaceable);
    var length = text.length - 1;
    //console.log(text[length]);

    switch (x) {
        case "1":
        {
            if (replaceable == true) {
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
        };

        case "2":
        {
            if (replaceable == true) {
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
        };

        case "3":
        {
            if (replaceable == true) {
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
        };

        case "4":
        {
            if (replaceable == true) {
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
        };

        case "5":
        {
            if (replaceable == true) {
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
        };

        case "6":
        {
            if (replaceable == true) {
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
        };

        case "7":
        {
            if (replaceable == true) {
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
        };

        case "8":
        {
            if (replaceable == true) {
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
        };

        case "9":
        {
            if (replaceable == true) {
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
        };

        case "0":
        {
            if (replaceable == true) {
                if (text[length] == " ") {
                    text = text.slice(0, length) + "0";
                    return text;
                }

                else if (text[length] == "0") {
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
