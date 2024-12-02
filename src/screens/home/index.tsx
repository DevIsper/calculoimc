import { useState } from "react";
import "./styles.scss";

function App() {
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [texto, setTexto] = useState("");
  const [IMC, setIMC] = useState(0);

  function calculaIMC(p: number, a: number): number {
    if (a <= 0) return 0; // Evita divisão por zero
    return p / (a * a);
  }

  function imprime(e: React.FormEvent): void {
    e.preventDefault();
    const imc = calculaIMC(peso, altura);

    if (imc === 0) {
      setTexto("Altura inválida");
      setIMC(0);
      return;
    }

    setIMC(imc);

    if (imc < 20) {
      setTexto("abaixo do peso");
    } else if (imc >= 20 && imc <= 24) {
      setTexto("normal");
    } else if (imc > 24 && imc <= 29) {
      setTexto("acima do peso");
    } else if (imc > 29 && imc <= 35) {
      setTexto("excessivamente acima do peso");
    } else if (imc > 35) {
      setTexto("consideravelmente acima do peso");
    }
  }

  return (
    <>
      <section className="mainSection">
        <div className="mainForm">
          <form onSubmit={imprime}>
            <div>
              <label htmlFor="altura"></label>
              <input
                type="number"
                placeholder="Digite sua altura (em metros)"
                name="altura"
                step="0.01"
                onChange={({ target }) =>
                  setAltura(parseFloat(target.value) || 0)
                }
              />
            </div>

            <div>
              <label htmlFor="peso"></label>
              <input
                type="number"
                placeholder="Digite seu peso (em kg)"
                name="peso"
                step="0.1"
                onChange={({ target }) =>
                  setPeso(parseFloat(target.value) || 0)
                }
              />
            </div>

            <button type="submit" id="btnSubmit">Calcular IMC</button>
          </form>

          {texto && (
            <div className="resultado">
              <h1>
                {IMC > 0
                  ? `Seu IMC é ${IMC.toFixed(2)} e você está ${texto}.`
                  : texto}
              </h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
