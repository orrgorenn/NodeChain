const sha256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddr, toAddr, amount) {
    this.fromAddr = fromAddr;
    this.toAddr = toAddr;
    this.amount = amount;
  }
}

class Block {
  constructor(timeStamp, trans, prevHash = "") {
    this.timeStamp = timeStamp;
    this.trans = trans;
    this.prevHash = prevHash;
    this.currentHash = this.calcHash();
    this.nonce = 0;
  }

  calcHash() {
    return sha256(
      this.prevHash + this.timeStamp + JSON.stringify(this.trans) + this.nonce
    ).toString();
  }

  mineBlock(diff) {
    while (this.currentHash.substring(0, diff) !== Array(diff + 1).join("0")) {
      this.nonce++;
      this.currentHash = this.calcHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.diff = 5;
    this.pendingTrans = [];
    this.reward = 90;
  }

  createGenesisBlock() {
    return new Block(Date.now(), "Genesis block", "o");
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  /* addBlock(newBlock) {
    newBlock.prevHash = this.getLastBlock().currentHash;
    newBlock.mineBlock(this.diff);
    this.chain.push(newBlock);
  } */

  miningPendingTrans(minerAddr) {
    const rewardTX = new Transaction(null, minerAddr, this.reward);
    this.pendingTrans.push(rewardTX);

    let block = new Block(
      Date.now(),
      this.pendingTrans,
      this.getLastBlock.currentHash
    );

    block.mineBlock(this.diff);
    console.log("Success in mining block.");
    this.chain.push(block);
    this.pendingTrans = [];
  }

  createTrans(trans) {
    this.pendingTrans.push(trans);
  }

  getBalanceOfAddr(addr) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.trans) {
        if (trans.fromAddr === addr) {
          balance -= trans.amount;
        } else if (trans.toAddr === addr) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      if (currBlock.currentHash !== currBlock.calcHash()) return false;
      if (currBlock.prevHash !== prevBlock.currentHash) return false;
      return true;
    }
  }
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;
