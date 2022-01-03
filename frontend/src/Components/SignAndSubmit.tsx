import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { signContract } from './api-calls';
import { Context } from '../State/Store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { TypeWalletBuild, TypeUnsignedTransaction } from '../State/Types';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupIcon from '@mui/icons-material/Group';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { typographyStyle } from './style';


export default function SignAndSubmit() {
    const [helperText, setHelperText] = useState("")
    const [isError, setIsError] = useState(false)
    const [state, dispatch] = useContext(Context);

    const handleContractSubmit = (wallet: TypeWalletBuild, unsignedTransaction: TypeUnsignedTransaction) => {
        signContract(wallet, unsignedTransaction).then((response) => {
            if (response.status === 200) {
                setIsError(false)
                setHelperText("contract successfully signed and submitted!")
                dispatch({ type: 'SET_TRANSACTION', payload: response.data })
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
        <Box display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' >
                <Box display='flex' flexDirection='column' width={'100%'} alignItems={"center"}>
                    <List>
                        <ListItem>
                            <ListItemIcon><HistoryEduIcon /></ListItemIcon>
                            <ListItemText
                                primary={`unsigned-transaction: ${state.unsignedContractTransaction.unsignedTx}`}
                                primaryTypographyProps={typographyStyle} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StickyNote2Icon /></ListItemIcon>
                            <ListItemText
                                primary={`contract-id: ${state.unsignedContractTransaction.contractId}`}
                                primaryTypographyProps={typographyStyle} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PeopleOutlineIcon /></ListItemIcon>
                            <ListItemText
                                primary={`from-group: ${state.unsignedContractTransaction.fromGroup}`}
                                primaryTypographyProps={typographyStyle} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><GroupIcon /></ListItemIcon>
                            <ListItemText
                                primary={`to-group: ${state.unsignedContractTransaction.toGroup}`}
                                primaryTypographyProps={typographyStyle} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><QrCodeIcon /></ListItemIcon>
                            <ListItemText
                                primary={`hash: ${state.unsignedContractTransaction.hash}`}
                                primaryTypographyProps={typographyStyle} />
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box sx={{ py: 2 }}>
                <Button
                    variant='outlined'
                    onClick={() => handleContractSubmit(state.selectedWallet, state.unsignedContractTransaction)}>sign and submit</Button>
            </Box>
            <Typography variant="caption" display="block" gutterBottom color={isError ? "error" : ""}>
                {helperText}
            </Typography>
        </Box>
    )
}