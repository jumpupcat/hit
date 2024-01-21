import { useState, useEffect } from "react";
import axios from 'axios';
import ParticlesBg from "particles-bg";
import chartData from '../assets/chartData.json';

export default function Header() {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.post('https://ctz.havah.io/api/v3', {
      "jsonrpc":"2.0",
      "id":21000000,
      "method":"icx_call",
      "params":{
        "to":"cxa1c3a0fbdbb7e2580b2cecf47f0a5c5f3effc08c",
        "dataType":"call",
        "data":{
          "method":"balanceOf",
          "params": {
            "_owner": "hx0000000000000000000000000000000000000000"
          }
        }
      }
    })
    .then(({ data }) => {
      if(data && data?.result) {
        const supply = parseInt(data.result, 16);
        setAmount(supply / 1000000);
      }
    });
  }, []);

  return (
    <header id="home">
      <ParticlesBg type="circle" bg={true} />

      <div className="row banner">
        <div className="banner-text">
            <h1 className="responsive-headline">
              $GODH<span style={{ color: 'black' }}>AVAH</span>
            </h1>
            <h3>
              Total Supply 21,000,000<br />
              No roadmap No utility No owner<br />
              Just meme, enjoy!<br /><br />

              Market Cap <br />
              $GODH: { Math.round(chartData.GODH.lastPrice * 21_000_000).toLocaleString() } $HVH<br />
              $HH: { Math.round(chartData.HH.lastPrice * chartData.GODH.lastPrice * (10_000_000_000 - amount)).toLocaleString() } $HVH<br /><br />
              
              Burning hell: { Math.round(amount).toLocaleString() }
            </h3>
        </div>
      </div>
    </header>
  );
}