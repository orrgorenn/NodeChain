const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const pubKey = key.getPublic("hex");
const prvKey = key.getPrivate("hex");

console.log(`PubKey: ${pubKey}\nPrvKey: ${prvKey}`);