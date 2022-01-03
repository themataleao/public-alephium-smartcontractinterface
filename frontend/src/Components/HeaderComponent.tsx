import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    header: {
        background: 'linear-gradient(45deg, #202126 20%, #743956 80%)',
    },
});

export default function HeaderComponent() {
    const classes = useStyles();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <img alt='alephium-icon' width={'50vh'} src={"/static/alephium-icon.png"}></img>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="common.white">
                        Alephium Smart Contract Builder
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}