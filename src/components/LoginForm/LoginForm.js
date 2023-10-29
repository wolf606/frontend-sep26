import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Snackbar, Alert as MuiAlert } from '@mui/material';
import React, { useState } from "react";
import { logIn, getMe } from '@utils/calls';
import styled from '@emotion/styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 75,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginForm({ setOpen }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = {};

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const validations = () => {
    if (!password.trim()) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
  }

  const btnHandler = async () => {
    validations();
    const errorMessagesArray = Object.values(errors);
    console.log("Validation errors: ", errorMessagesArray);
    if (errorMessagesArray.length > 0) {
      setErrorMessages(errorMessagesArray);
      setOpenSnackbar(true);
    } else {
      const payload = {
        email: email,
        password: password
      };
      console.log("payload: ", payload);
      await logIn(payload);
      //const me = await getMe();
      //console.log("me: ", me);
    }
  };

  const styledBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '450px',
    height: '460px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    margin: 'auto',
    padding: '50px',
    display: 'flex',
  }
  
  return (

    <Box
      component="form"
      sx={styledBox}
      autoComplete="off"
    >
      <div>
        
        <h1 style={{
          textAlign: 'center',
          marginBottom: '25px',
          fontSize: '2rem',
        }}
        >LogIn</h1>

        <div>
          <h3 style={{
              marginBottom: '10px'
          }}
          >Email</h3>
          <TextField
            style={{
                width: '100%',
                marginBottom: '25px',
            }}
            required
            id="outlined-required"
            label="Required"
            onChange={
              (e) => {
                setEmail(e.target.value);
              }
            }
          />
        </div>
        <div>
          <h3 style={{
              marginBottom: '10px'
          }}
          >Password</h3>
          <TextField
            required
            id="outlined-password-input"
            label="Required"
            type='password'
            autoComplete="current-password"
            onChange={
              (e) => {
                setPassword(e.target.value);
              }
            }
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
          width: '100%',
          height: '3rem',
          border: 'none',
          color: '#fff',
          cursor: 'pointer'
        }}>
        <Button 
          variant="contained" 
          onClick={btnHandler}
          style={{
            backgroundColor: '#3f51b5',
            color: '#fff',
            width: '100%',
            height: '3rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >Iniciar Sesion</Button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleCloseSnackbar}
      >
        <div>
          {errorMessages.map((message, index) => (
            <MuiAlert
              key={index}
              elevation={6}
              variant="filled"
              severity="error"
              onClose={handleCloseSnackbar}
            >
              {message}
            </MuiAlert>
          ))}
        </div>
      </Snackbar>
    </div>

    </Box >
  )
}