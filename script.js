// To do next time
// fix putting brackets on single digits
// 
// 
// 
// 
// 
// 
let toEvaluate = "";

function Evaluate() {

    infixToPostfix(toEvaluate);
}


function toScreen(a) {
    let calcScreen = document.querySelector(".calc-screen");

    calcScreen.value = calcScreen.value + a;

    if (a == "÷") {
        toEvaluate += "/";
    }
    else if (a == "x") {
        toEvaluate += "*";
    }
    else {
        toEvaluate += a;
    }

}

function clearScreen() {
    document.querySelector(".calc-screen").value = "";
    toEvaluate = "";
}



function infixToPostfix(s) {
    let result = [];
    let stack = [];
    let numberCounter = 0;
    let bigNumber = false;
    let temp;

    for (let i = 0; i < s.length; i++) {

        let c = s[i];

        if (c >= '0' && c <= '9' || c == ".") {
            if (numberCounter >= 1) {
                if (bigNumber) {
                    result.push(c);
                }
                else {
                    temp = result.pop();
                    result.push("{");
                    result.push(temp);
                    result.push(c);
                    bigNumber = true;
                }
            }
            else {
                result.push(c);
                numberCounter++;
            }
        }

        else if (c == '(') {
            stack.push('(')
            numberCounter = 0;
        }

        else if (c == ')') {
            while (stack[stack.length - 1] != '(') {
                result.push(stack.pop());
            }
            stack.pop();
            numberCounter = 0;
        }

        else {
            while (stack.length != 0 && precedence(c) <= precedence(stack[stack.length - 1])) {
                if (bigNumber){
                    bigNumber = false;
                    temp = "";
                    result.push("}");
                }
                result.push(stack.pop());
            }
            stack.push(c);
            numberCounter = 0;
            if (bigNumber){
                bigNumber = false;
                temp = "";
                result.push("}");
            }
        }

    }

    if (bigNumber){
        result.push("}");
    }

    while (stack.length != 0) {
        result.push(stack.pop());
    }

    evaluatePostFix(result.join(""));
}

function precedence(c) {
    if (c == '/' || c == '*') {
        return 2;
    }
    else if (c == '+' || c == '-') {
        return 1;
    }
    else {
        return -1;
    }
}

function evaluatePostFix(s) {
    let result = "";
    let stack = [];
    let isA = true;
    let a = "";
    let b = "";
    let bigNumberCounter = 0;
    let flag = true;

    for (let i = 0; i < s.length; i++) {
        let c = s[i];

        if (c >= 0 && c <= 9 || c == ".") {
            stack.push(c);
        }

        else {

            if (c == "{") {
                let counter = 1;
                let bigNumber = "";
                for (let j = i + 1; j < s.length; j++) {
                    let temp = s[j];
                    if (temp >= 0 && temp <= 9 || temp == ".") {
                        bigNumber += temp;
                        counter++;
                    }
                    else {
                        j = s.length;
                    }
                }
                i += counter;
                bigNumberCounter++;

                if (isA) {
                    b = parseFloat(bigNumber);
                    isA = false;
                }
                else {
                    a = parseFloat(bigNumber);
                    isA = true;
                }

            }
            else {

                if (bigNumberCounter == 0){
                    a = parseFloat(stack.pop());
                    b = parseFloat(stack.pop());
                    flag = false;
                }
                else if (isA && !isNaN(parseFloat(stack[stack.length - 1])) && flag) {
                    b = parseFloat(stack.pop());
                    isA = false;
                }
                else if (!isNaN(parseFloat(stack[stack.length - 1])) && flag){
                    a = parseFloat(stack.pop());
                    isA = true;
                }
            }

            if (c == "+") {
                stack.push(b + a);
                bigNumberCounter = 0;
            }
            else if (c == "-") {
                stack.push(b - a);
                bigNumberCounter = 0;
            }
            else if (c == "/") {
                stack.push(b / a);
                bigNumberCounter = 0;
            }
            else if (c == "*") {
                stack.push(b * a);
                bigNumberCounter = 0;
            }
        }
    }

    result = stack.pop();

    result = Number((parseFloat(result)).toFixed(4)) + "";

    let index = 0;
    if (result[0] == "{"){
        for (let i = 0; i < result.length; i++){
            if (result[i] == "}"){
                index = i;
            }
        }
        result = result.substring(1, index);
    }

    document.querySelector(".calc-screen").value = result;
}

function isBigNumber(num){
    if ((num / 10) >= 1){
        return true;
    }
    return false;
}
