import { useState } from "react";
import useEventListener from "@use-it/event-listener";
//testando
var values = [];
var result2 = 0;
var operator = "";
var number = "";
var counter = 0;
var resultNumber = "0";
var resultValues = "0";
var resultDecPlaces = 0;
var calculation = "";

//Strings:
const operators = ["/", "*", "-", "+", "%"];
const period = ".";
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const enter = "Enter";
const deleteKey = "Delete";
const backSpace = "Backspace"
const equal = "=";


function App() {
  const [result, setResult] = useState(0);
  const [calc, setCalc] = useState("");

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      if (i === 2 || i === 5 || i === 8) {
        digits.push(<button className="digits_middle" onClick={() => updateCalc(i.toString())} key={i}>{i}</button>);
      } else {
        digits.push(<button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
        );
      }
    }
    return digits;
  };

  function quantidadeCasasDecimais(resultado, valor) {
    let casasResult = String(resultado);
    let casasValues = String(valor);

    if (casasResult.includes(".")) {
	  resultNumber  = casasResult.substring(casasResult.indexOf(".") + 1).length;
    }

    if (casasValues.includes(".")) {
      resultValues = casasValues.substring(casasValues.indexOf(".") + 1).length;
    }

    return parseInt(resultNumber) + parseInt(resultValues);
  }

  function updateCalc(value) {
    //se ainda não tiver valor inserido e o usuario tentar inserir um . ou um operador, o codigo da erro não faz nada.
    if (calculation === "" && (value === period || operators.includes(value))) {
      alert("Insira um valor valido!");
      return;
    } else {
      /*Se o ultimo caractere do calculo for um operado e o novo valor inserido não for um numero, 
		não pode inserir novamente um operador.*/
      if (operators.includes(calc.slice(-1)) && (operators.includes(value) || !numbers.includes(value)  )) {
        alert("Insira um valor valido!");
        return;
      }
      // Valida se o ponto já existe na formação do novo numero e não deixa adicionar outro ponto ou um operador.
      if ( number.slice(-1) === period) {
        if (!numbers.includes(value)) {
          alert("Insira um valor valido!");
          return;
        } 
      }

      calculation = calculation + value;
      setCalc(calc + value);

      if (operators.includes(value)) {
        console.log("entrou no if")
        values.push(value);
		    counter = counter + 2;
        number = "";
        return;
      }
      
      number = number + value;
      values[counter] = parseFloat(number);

      for (let i = 0; i < values.length; i++) {
        if (i === 0) {
          result2 = 0;
          result2 = values[i];
          setResult(result2);
        }

        if (operators.includes(values[i])) {
          operator = values[i];

        } else if (operator === "+") {
		      resultDecPlaces = quantidadeCasasDecimais(result2, values[i]);
          let novoResultado = result2 + values[i];
          let strNovoResultado = novoResultado.toFixed(resultDecPlaces);
          result2 = parseFloat(strNovoResultado);
          setResult(parseFloat(result2));
          operator = "";

        } else if (operator === "-") {
          //result2 = result2 - values[i];
          //setResult(parseFloat(result2.toFixed(2)));
          //operator = "";
          resultDecPlaces = quantidadeCasasDecimais(result2, values[i]);
          let novoResultado = result2 - values[i];
          let strNovoResultado = novoResultado.toFixed(resultDecPlaces);
          result2 = parseFloat(strNovoResultado);
          setResult(parseFloat(result2));
          operator = "";

        } else if (operator === "*") {
		  resultDecPlaces = quantidadeCasasDecimais(result2, values[i]);
          let novoResultado = result2 * values[i];
          let strNovoResultado = novoResultado.toFixed(resultDecPlaces);
          result2 = parseFloat(strNovoResultado);
          setResult(parseFloat(result2));
          operator = "";

        } else if (operator === "/") {
		  resultDecPlaces = quantidadeCasasDecimais(result2, values[i]);
          let novoResultado = result2 / values[i];
          let strNovoResultado = novoResultado.toFixed(resultDecPlaces);
          result2 = parseFloat(strNovoResultado);
          setResult(parseFloat(result2));
          operator = "";

        } else if (operator === "%") {
          result2 = (result2 / 100) * values[i];
          setResult(parseFloat(result2.toFixed(2)));
          operator = "";
          /*resultadoCasas = quantidadeCasasDecimais(result2, values[i]);
				let novoResultado =  (result2 / 100) * values[i];
				let  strNovoResultado = novoResultado.toFixed(resultadoCasas);
			    result2 = parseFloat(strNovoResultado);
				setResult(parseFloat(result2));
				operator = "";*/
        }
      }
    }
  }

  useEventListener("keydown", (e) => {
    if (e.key === enter || e.key === equal) {
      e.preventDefault();
      calculate();
      return;
    }
    if(e.key === deleteKey || e.key === backSpace){
       deleteAll();
    }
    if ((numbers.includes(e.key) || operators.includes(e.key) || e.key === period) && e.key !== ",") {
      updateCalc(e.key);
    }
  });

  const calculate = () => {
    alert("Valor do calculo é: " + String(result));
    setCalc(String(result));
    setResult(result);
    deleteAll();
  };

  function deleteAll() {
    values = [];
    result2 = 0;
    operator = "";
    number = "";
    counter = 0;
    resultNumber = "0";
    resultValues = "0";
    resultDecPlaces = 0;
	  calculation = "";
    setCalc("");
    setResult(0);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{calc || "0"}</div>
        <div className="display_result">
          <span>{result ? result : "0"}</span>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button className="digits_middle" onClick={() => updateCalc(".")}>.</button>
          <button className="equal" onClick={calculate}>=</button>
        </div>

        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("%")}>%</button>
          <button onClick={() => updateCalc("*")}>x</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={deleteAll}>CA</button>
        </div>
      </div>
    </div>
  );
}

export default App;
