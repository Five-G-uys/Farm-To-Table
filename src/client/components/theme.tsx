// Import Dependencies
import { createContext, useState } from 'react';

//material UI IMPORTS
import { makeStyles } from '@mui/styles';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
