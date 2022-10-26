import { Container, createTheme, LinearProgress,Paper , Table, TableContainer, TableHead, TableRow, TableCell, ThemeProvider, Typography, TableBody, makeStyles } from '@material-ui/core';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CoinList} from  '../config/api';
import {CryptoState} from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';



const useStyles = makeStyles(()=> ({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },

}));

const CoinTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)

    const { currency , symbol } = CryptoState();

    
    
    const classes = useStyles()


    const navigate = useNavigate()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    console.log(coins)

    useEffect(()=>{
        fetchCoins()
    },[currency]);

    const darkTheme = createTheme({
        palette: {
            main: "#fff",
        },
        type: "dark"
    });

    const handleSearch = () =>{
         return coins.filter((coin)=>
             coin.name.toLowerCase().includes(search.toLowerCase()) ||
             coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
    }

  return (
    <ThemeProvider theme = {darkTheme} >   
    <Container style={{ textAlign: "center"}}>
        <Typography 
        variant='h4'
        style={{ margin: 18, fontFamily: "Montserrat"}}
        >
        Cryptocurrency Prices by Market Cap
        </Typography>

        <input 
        placeholder=' Search For a Crypto Currency..'
        style={{ marginBottom: 20,
            fontFamily: "Montserrat",
            height: "40px", 
            width: "100%", 
            color: "white", 
            background: "transparent", 
            border: "0.5px solid grey" }}
        onChange = {(e) => setSearch(e.target.value)}
        />
       <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                        align: "space-between"
                      }}
                      key={head}
                     
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            
            <TableBody>
            {handleSearch()
            .slice((page-1)*10, page*10)
            .map(row =>{
                const profit = row.price_change_percentage_24h > 0
                return (
                    <TableRow
                    onClick = {()=> navigate(`/coins/${row.id}`)}
                   className = {classes.row}
                   key = {row.name}
                    >
                    <TableCell
                    component = "th"
                    scope = "row"
                    styles = {{
                        display: "flex",
                        gap: 15,
                    }}
                    >         
                    <img
                    src = {row?.image}
                    alt = {row.name}
                    height = "50"
                    style = {{ marginBottom: 10}}
                    />        
                    <div style={{
                        display: "flex", flexDirection: "column"
                    }}>
                    <span style={{
                        textTransform: "uppercase",
                        fontSize: 22,
                        color : "white"
                    }}>
                        {row.symbol}

                    </span>
                    <span style = {{
                        color: "darkgrey"
                    }}
                    >{row.name}</span>

                    </div>
                    </TableCell>
                    <TableCell style ={{color: "white", fontSize: 22,}}>
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                    style = {{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                        fontSize: 22,
                    }}
                    >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell style ={{color: "white", fontSize: 22}}
                    > {symbol}{" "}
                        {numberWithCommas(row.market_cap.toString().slice(0, -6)
                        )}M
                    </TableCell>
                    </TableRow>
                );
            })}
            </TableBody>
           </Table>
          )
                }
        </TableContainer>
        <Pagination count={(handleSearch()?.length/10).toFixed(0)} 
        style = {{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center"
        }}
        classes = {{ ul: classes.pagination }}
        onChange = {(_, value) => {
            setPage(value);
            window.scroll(0, 450)
        }}
        />
        
    </Container>
    </ThemeProvider>
  )
}

export default CoinTable
