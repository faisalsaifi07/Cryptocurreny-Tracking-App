import { AppBar, Toolbar,MenuItem,Select, Container, Typography, makeStyles } from '@material-ui/core';
import { createTheme , ThemeProvider} from '@mui/material/styles';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {CryptoState} from '../CryptoContext'

const useStyles = makeStyles(()=> ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat ",
        fontWeight: "bold",
        cursor: "pointer"
      
        
    },
    select:{
        color: "white",
        padding: "5px"
    }
}));

export default function Header() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

  return (
    <ThemeProvider theme = {darkTheme}>
      <AppBar color='transparent' position = "static" >
        <Container>
            <Toolbar>        
      
                <Typography variant='h4' onClick = {()=> navigate('/')} className={classes.title}>Crypto App</Typography>
                <Select className={classes.select}
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 100, height: 40, marginLeft: 15 }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                >
                <MenuItem value = {"USD"}>USD</MenuItem>
                <MenuItem value = {"INR"}>INR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
  )
};
