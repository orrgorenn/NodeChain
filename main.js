const { Blockchain, Block, Transaction } = require("./Blockchain");

var gorenCoin = new Blockchain();

gorenCoin.createTrans(new Transaction("address1", "address2", 50));

gorenCoin.miningPendingTrans("orr");
console.log(`Orr's balance is: ${gorenCoin.getBalanceOfAddr("orr")}`);

gorenCoin.createTrans(new Transaction("orr", "address1", 11));
gorenCoin.miningPendingTrans("orr");

console.log(`Orr's balance is: ${gorenCoin.getBalanceOfAddr("orr")}`);

console.log(JSON.stringify(gorenCoin, null, 2));
