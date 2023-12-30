const axios = require('axios');
const fs = require('fs');
const wait = require("wait");
const transferFileName = 'src/assets/godh.json';
const contracctAddr = 'cx8fbc79c2bcb7c24accb5756bc24bb8ed6b87d312';

const checker = async () => {
  const saveData = JSON.parse(fs.readFileSync(transferFileName));
  const currentData = saveData?.data ? saveData?.data : [];
  const lastData = currentData[currentData.length-1];

  let currentPage = 1;
  let totalSize;
  do {
    const { data } = await axios.get(`https://scan.havah.io/v3/address/tokenTxList?address=${contracctAddr}&page=${currentPage++}&count=100`);

    if(!totalSize) totalSize = data.totalSize;

    for(const tx of data.data) {
      if(tx.scoreSymbol == 'HTP') continue;
      
      if(lastData?.txHash == tx.txHash) {
        totalSize = 1;
        break;
      }

      let temp = currentData.find((v) => v.txHash == tx.txHash);
      let flag = true;
      if(!temp) {
        temp = {
          godh: 0,
          hvh: 0
        };
        temp.txHash = tx.txHash;
        temp.timestamp = new Date(`${tx.timestamp} GMT`).getTime();
      } else {
        flag = false
      }

      let amount = Number(tx.quantity);
      if(tx.fromAddr == contracctAddr) amount *= -1;

      if(tx.scoreSymbol == 'GODH') {
        temp.godh += amount;
      } else if(tx.scoreSymbol == 'WHVH') {
        temp.hvh += amount;
      }

      if(flag) currentData.push(temp);
    }

    await wait(1000);
  } while(currentPage <= Math.ceil(totalSize/100));

  let totalHvh = saveData?.totalHvh ? saveData?.totalHvh : 0;
  let totalGodh = saveData?.totalGodh ? saveData?.totalGodh : 0;
  const lastPrice = saveData?.lastPrice ? saveData?.lastPrice : 0;
  let currentPrice = lastPrice;

  currentData.sort((a, b) => a.timestamp - b.timestamp);
  for(const v of currentData) {
    if(v.price) continue;
    totalHvh += v.hvh;
    totalGodh += v.godh;
  
    currentPrice = totalHvh / (totalGodh+1) * 0.997
    v.price = currentPrice;
  }

  const outputData = {
    totalHvh,
    totalGodh,
    lastPrice: currentPrice,
    lastUpdate: new Date().getTime(),
    data: currentData
  }

  fs.writeFileSync(transferFileName, JSON.stringify(outputData, null, 4));
}

checker();