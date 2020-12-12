import { makeStyles } from '@material-ui/core/styles';

import Login from './login';

import Grid from '@material-ui/core/Grid';

import styles from '../styles/styles';

const useStyles = makeStyles(styles);

export default function Home() {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Login />
    </Grid>
  )
}
