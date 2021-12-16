import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function HeaderComponent() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img alt='alephium-icon' width={'50vh'} src={"/static/alephium-icon.png"}></img>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Alephium Smart Contract Builder
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}