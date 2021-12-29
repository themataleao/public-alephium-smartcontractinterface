import json

from requests.sessions import Request

from flask import Flask, request, render_template, Response
import requests
from werkzeug.utils import redirect

app = Flask(__name__)

API_BASE = "http://alephium:12973"


@app.route("/api/wallets", methods=["GET"])
def wallets():
    wallets = requests.get(f"{API_BASE}/wallets")
    return Response(wallets)


@app.route("/api/unlock", methods=["POST"])
def unlock_wallet():
    name = request.args.get("walletName")
    password = request.args.get("wpassword")
    headers = {"Content-Type": "application/json; charset=utf-8"}
    wallet = requests.post(
        f"{API_BASE}/wallets/{name}/unlock",
        headers=headers,
        json={"password": password},
    )
    if wallet.ok:
        return Response(wallet)
    else:
        return Response(status=500)


@app.route("/api/contracts/compile-contract", methods=["POST"])
def compile_contract():
    code = "this is it"
    url = "{API_BASE}/api/contracts/compile-contract"
    payload = f"{code}"
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)


def buildContract(
    pubKey, code, state, gas=1000000, issueTokenAmmount=10000000000000000000000000000
):
    headers = {"Content-Type": "application/json; charset=utf-8"}

    data = {
        "fromPublicKey": pubKey,
        "code": code,
        "gas": gas,
        "state": state,
        "issueTokenAmount": str(issueTokenAmmount),
    }

    build = requests.post(
        f"{API_BASE}/contracts/build-contract", json=data, headers=headers
    )

    print("Contract build")

    if build.ok and build.json().get("unsignedTx"):
        return build


def getWalletAddresses():
    headers = {"Content-Type": "application/json; charset=utf-8"}

    wallets = requests.get(f"{API_BASE}/wallets", headers=headers)

    if wallets.ok:
        for wallet in wallets.json():
            if wallet.get("locked"):
                return False, False, False
                # requests.post(f'{API_BASE}/wallets/{wallet["walletName"]}/unlock', headers=headers,json={"password": "test"})

            walletName = wallet.get("walletName")
            address = requests.get(
                f"{API_BASE}/wallets/{walletName}/addresses", headers=headers
            )

            # Not select the miner wallet
            if (
                address.json().get("activeAddress")
                and len(address.json().get("addresses")) == 1
            ):
                balance = requests.get(
                    f'{API_BASE}/addresses/{address.json().get("activeAddress")}/balance',
                    headers=headers,
                ).json()["balanceHint"]
                return walletName, address.json()["activeAddress"], balance

    return False, False, False


def getPublicKeyActiveAddress():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    walletName, address, balance = getWalletAddresses()
    return (
        requests.get(
            f"{API_BASE}/wallets/{walletName}/addresses/{address}", headers=headers
        )
        .json()
        .get("publicKey")
    )


def signContract(hash):
    print("signContract")
    headers = {"Content-Type": "application/json; charset=utf-8"}

    data = {"data": hash}

    contract = requests.post(
        f"{API_BASE}/wallets/{walletName}/sign", headers=headers, json=data
    )

    if contract.ok and contract.json().get("signature"):
        return contract.json().get("signature")
    else:
        return "Error on signContract"


def submitContract(unsignedTx, signature):
    print("submitContract")
    headers = {"Content-Type": "application/json; charset=utf-8"}

    data = {"unsignedTx": unsignedTx, "signature": signature}

    contract = requests.post(
        f"{API_BASE}/transactions/submit", headers=headers, json=data
    )

    if contract.ok and contract.json().get("txId"):
        return contract.json().getId("txId")
    else:
        print(contract.content)
        print(contract.json().get("detail"))
        return f"Error on submitContract: {contract.json().get('detail')}"


if __name__ == "__main__":
    app.run(debug=True)
