import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Header extends Component {
  render() {
    const tokenAddr = 'cxa60c2d37b79f3b1eed2e1beae9d63ab47bb8947d'
    const info = `https://scan.vega.havah.io/token/${tokenAddr}`;

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
            <Fade bottom>
              <h1 className="responsive-headline">
                $GODH<span style={{ color: 'black' }}>AVAH</span>
              </h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>
                There's total 21,000,000 slots.<br />
                Only need to pay gas fee.<br />
                No roadmap. No utility. No owner.<br />
                1 MINT = 1 GODH
              </h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <button className="button btn project-btn" onClick={() => mint()}>
                  MINT
                </button>
                <a href={info} className="button btn github-btn" target="_blank" rel="noreferrer">
                  INFO
                </a>
              </ul>
            </Fade>
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
