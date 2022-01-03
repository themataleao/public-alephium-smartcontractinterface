interface TypeWalletBuild {
    locked?: Boolean,
    publicKey?: String,
    walletAddress?: String,
    walletName?: String,
}

interface TypeUnsignedTransaction {
    unsignedTx?: String,
    hash?: String,
    contractId?: String,
    fromGroup?: Number,
    toGroup?: Number
}

interface CompletedTransaction {
    fromGroup?: Number,
    toGroup?: Number,
    txId?: String
}

export type { TypeWalletBuild, TypeUnsignedTransaction, CompletedTransaction }