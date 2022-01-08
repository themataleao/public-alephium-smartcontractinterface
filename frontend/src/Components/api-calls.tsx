import { TypeWalletBuild, TypeUnsignedTransaction } from '../State/Types';
const axios = require('axios');

const API_KEY = process.env.REACT_APP_API_KEY;

const getWallets = async () => {
    var config = {
        method: 'get',
        url: `/wallets`,
        headers: {
            'X-API-KEY': `${API_KEY}`
        }
    };
    try {
        let response = await axios(config)
        var enhancedWallets = []
        for (let i = 0; i < response.data.length; i++) {
            var wallet = response.data[i]
            if (!wallet.locked) {
                var walletName = wallet.walletName
                let response_wallets = await getWalletAddress(walletName)
                let response_private_key = await getWalletPrivateKey(walletName, response_wallets.data.activeAddress)
                var walletAddress = response_wallets.data.activeAddress
                var publicKey = response_private_key.data.publicKey
                var enhancedObject: object = {
                    ...wallet,
                    ...{
                        "walletAddress": walletAddress,
                        "publicKey": publicKey
                    }
                }
                enhancedWallets.push(enhancedObject)
            }
            else {
                enhancedWallets.push(wallet)
            }

        }
        return enhancedWallets
    }
    catch (error: any) {
        console.error(error)
        return []
    }
}

const unlockWallet = async (walletName: String, walletPassword: String) => {
    var axios = require('axios');
    var data = JSON.stringify({
        "password": `${walletPassword}`
    });

    var config = {
        method: 'post',
        url: `/wallets/${walletName}/unlock`,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        data: data
    };

    try {
        let response = await axios(config)
        return response
    }
    catch (error) {
        console.error(error)
        return error
    }

}

const compileContract = async (contractCode: String) => {
    var data = JSON.stringify({
        "code": `${contractCode}`
    });
    var config = {
        method: 'post',
        url: `/contracts/compile-contract`,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        data: data
    };
    try {
        let response = await axios(config)
        return response
    }
    catch (error: any) {
        console.error("an error occured: ", error.response)
        return error
    }
}

const getWalletAddress = async (walletName: String) => {
    var config = {
        method: 'get',
        url: `/wallets/${walletName}/addresses`,
        headers: { 'X-API-KEY': API_KEY }
    };
    try {
        let response = await axios(config)
        return response
    }
    catch (error) {
        console.error(error)
        return error
    }
}


const getWalletPrivateKey = async (walletName: String, walletAddress: String) => {
    var config = {
        method: 'get',
        url: `/wallets/${walletName}/addresses/${walletAddress}`,
        headers: { 'X-API-KEY': API_KEY }
    };
    try {
        let response = await axios(config)
        return response
    }
    catch (error) {
        console.error(error)
        return error
    }
}


const unpackInitialContractState = (state: any) => {
    const initialStateArray: String[] = []
    const additionalContractVariables: any = {}
    JSON.parse(state).forEach((element: any) => {
        switch (element.type) {
            case ('Address'):
                initialStateArray.push(`@${element.value}`)
                break
            case ('U256'):
                initialStateArray.push(`${element.value}u`)
                additionalContractVariables[`${element.name}`] = element.value
                break
            default:
                console.error("type of initial state value not given")
        }
        return null
    })
    return [initialStateArray, additionalContractVariables]
}

const buildUnsignedTransaction = async (wallet: TypeWalletBuild, code: String, gas: Number, initialContractState: String) => {
    var [unpackedInitialState, unpackedContractVariables] = unpackInitialContractState(initialContractState)
    var data = JSON.stringify({
        ...unpackedContractVariables,
        "fromPublicKey": `${wallet.publicKey}`,
        "code": `${code}`,
        "gas": gas,
        "state": `[${unpackedInitialState}]`,
    })
    var config = {
        method: 'post',
        url: `/contracts/build-contract`,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        data: data
    };
    try {
        let response = await axios(config)
        return response
    }
    catch (error) {
        console.error(error)
        return error
    }
}

const signContract = async (wallet: TypeWalletBuild, unsignedTransaction: TypeUnsignedTransaction) => {
    var data = JSON.stringify({
        "data": unsignedTransaction.hash
    })
    var config = {
        method: 'post',
        url: `/wallets/${wallet.walletName}/sign`,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        data: data
    };
    try {
        let response = await axios(config)
        let submitResponse = await submitContract(unsignedTransaction, response.data.signature)
        return submitResponse
    }
    catch (error) {
        console.error(error)
        return error
    }
}

const submitContract = async (unsignedTransaction: TypeUnsignedTransaction, signature: any) => {
    var data = JSON.stringify({
        "unsignedTx": unsignedTransaction.unsignedTx,
        "signature": signature
    })
    var config = {
        method: 'post',
        url: `/transactions/submit`,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        data: data
    };
    try {
        let response = await axios(config)
        return response
    }
    catch (error) {
        console.error(error)
        return error
    }
}




export { getWallets, unlockWallet, compileContract, buildUnsignedTransaction, signContract, submitContract }
