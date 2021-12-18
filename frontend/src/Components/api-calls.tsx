const axios = require('axios');
var qs = require('qs');

const getWallets = async () => {
    try {
        let response = await axios.get('/api/wallets')
        return response
    }
    catch (error: any) {
        console.error(error)
        return error
    }
}

const unlockWallet = async (walletName: String, wpassword: String) => {
    var params = {
        "walletName": `${walletName}`,
        "wpassword": `${wpassword}`
    };

    var config = {
        method: 'post',
        url: '/api/unlock',
        headers: {},
        params: params, 'paramsSerializer': function (params: any) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
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


export { getWallets, unlockWallet }
