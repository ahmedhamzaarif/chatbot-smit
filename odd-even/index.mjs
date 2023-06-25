let check = ()=> {
    let num = +document.querySelector("#num1").value
    let resultEl = document.querySelector("#result")

    if(num % 2){
        result = "Odd"
    } else{
        result = "Even"
    }
    document.getElementById("result").innerHTML = `Your number is ${result}.`;
}