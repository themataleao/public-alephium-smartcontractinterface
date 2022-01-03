import Grid from '@mui/material/Grid';
import SmartContractBuilder from '../Components/SmartContractBuilder';
import ExistingWallets from '../Components/ExistingWallets';
import BuildContract from '../Components/BuildContract';
import SignAndSubmit from '../Components/SignAndSubmit';
import ContractTransaction from '../Components/ContractTransaction';


export default function MiddleGrid() {
    return (
        <Grid item xs={12} style={{ width: "90vw" }}>
            <ExistingWallets></ExistingWallets>
            <SmartContractBuilder></SmartContractBuilder>
            <BuildContract></BuildContract>
            <SignAndSubmit></SignAndSubmit>
            <ContractTransaction></ContractTransaction>
        </Grid>
    )
}