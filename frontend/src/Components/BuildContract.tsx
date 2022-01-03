import { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { buildUnsignedTransaction } from './api-calls';
import { Context } from '../State/Store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import CodeIcon from '@mui/icons-material/Code';
import Typography from '@mui/material/Typography';
import { typographyStyle } from './style';


export default function BuildContract() {
    const [gas, setGas] = useState("50000");
    const [initialContractState, setInitialContractState] = useState(
        `[{"value":"12A5BS62pyQKmeGGBJcDcFp3AnaWmze8nXFWQ1cgmydyZ", "type":"Address"},{"value":"1000000000000000000", "type":"U256", "name":"issueTokenAmount"} ]`);
    const [helperText, setHelperText] = useState("")
    const [isError, setIsError] = useState(false)
    const [state, dispatch] = useContext(Context);
    const [, setValueChange] = useState({});

    useEffect(() => {
        setValueChange(state.wallets)
    }, [state.wallets])






    const handleContractSubmit = (code: String, wallet: any) => {
        buildUnsignedTransaction(wallet, code, parseInt(gas), initialContractState).then((response) => {
            if (response.status === 200) {
                setIsError(false)
                setHelperText("contract successfully built!")
                dispatch({ type: "SET_UNSIGNED_TRANSACTION", payload: response.data })

            }
            else {
                setIsError(true)
                setHelperText(response.response.data.detail)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <Box display='flex' flexDirection='column' >
            <Box display='flex' flexDirection='row' >
                <Box display='flex' flexDirection='column' width={'50%'} >
                    <Box>
                        <TextField
                            label="gas"
                            id="gas-input"
                            value={gas}
                            onChange={(event) => setGas(event.target.value)
                            }
                            sx={{ m: 1, width: '66%' }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="initial state"
                            id="inital-state"
                            multiline
                            value={initialContractState}
                            onChange={(event) => setInitialContractState(event.target.value)}
                            sx={{ m: 1, width: '66%' }}
                        />
                    </Box>
                    < Typography variant="caption" display="block" gutterBottom >
                        The initial state represents the initial values of the smart contract function.
                        You can define them like "value" : ' "", "type" ': '"","name"': '""`. The parameter name is optional.
                        It is only needed for additional parameters of the contract function.
                        Currently only two types are implemented "Address" and "U256".
                    </Typography>
                </Box>
                < Box display='flex' flexDirection='column' width={'50%'} >
                    <List>
                        <ListItem>
                            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon >
                            <ListItemText primary={`wallet-name: ${state.selectedWallet.walletName}`} />
                        </ListItem>
                        < ListItem >
                            <ListItemIcon><LockIcon /></ListItemIcon >
                            <ListItemText primary={`locked: ${state.selectedWallet.locked}`} />
                        </ListItem>
                        < ListItem >
                            <ListItemIcon><AlternateEmailIcon /></ListItemIcon >
                            <ListItemText primary={`wallet-address: ${state.selectedWallet.walletAddress}`} primaryTypographyProps={typographyStyle} />
                        </ListItem>
                        < ListItem >
                            <ListItemIcon><KeyIcon /></ListItemIcon >
                            <ListItemText primary={`public-key: ${state.selectedWallet.publicKey}`} primaryTypographyProps={typographyStyle} />
                        </ListItem>
                        < ListItem >
                            <ListItemIcon><CodeIcon /></ListItemIcon >
                            <ListItemText primary={`compiled-code: ${state.code}`} primaryTypographyProps={typographyStyle} />
                        </ListItem>
                    </List>
                </Box>
            </Box>
            < Box sx={{ py: 2 }}>
                <Button
                    variant='outlined'
                    onClick={() => handleContractSubmit(state.code, state.selectedWallet)}
                > build contract </Button>
            </Box>
            < Typography variant="caption" display="block" gutterBottom color={isError ? "error" : ""} >
                {helperText}
            </Typography>
        </Box>
    )
}