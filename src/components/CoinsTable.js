import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import  {makeStyles}  from "@mui/styles";
//import Pagination from "@mui/material/Pagination";
//import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme } from '@mui/material';
import {Container, Typography} from '@mui/material';

import { useNavigate } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      //color: "#FFFFFF",
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
  })
)

  
const CoinsTable = () => {
   
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

  const navigate = useNavigate();

    const {currency, symbol, coins, loading, fetchCoins} = CryptoState();
      
      
    const darkTheme = createTheme({
      palette: {
        primary: {
          main: "#fff",
        },
        type: "dark",
      },
    });
  

    

    useEffect(() =>{
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

    
      //  const useStyles = makeStyles({

      //  });

        const classes = useStyles();
      
    
    
  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%", backgroundColor: "white", borderRadius: "5px"  }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D", fontSize: 30}}>
                    <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                        fontSize: 18
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                    </TableRow>
                </TableHead>

                  <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                     return (
                       <TableRow
                         onClick={() => navigate(`/coins/${row.id}`)}
                         className={classes.row}
                         key={row.name}
                       >
                         <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            color: "white"
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                           <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "white"
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "white" }}>
                              {row.name}
                            </span>
                          </div>
                          </TableCell>
                          <TableCell align="right" style={{ color: "white", fontSize: 16 }}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            fontSize: 16
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "white", fontSize: 16  }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                       </TableRow>
                     );
                })}
                </TableBody>  
              </Table>
          )}
          </TableContainer>

          <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            //backgroundColor: "gold"
          }}
           classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />

        </Container>

    </ThemeProvider>
  )
}

export default CoinsTable
