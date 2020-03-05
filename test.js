//decimal = parseInt('e69f1708ea861fef46e6194c31dafd9fe21944479e28f3714009f27a6785b8cf', 16);


const hugeHex = BigInt("0xe69f1708ea861fef46e6194c31dafd9fe21944479e28f3714009f27a6785b8cf");
console.log(hugeHex);

smaller = hugeHex/4n;
smaller = smaller*4n;

decimal = 12000001;
hexString = decimal.toString(16);

bigdecimal = 104313042837994833924598293473061343859519330483091868436676889618079778453711n;
hexString = "0x" + bigdecimal.toString(16);

console.log(smaller);
console.log(hexString);

huge = BigInt(hexString);
console.log(huge);


console.log(parseInt(huge));

var alsoHuge = BigInt(9007199254740991);

console.log(alsoHuge);


const biggestHex = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
console.log(biggestHex);


alsoHuge = 27750414306578570329536317712115338282248711737119216489801731395642788591325n;

console.log(alsoHuge.toString(16));
