import React, { createContext, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Theme } from '@material-ui/core/styles';

//material UI IMPORTS
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@mui/styles';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { withTheme } from '../Theme';

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: { paddingTop: theme.spacing(2) },
  },
}));

const classes = useStyles();
const theme = useTheme;
const matches = useMediaQuery(theme.breakpoints.down('xs'));

const toggleTheme = () => {
  setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
};

export const ThemeContext = createContext(null);
// Import MUI stuff

const App = () => {
  const [user, setUser] = useState({});
  //const [theme, setTheme] = React.useState("light");

  const classes = useStyles();
  const theme = useTheme;
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
};
//   <Grid
//   className={classes.root}
//   container
//   justify="center"
//   alignItems={matches ? "flex-start" : "center"}
// >
//   <Grid item>
//     <Paper elevation={8}></Paper>
//   </Grid>
