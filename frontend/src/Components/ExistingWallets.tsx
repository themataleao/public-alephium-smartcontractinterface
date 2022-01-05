import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getWallets, unlockWallet } from './api-calls';
import { Context } from '../State/Store';
import { TypeWalletBuild } from '../State/Types';

export default function ExistingWallets() {
    const [wallets, setWallets] = useState<any>([]);
    const [selectedWallet, setSelectedWallet] = useState('');
    const [wpassword, setWpassword] = useState("");
    const [helperTextPassword, setHelperTextPassword] = useState("")
    const [isErrorPassword, setIsErrorPassword] = useState(false)
    const [unlockStateChange, setUnlockStateChange] = useState(true);
    const [, dispatch] = useContext(Context);

    useEffect(() => {
        getWallets().then(
            response => {
                setWallets(response)
                dispatch({ type: "SET_WALLETS", payload: response })
            }
        ).catch(
            error => console.error(error)
        )
        // eslint-disable-next-line
    }, [unlockStateChange])

    const unlockWalletHandler = () => {
        unlockWallet(selectedWallet, wpassword).then(
            response => {
                setUnlockStateChange(!unlockStateChange)
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
            error => console.error("error: ", error.status)
        )
    }

    const selectWalletHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedWallet(event.target.value)
        let obj = wallets.find((wallet: TypeWalletBuild) => wallet.walletName === event.target.value);
        dispatch({ type: 'SET_SELECTED_WALLET', payload: obj })
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <Box sx={{ pt: 5 }}>
                <TextField
                    select
                    style={{ width: '40%' }}
                    label="wallet"
                    value={selectedWallet}
                    onChange={selectWalletHandler}>
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