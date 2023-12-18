import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Header extends Component {
  render() {
    const tokenAddr = 'cxd8303731bf989a1597a6d38505d7a9483c4d9a38'
    const scan = `https://scan.havah.io/token/${tokenAddr}`;
    const twitter = 'https://twitter.com/godhavah';

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
                1 MINT = 1 $GODH
              </h3>
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
}

export default Header;
