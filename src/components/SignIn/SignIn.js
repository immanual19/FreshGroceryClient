import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './SignIn.css';
import { Link } from "react-router-dom";
if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const history=useHistory();
  const location=useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
const classes = useStyles();
const handleFbSignIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    const getUserInfo=localStorage.getItem('freshGroceryUser');
    const parsedGetUserInfo=JSON.parse(getUserInfo);
    parsedGetUserInfo.name=user.displayName;
    parsedGetUserInfo.email=user.email;
    parsedGetUserInfo.isSignedIn=true;
    localStorage.setItem('freshGroceryUser',JSON.stringify(parsedGetUserInfo));
    
   
    history.replace(from);
    window.location.reload();
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
}
const handleGoogleSignIn=()=>{
    const gProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(gProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    const getUserInfo=localStorage.getItem('freshGroceryUser');
    const parsedGetUserInfo=JSON.parse(getUserInfo);
    parsedGetUserInfo.name=user.displayName;
    parsedGetUserInfo.email=user.email;
    parsedGetUserInfo.isSignedIn=true;
    localStorage.setItem('freshGroceryUser',JSON.stringify(parsedGetUserInfo));
    //window.location.reload();
    history.replace(from);
    window.location.reload();
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <br/>
      <p style={{textAlign:'center', color:'lightgray',fontSize:'20px'}}>Or</p>
      
      <p onClick={handleFbSignIn} className="SignInWithFb"><FontAwesomeIcon icon={faFacebook} /> Sign in with Facebook</p>
        
        <p onClick={handleGoogleSignIn} className="SignInWithGoogle"><FontAwesomeIcon icon={faGoogle} /> Sign in with Google</p>
    </Container>
  );
}