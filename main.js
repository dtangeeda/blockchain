const SHA256 = require('crypto-js/sha256');


class Block{
	constructor(index, timestamp, data, previousHash){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0
	}
	
	calculateHash(){
	return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}
	
	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
		this.nonce++ ;
		//console.log("inside while loop");
		this.hash = this.calculateHash();
		}
		
	console.log("Block is mined:-- " + this.hash);
	 
	}
}


class BlockChain{
	
	constructor(){
	this.chain = [this.createGenesisBlock()];
	this.difficulty =4;
	}
	
	createGenesisBlock(){
	return new Block(0, '1/1/2018', 'Genesis Block', "0");
	}
	
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		//newBlock.hash = newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}
	
	isChainValid(){
	for(let i = 1; i < this.chain.length; i++){
		const currentBlock = this.chain[i];
		const prevBlock = this.chain[i - 1];
		
		if(currentBlock.hash !== currentBlock.calculateHash()){
		return false;
		}
		
		if(currentBlock.previousHash !== prevBlock.hash){
			return false;
			
		}
	}
	
	return true;
	}

}

let myCoin = new BlockChain();

console.log("Mining the block 1 ...");
myCoin.addBlock(new Block(1, '1/25/2018', {amount : 4}));

console.log("Mining the block 2 ...");
myCoin.addBlock(new Block(2, '1/27/2018', {amount : 10}));

console.log(JSON.stringify(myCoin, null, 4));


//myCoin.chain[1].data = {amount : 100};
//myCoin.chain[1].hash =  myCoin.chain[1].calculateHash();
//console.log("Is BlockChain Valid:--- "  + myCoin.isChainValid());
