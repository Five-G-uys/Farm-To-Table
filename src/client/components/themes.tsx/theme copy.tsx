import React, { Component, createContext } from "react";
import { ThemeProvider, createMuiTheme } from "@emotion/ui/react/styles";
import { createTheme, Theme } from "@material-ui/core/styles";

//material UI IMPORTS
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@mui/styles";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withTheme } from "../Them";

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("xs")]: { paddingTop: theme.spacing(2) },
  },
}));

const classes = useStyles();
const theme = createMuiTheme({
  palette: {
    
  }
})
const matches = useMediaQuery(theme.breakpoints.down("xs"));

const toggleTheme = () => {
  setTheme((curr) => (curr === "light" ? "dark" : "light"));
};

export const ThemeContext = createContext(null);
// Import MUI stuff

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const classes = useStyles();
//const theme = useTheme;
const matches = useMediaQuery(theme.breakpoints.down("xs"));

const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
});

const Theme = (props) => {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const withTheme = (Component) => {
  return (props) => {
    return (<Theme>
      <Component {...props}/>
    </Theme>)
  }
}



//   <Grid
//   className={classes.root}
//   container
//   justify="center"
//   alignItems={matches ? "flex-start" : "center"}
// >
//   <Grid item>
//     <Paper elevation={8}></Paper>
//   </Grid>

// const toggleTheme = () => {
//   setTheme((curr) => (curr === "light" ? "dark" : "light"));
// };
