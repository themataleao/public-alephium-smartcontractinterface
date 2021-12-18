# Alephium smart contract interface

Currently under development: use `run-app-debug.sh`

This interface should provide you an easy way to interact with the alephium smart contract interface.

If you run `docker-compose -f docker-compose.smart-contract.yml up` the backend should start.

To start a full running node and the application run `docker-compose -f docker-compose.yml -f docker-compose.smart-contract.yml up`.

Or you can also run the run-app.sh script. Give access to it `chmod +x run-app.sh` and run it `./run-app.sh`

It is currently under development so please use `docker-compose -f docker-compose.yml -f docker-compose.smart-contract.yml -f docker-compose.debug.yml up`

You can also run the node in a different environment as you wish and the application as such.

Be sure you have docker and docker-compose installed. If you have NVIDIA Gpus you should install [nvidia docker](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html).