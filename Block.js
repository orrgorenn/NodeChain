const { MerkleTree } = require('merkletreejs');
const { PartitionedBloomFilter } = require('bloom-filters');
const sha256 = require("crypto-js/sha256");

class Block {
    constructor(timeStamp, trans, prevHash = "") {
        this.timeStamp = timeStamp;
        this.trans = trans;
        this.prevHash = prevHash;
        this.currentHash = this.calcHash();
        this.nonce = 0;
        let hashArray = [];
        this.bFilter = new PartitionedBloomFilter(4, 5);
        for (let tx of this.trans) {
            if (typeof tx !== 'object') continue;
            hashArray.push(tx.hash);
            this.bFilter.add(tx.hash);
        }
        this.merkleTree = new MerkleTree(hashArray, sha256);
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

    validateTrans() {
        for (const trans of this.trans) {
            if (!trans.isValid()) return false;
        }
        return true;
    }
}

module.exports.Block = Block;