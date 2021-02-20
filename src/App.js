import "./App.css";
import { useState, useEffect } from "react";
import { example } from "./exemplo.js";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const [tmp, setTmp] = useState(0);


  useEffect(async () => {
    if (process.env.REACT_APP_MODE === "DEV") {
      setData(example);
    } else {
      const test = await axios.get(
        "https://api.nomics.com/v1/currencies/ticker?key=demo-6410726746980cead2a17c9db9ef29af&ids=BTC,ETH&interval=1h,1d,30d&convert=EUR&per-page=100&page=1"
      );
      setData(test.data);
    }
    setTimeout(function(){ setTmp(tmp+1) }, 60*1000);
    console.log("###: ",tmp)
  }, [tmp]);

  return (
    <div className="App">
      <header>
        <h1>Crypt Alert</h1>
      </header>
      <div>
        {data.map((currencie) => (
          <article key={currencie.id}>
            <h1>{currencie.name}</h1>
            <p>Price: {currencie.price}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;
