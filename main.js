const { Blockchain } = require("./Blockchain");
const { Transaction } = require("./Transaction");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const env = require("dotenv").config();

const myKey = ec.keyFromPrivate(process.env.PRVKEY);
const walletAddr = myKey.getPublic('hex');

var gorenCoin = new Blockchain();

// Create, Sign and add a new TX
const tx1 = new Transaction(walletAddr, 'toAddr', 10);
tx1.signTrans(myKey);
gorenCoin.addTrans(tx1);

gorenCoin.miningPendingTrans(walletAddr);

const tx2 = new Transaction(walletAddr, 'toAddr2', 30);
tx2.signTrans(myKey);
gorenCoin.addTrans(tx2);

gorenCoin.miningPendingTrans(walletAddr);

console.log(JSON.stringify(gorenCoin, null, 2));