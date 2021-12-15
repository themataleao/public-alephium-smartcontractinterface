import Grid from '@mui/material/Grid';
import WalletSelection from '../Components/WalletSelection'


export default function MiddleGrid() {
    return (
        <Grid xs={12} style={{ width: "50vw" }}>
            <WalletSelection></WalletSelection>
        </Grid>
    )
}