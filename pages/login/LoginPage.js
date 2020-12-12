import { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';


import { loginWithEmail } from '../../firebase/client';

import Logo from '../../components/Logo'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from '../../styles/Login.styles';

const useStyles = makeStyles(styles);

const LoginPage = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [userState, setUserState] = useState({
        email: undefined,
        password: undefined,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback(
        (event) => {
            const { target: { value, id } } = event;
            setUserState(prevState => ({
                ...prevState,
                [id]: value,
            }))
        }, [setUserState]
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            if (userState.email && userState.password) {
                setIsLoading(true);
                loginWithEmail(userState.email, userState.password)
                    .then(() => {
                        setIsLoading(false)
                        enqueueSnackbar('Login correcto', {
                            variant: 'success',
                            autoHideDuration: 3000,
                        });
                    })
                    .catch((error) => {
                        const { message } = error;
                        enqueueSnackbar(`Error de autenticación: ${message || 'desconocido'}`, {
                            variant: 'error',
                            autoHideDuration: 3000,
                        });
                    });
            }
        }, [userState, setIsLoading]
    );

    return (
        <Grid
            className={classes.container}
            container
            spacing={1}
        >
            <div className={classes.logo}>
                <Logo />
            </div>
            <Grid
                container
                item
                xs={12}
                spacing={3}
                className={classes.form}
            >
                <Grid
                    item xs={12}
                    className={classes.textfield}
                >
                    <TextField
                        id="email"
                        label="Correo"
                        variant="outlined"
                        onChange={handleChange}
                        className={classes.root}
                    />
                </Grid>
                <Grid
                    item xs={12}
                >
                    <TextField
                        id="password"
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        onChange={handleChange}
                        className={classes.root}
                    />
                </Grid>
                <Grid
                    item xs={12}
                    className={classes.button}
                >
                    {
                        isLoading ? (
                            <CircularProgress />
                        )
                            :
                            (<Button
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Log In
                            </Button>)
                    }

                </Grid>
            </Grid>
        </Grid >
    )
}

export default LoginPage;