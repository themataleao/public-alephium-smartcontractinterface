import Grid from '@mui/material/Grid';
import WalletSelection from '../Components/WalletSelection';
import ExistingWallets from '../Components/ExistingWallets';


export default function MiddleGrid() {
    return (
        <Grid item xs={12} style={{ width: "50vw" }}>
            <ExistingWallets></ExistingWallets>
            <WalletSelection></WalletSelection>
        </Grid>
    )
}