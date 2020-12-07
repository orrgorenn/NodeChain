const sha256 = require("crypto-js/sha256");

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

module.exports.Block = Block;