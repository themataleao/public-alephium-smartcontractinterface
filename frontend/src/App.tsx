import Grid from '@mui/material/Grid';
import MiddleGrid from './Layout/MiddleGrid';
import Header from './Layout/Header';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Store from './State/Store';
import './App.css';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const headerTheme = createTheme({
  palette: {
    primary: {
      main: '#d8d8d8'
    }
  }
})

const middleTheme = createTheme({

})


function App() {
  return (
    <Store>
      <div className="App">
        <Box>
          <ThemeProvider theme={headerTheme}>
            <Header></Header>
          </ThemeProvider>
          <ThemeProvider theme={middleTheme}>
            <Grid
              container
              direction='column'
              alignItems='center'
              justifyContent='center'
              style={{ minHeight: '100vh' }}>
              <MiddleGrid></MiddleGrid>
            </Grid>
          </ThemeProvider>
        </Box>
      </div>
    </Store>
  );
}

export default App;
