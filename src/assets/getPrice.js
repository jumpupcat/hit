const axios = require('axios');
const fs = require('fs');
const wait = require("wait");
const fileName = 'src/assets/chartData.json';
let saveData;

const checkList = [
  {
    tokenB: 'GODH',
    pool: 'cx8fbc79c2bcb7c24accb5756bc24bb8ed6b87d312',
    tokenA: 'WHVH',
    rate: 0.997
  },
  {
    tokenB: 'HH',
    pool: 'cxdfd439eb7e6775938fd9d6294f8297cac2e9d9ab',
    tokenA: 'GODH',
    rate: 0.997
  },
  {
    tokenB: 'sHVH',
    pool: 'cxc5624770e0b63a9890e779194027f9a9e9b9d36b',
    tokenA: 'WHVH',
    rate: 0.997
  },
];

const checker = async (a, b, pool, rate) => {
  saveData = JSON.parse(fs.readFileSync(fileName));
  const tagetData = saveData[b];
  const currentData = tagetData?.data ? tagetData?.data : [];
  const lastData = currentData[currentData.length-1];

  let currentPage = 1;
  let totalSize;
  do {
    const { data } = await axios.get(`https://scan.havah.io/v3/address/tokenTxList?address=${pool}&page=${currentPage++}&count=100`);

    if(!totalSize) totalSize = data.totalSize;

    for(const tx of data.data) {
      if(tx.scoreSymbol == 'HTP') continue;
      
      if(lastData?.txHash == tx.txHash) {
        totalSize = 1;
        break;
      }

      let temp = currentData.find((v) => v.txHash == tx.txHash);
      if(!temp) {
        temp = {
          [a]: 0,
          [b]: 0
        };
        temp.txHash = tx.txHash;
        temp.timestamp = new Date(`${tx.timestamp} GMT`).getTime();

        currentData.push(temp);
      }

      let amount = Number(tx.quantity);
      if(tx.fromAddr == pool) amount *= -1;

      if(tx.scoreSymbol == a) {
        temp[a] += amount;
      } else if(tx.scoreSymbol == b) {
        temp[b] += amount;
      }
    }

    await wait(200);
  } while(currentPage <= Math.ceil(totalSize/100));

  let totalA = tagetData?.totalA ? tagetData?.totalA : 0;
  let totalB = tagetData?.totalB ? tagetData?.totalB : 0;
  const lastPrice = tagetData?.lastPrice ? tagetData?.lastPrice : 0;
  let currentPrice = lastPrice;

  currentData.sort((a, b) => a.timestamp - b.timestamp);
  for(const v of currentData) {
    if(v.price) continue;
    totalA += v[a];
    totalB += v[b];
  
    currentPrice = totalA / (totalB+1) * rate
    v.price = currentPrice;
  }

  const outputData = {
    ...saveData,
    lastUpdate: new Date().getTime(),
    [b]: {
      tokenB: b,
      tokenA: a,
      totalA,
      totalB,
      lastPrice: currentPrice,
      data: currentData
    }
  }

  fs.writeFileSync(fileName, JSON.stringify(outputData, null, 4));
}

(async () => {
  for(const c of checkList) {
    await checker(c.tokenA, c.tokenB, c.pool, c.rate);
  }
})();