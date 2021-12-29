const axios = require('axios');

const BASE_URL = `http://localhost:12973`

const getWallets = async () => {
    try {
        let response = await axios.get(`${BASE_URL}/wallets`)
        return response
    }
    catch (error: any) {
        console.error(error)
        return error
    }
}

const unlockWallet = async (walletName: String, walletPassword: String) => {
    var axios = require('axios');
    var data = JSON.stringify({
        "password": `${walletPassword}`
    });

    var config = {
        method: 'post',
        url: `${BASE_URL}/wallets/${walletName}/unlock`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        let response = await axios(config)
        return response
    }
    catch (error) {
        console.log(error)
        return error
    }

}

const compileContract = async (contractCode: String) => {
    var data = JSON.stringify({
        "code": `${contractCode}`
    });
    var config = {
        method: 'post',
        url: `${BASE_URL}/contracts/compile-contract`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        let response = await axios(config)
        console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
        return error
    }
}


const getWalletPrivateKey = async (walletName: String, walletAddress: String) => {
    var config = {
        method: 'get',
        url: `${BASE_URL}/wallets/${walletName}/addresses/${walletAddress}`,
    };
    try {
        let response = await axios(config)
        console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
        return error
    }
}


export { getWallets, unlockWallet, compileContract }
