import React, { useState, useEffect } from "react";
import axios from 'axios';
import ParticlesBg from "particles-bg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from "@ramonak/react-progress-bar";

export default function Header() {
  const [supply, setSupply] = useState(0);

  const tokenAddr = 'cxd8303731bf989a1597a6d38505d7a9483c4d9a38'
  const scan = `https://scan.havah.io/token/${tokenAddr}`;
  const twitter = 'https://twitter.com/godhavah';

  useEffect(() => {
    axios.post('https://ctz.havah.io/api/v3', {
      "jsonrpc":"2.0",
      "id":21000000,
      "method":"icx_call",
      "params":{
        "to":"cxd8303731bf989a1597a6d38505d7a9483c4d9a38",
        "dataType":"call",
        "data":{
          "method":"totalSupply"
        }
      }
    })
    .then(({ data }) => {
      if(data && data?.result) {
        const supply = parseInt(data.result, 16)
        setSupply(supply / 1000000)
      }
    });
  }, []); 

  const mint = () => {
    if(!window.havah) {
      toast.error("HAVAH wallet is not installed");
      return;
    }

    window.havah.connect()
    .then(res => {
      let nid;
      if(res?.nid) {
        nid = res.nid;
      } else if(res?.body?.nid) {
        nid = res.body.nid;
      }
      
      if(nid !== '0x100') {
        toast.error("wrong network, mint only mainnet");
        return;
      }
      
      const transactionData = {
        to: tokenAddr,
        method: 'mint'
      };
      
      window.havah.sendTransaction(transactionData)
      .then(({ type }) => {
        if(type === 'success') toast.success("mint success");
      })
      .catch(error => {
        toast.error("tx send error, try again");
        console.error(`Error: ${error}`)
      });
    })
    .catch(error => {
      toast.error("wallet connect error, try again");
      console.error(`Error: ${error}`)
    });
  }

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
              Only need to pay gas fee<br />
              No roadmap No utility No owner<br />
              1 MINT = 1 $GODH<br />
              <br />
              { supply.toLocaleString() }/21,000,000
            </h3>

            <ProgressBar completed={Math.round(supply/21000000*100)} />
            <hr />
            
            <ul className="social">
              <button className="button btn project-btn" onClick={() => mint()}>
                MINT
              </button>
              <a href={scan} className="button btn github-btn" target="_blank" rel="noreferrer">
                SCAN
              </a>
              <a href={twitter} className="button btn twitter-btn" target="_blank" rel="noreferrer">
                TWITTER
              </a>
            </ul>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"          
      />
    </header>
  );
}