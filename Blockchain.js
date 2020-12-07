const { Block } = require("./Block");
const { Transaction } = require("./Transaction");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.diff = 2;
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

  addTrans(trans) {
    if (!trans.fromAddr || !trans.toAddr || trans.amount === 0) throw new Error("Transaction must contain all details.");
    if (!trans.isValid()) throw new Error("Transaction is not valid.");
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

      if (!currBlock.validateTrans()) return false;
      if (currBlock.currentHash !== currBlock.calcHash()) return false;
      if (currBlock.prevHash !== prevBlock.currentHash) return false;
      return true;
    }
  }
}

module.exports.Blockchain = Blockchain;