import Grid from '@mui/material/Grid';
import SmartContractSection from '../Components/SmartContractSection';
import ExistingWallets from '../Components/ExistingWallets';


export default function MiddleGrid() {
    return (
        <Grid item xs={12} style={{ width: "90vw" }}>
            <ExistingWallets></ExistingWallets>
            <SmartContractSection></SmartContractSection>
        </Grid>
    )
}