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

    const handleChange = (event: any) => {
        setSelectedWallet(event.target.value);
    };

    useEffect(() => {
        getWallets().then(
            response => {
                console.log("here we are: ", response.data)
                setWallets(response.data)
            }
        ).catch(
            error => console.log(error)
        )
        // eslint-disable-next-line
    }, [])

    return (
        <Box sx={{ minWidth: 120 }} padding={2}>
            <FormControl fullWidth margin='normal'>
                <InputLabel id="wallet Selection">Wallet</InputLabel>
                <Select
                    labelId="wallet-selection"
                    id="wallet-selection"
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
                <TextField
                    error
                    id="outlined-error"
                    label="Error"
                    onChange={(event) => setWpassword(event.target.value)}
                    defaultValue="Password"
                    value={wpassword}
                />
                <Button
                    variant="outlined"
                    onClick={() => unlockWallet(selectedWallet, wpassword)}>Unlock</Button>
            </FormControl>
        </Box>
    );
}