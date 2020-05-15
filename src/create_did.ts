const EthrDID = require('ethr-did');
var W3 = require('web3');

let PROVIDER_NODE = 'https://ropsten.infura.io/chim_himidumage';

let provider = new W3.providers.HttpProvider(PROVIDER_NODE);

var w3 = new W3(provider);

let acc = w3.eth.accounts.create();
console.log(acc);


const ethrDid = new EthrDID({address: acc.address, privateKey: acc.privateKey, provider})
console.log(ethrDid);