# Alephium smart contract interface

This interface should provide you an easy way to interact with the alephium smart contract interface.

# 🐞 Installation

Be sure you have docker and docker-compose installed. If you have NVIDIA Gpus you can install [nvidia docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)

# 🚜 Run a development instance locally

```bash
docker-compose -f docker-compose.yml -f docker-compose.smart-contract.yml -f docker-compose.debug.yml up
```

or run the `run-app-debug.sh`

```bash
chmod +x run-app-debug.sh # Give executable rights
./run-app-debug.sh # Run the app
```

# 🏭 Run an instance on a server

```bash
docker-compose -f docker-compose.yml -f docker-compose.smart-contract.yml up
```

or run the `run-app-debug.sh`

```bash
chmod +x run-app.sh # Give executable rights
./run-app.sh # Run the app
```

# ⛏️  Run a mining GPU instance locally (only valid with GPU)

This is only needed if you want to mine alph with GPU. With CPU you can use the swagger endpoint.

```bash
docker-compose -f docker-compose.yml -f docker-compose.debug.yml -f docker-compose.gpu-miner.yml up
```