import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


export default function WalletSelection() {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">RUST</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    label="Amount"
                />

            </FormControl>


        </Box>
    )
}