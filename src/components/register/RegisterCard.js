import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../utilities/Logo';



const theme = createTheme();

const RegisterCard = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{padding: '1rem'}}>
        <Logo />
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {props.children}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
  export default React.memo(RegisterCard)