let calculate = ()=> {
    let num1 = +document.querySelector("#num1").value
    let num2 = +document.querySelector("#num2").value
    let resultEl = document.querySelector("#result")
    let operator = document.getElementById("operator").value;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        result = "Invalid operator";
    }
    document.getElementById("result").innerHTML = `The result of ${num1} ${operator} ${num2} is ${result}.`;
}