import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getWallets, unlockWallet } from './api-calls';

export default function ExistingWallets() {
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState("")
    const [wpassword, setWpassword] = useState("")
    const [helperTextPassword, setHelperTextPassword] = useState("")
    const [isErrorPassword, setIsErrorPassword] = useState(false)

    const handleChange = (event: any) => {
        setSelectedWallet(event.target.value);
    };

    useEffect(() => {
        getWallets().then(
            response => {
                setWallets(response.data)
            }
        ).catch(
            error => console.log(error)
        )
        // eslint-disable-next-line
    }, [])

    const unlockWalletHandler = () => {
        unlockWallet(selectedWallet, wpassword).then(
            response => {
                if (response.status === 200) {
                    console.log(response.status)
                }
            }
        ).catch(
            error => console.log("lego", error.status)
        )
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth margin='normal'>
                <Box style={{ paddingBlock: 20, width: "40%" }}>
                    <InputLabel id="wallet Selection">Wallet</InputLabel>
                    <Select
                        labelId="wallet-selection"
                        id="wallet-selection"
                        style={{ width: "100%" }}
                        defaultValue={selectedWallet}
                        value={selectedWallet}
                        label="Wallet"
                        onChange={handleChange}
                    >
                        {wallets.map((item: any) => {
                            return <MenuItem
                                key={item.walletName}
                                value={item.walletName}>{item.walletName}</MenuItem>
                        })}
                    </Select>
                </Box>
                <div style={{ paddingBlock: 20, width: "100%" }}>
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
                </div>
                <Button
                    variant="outlined"
                    onClick={unlockWalletHandler}>Unlock</Button>
            </FormControl>
        </Box>
    );
}