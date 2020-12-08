//const { MerkleTree } = require('merkletreejs');
const { Blockchain } = require("./Blockchain");
const { Transaction } = require("./Transaction");
const sha256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const fs = require('fs');
const env = require("dotenv").config();

const myKey = ec.keyFromPrivate(process.env.PRVKEY);
const walletAddr = myKey.getPublic('hex');

var gorenCoin = new Blockchain();

const rawTransData = fs.readFileSync('trans.json');
const transJSON = JSON.parse(rawTransData);

for (tx of transJSON) {
    // Create, Sign and add a new TX
    const pendingTX = new Transaction(walletAddr, tx.toAddr, tx.amount);
    pendingTX.signTrans(myKey);
    gorenCoin.addTrans(pendingTX);
}

// Mine Pending Transactions
gorenCoin.miningPendingTrans(walletAddr);

// const root = gorenCoin.chain[1].merkleTree.getRoot().toString('hex');
// const leaf = gorenCoin.chain[1].trans[0].hash;
// const proof = gorenCoin.chain[1].merkleTree.getProof(leaf);

// Markle Tree Print Ex.
// MerkleTree.print(gorenCoin.chain[1].merkleTree);

// console.log(`Bloom has: ${gorenCoin.chain[1].bFilter.has(leaf)}`);

console.log(JSON.stringify(gorenCoin, null, 2));