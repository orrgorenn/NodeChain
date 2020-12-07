const sha256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Transaction {
    constructor(fromAddr, toAddr, amount) {
        this.fromAddr = fromAddr;
        this.toAddr = toAddr;
        this.amount = amount;
        this.timeStamp = Date.now();
    }

    calcHash() {
        return sha256(
            this.fromAddr + this.toAddr + this.amount + this.timeStamp
        );
    }

    signTrans(signKey) {
        if (signKey.getPubKey('hex') !== this.fromAddr) {
            throw new Error("Trying to sign a foreign transaction.");
        }
        const hashTX = this.calcHash();
        const sign = signKey.sign(hashTX, "base64");
        this.sign = sign.toDer('hex');
    }

    isValid() {
        if (this.fromAddr === null) return true;
        if (!this.sign || this.sign === 0) throw new Error("Transaction not signed.");
        const pubKey = ec.keyFromPublic(this.fromAddr, 'hex');
        return pubKey.verify(this.calcHash(), this.sign);
    }
}

module.exports.Transaction = Transaction;