import * as crypto from 'crypto-js';

class Block {
  public index: number;
  public timestamp: number;
  public data: any;
  public previousHash: string;
  public hash: string;

  constructor(index: number, timestamp: number, data: any, previousHash: string = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  private calculateHash(): string {
    return crypto.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  public chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  private createGenesisBlock(): Block {
    return new Block(0, Date.now(), 'Genesis Block', '0');
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// Example usage
const myCrypto = new Blockchain();

console.log('Mining block 1...');
myCrypto.addBlock(new Block(1, Date.now(), { amount: 4 }));

console.log('Mining block 2...');
myCrypto.addBlock(new Block(2, Date.now(), { amount: 8 }));

console.log(JSON.stringify(myCrypto, null, 2));

console.log('Is blockchain valid? ' + myCrypto.isChainValid());
