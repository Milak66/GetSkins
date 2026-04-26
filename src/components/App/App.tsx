import React, { useRef, useState } from "react";
import "./App.css";
import knifePic from "../../assets/knife.png";

const App: React.FC = (): React.JSX.Element => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trade, setTrade] = useState<boolean>(false);
  const [tradeUrl, setTradeUrl] = useState<string>("");
  const [code, setCode] = useState<string>(""); 

  const startAnimation = () => {
    let pos = 0;
    let frameId: number;

    setIsLoading(true);

    const loading = () => {
      if (divRef.current) {
        pos += 2;
        divRef.current.style.transform = `rotate(${pos}deg)`;
      }
      frameId = requestAnimationFrame(loading);
    };

    loading();

    setTimeout(() => {
      cancelAnimationFrame(frameId);

      if (divRef.current) {
        divRef.current.style.transform = "rotate(0deg)";
      }

      setIsLoading(false);

      setTrade(true);
    }, 3000);
  };

  const btnOrTrade = () => {
    if (isLoading) return null;

    if (trade) {
      return (
        <div className="tradeDiv">
          <div className="tradeContent">
            <label className="labelText">Укажите свою ссылку на обмен</label>
            <input className="tradeUrl" type="text" onChange={(e) => setTradeUrl(e.target.value)} />
            <label className="labelText">Вставьте код</label>
            <input className="code" type="text" onChange={(e) => setCode(e.target.value)} />
            <button className="tradeBtn" onClick={send}>Отправить</button>
          </div>
        </div>
      );
    }
  };

  function send() {
    if (tradeUrl.trim().length == 0) {
        alert("Отсутствует ссылка на обмен")
    } else if (code != "666999") {
        alert("Неверный код")
    } else {
        alert("Данные отправлены!");
    }
  }

  return (
    <div className="app">
      <div className="getSkinPlace">
        <div className="getSkin">
          <div className="skin">
            <div className="free">FREE</div>
            <img className="skinImg" src={knifePic} alt="" />
            <p className="skinText">
              <i>КЕРАМБИТ КРОВАВАЯ ПАУТИНА</i>
            </p>
          </div>

          {btnOrTrade()}

          {isLoading ? (
            <div className="balls" ref={divRef}>
              <div className="greenBall"></div>
              <div className="greenBall"></div>
            </div>
          ) : (
            <button className="btn" onClick={startAnimation}>
              Получить скин
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;