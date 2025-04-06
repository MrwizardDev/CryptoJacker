class Transaction {
  public fromAddress: string;
  public toAddress: string;
  public amount: number;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Blockchain {
  public pendingTransactions: Transaction[] = [];
  public miningReward: number = 100;

  public createTransaction(transaction: Transaction): void {
    this.pendingTransactions.push(transaction);
  }

  public minePendingTransactions(miningRewardAddress: string): void {
    // Create a new block and add the mining reward transaction
    const block = new Block(this.chain.length, Date.now(), this.pendingTransactions);
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
    this.chain.push(block);
  }
}

// Example usage
const myCrypto = new Blockchain();

// Create a new transaction
const tx1 = new Transaction('Alice', 'Bob', 50);
myCrypto.createTransaction(tx1);

// Mine pending transactions
myCrypto.minePendingTransactions('miner-address');

console.log(JSON.stringify(myCrypto, null, 2));
