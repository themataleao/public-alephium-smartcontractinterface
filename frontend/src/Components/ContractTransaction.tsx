import { useContext } from 'react';
import Box from '@mui/material/Box';
import { Context } from '../State/Store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { typographyStyle } from './style';


export default function ContractTransaction() {
    const [state,] = useContext(Context);

    return (
        < Box display='flex' flexDirection='column' width={'100%'} alignItems={"center"} >
            <List>
                <ListItem>
                    <ListItemIcon><ReceiptIcon /></ListItemIcon >
                    <ListItemText primary={`transaction-id: ${state.completedTransaction.txId}`} />
                </ListItem>
                <ListItem>
                    <ListItemIcon><PeopleOutlineIcon /></ListItemIcon>
                    <ListItemText
                        primary={`from-group: ${state.completedTransaction.fromGroup}`}
                        primaryTypographyProps={typographyStyle} />
                </ListItem>
                <ListItem>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText
                        primary={`to-group: ${state.completedTransaction.toGroup}`}
                        primaryTypographyProps={typographyStyle} />
                </ListItem>
            </List>
        </Box>
    )
}