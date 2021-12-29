import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getWallets, unlockWallet } from './api-calls';
import { Context } from '../State/Store';

export default function ExistingWallets() {
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState("")
    const [wpassword, setWpassword] = useState("")
    const [helperTextPassword, setHelperTextPassword] = useState("")
    const [isErrorPassword, setIsErrorPassword] = useState(false)
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        getWallets().then(
            response => {
                setWallets(response.data)
                dispatch({ type: "SET_WALLETS", payload: response.data })
            }
        ).catch(
            error => console.log(error)
        )
        // eslint-disable-next-line
    }, [helperTextPassword])

    const unlockWalletHandler = () => {
        unlockWallet(selectedWallet, wpassword).then(
            response => {
                if (response.status === 200) {
                    setIsErrorPassword(false)
                    setHelperTextPassword("Wallet unlocked")

                }
                else {
                    setIsErrorPassword(true)
                    setHelperTextPassword("Wrong password")
                }
            }
        ).catch(
            error => console.log("error: ", error.status)
        )
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <Box>
                <TextField
                    select
                    style={{ width: '40%' }}
                    label="wallet"
                    onChange={(event) => setSelectedWallet(event.target.value)}>
                    {wallets.map((item: any) => {
                        var lockedOrNot = item.locked ? "locked" : "unlocked"
                        return <MenuItem
                            key={item.walletName}
                            value={item.walletName}>{`${item.walletName} (${lockedOrNot})`}</MenuItem>
                    })}
                </TextField>
            </Box>
            <Box style={{ paddingBlock: 20, width: "100%" }}>
                <TextField
                    error={isErrorPassword}
                    style={{ width: '40%' }}
                    id="wallet-password"
                    label="Password"
                    onChange={(event) => setWpassword(event.target.value)}
                    defaultValue="Password"
                    value={wpassword}
                    helperText={helperTextPassword}
                />
            </Box>
            <Button
                variant="outlined"
                onClick={unlockWalletHandler}>Unlock</Button>
        </Box>
    );
}