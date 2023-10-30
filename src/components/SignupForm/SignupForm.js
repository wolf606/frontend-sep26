import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, Button, Snackbar, Alert as MuiAlert } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import { logIn, signUp } from '@utils/calls';
import { redirect } from 'next/navigation';

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

export default function SignupForm({setOpen}) {
  const [agree, setAgree] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwdAgain, setPwdAgain] = useState("");
  const errors = {};

  const handleOpen = () => {
    setOpenM(true);
  };
  const handleClose = () => {
    setOpenM(false);
  };

  const checkboxHandler = () => {
    setAgree(!agree);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const validations = () => {

    /* Regex to validate emails */
    const regex = /* /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/ *//^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      errors.name = 'User name is required'
    }

    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (regex.test(email)) {
      console.log("Email address is invalid")
    } else if (!regex.test(email) || email !== '') {
      errors.email = 'Email address is invalid'
    }

    if (!password.trim()) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    if (password !== pwdAgain) {
      errors.pwdAgain = 'Passwords do not match'
    }
  }

  const btnHandler = async () => {
    if (!agree) {
      handleOpen();
    } else {
      validations();
      const errorMessagesArray = Object.values(errors);
      console.log("Validation errors: ", errorMessagesArray);
      if (errorMessagesArray.length > 0) {
        setErrorMessages(errorMessagesArray);
        setOpenSnackbar(true);
      } else {
        const payload = {
          name: name,
          lastname: lastname,
          email: email,
          password: password
        };
        console.log("payload: ", payload)
        await signUp(payload);
        await logIn(payload);
        redirect('/dashboard');
      }
    }
  };

  const styledBox = {
    position: 'absolute',
    top: '550px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '450px',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    margin: 'auto',
    padding: '50px',
    display: 'flex',
  }

  return (

    <Box
      component="form"
      sx={ styledBox }
      autoComplete="off"
    >
      <div>

        <h1 style={{
          textAlign: 'center',
          marginBottom: '25px',
          fontSize: '2rem',
        }}
        >SignUp</h1>

        <div>
          <h3 style={{
            marginBottom: '10px'
          }}
          >Name</h3>
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
                setName(e.target.value);
              }
            }
          />
        </div>
        <div>
          <h3 style={{
            marginBottom: '10px'
          }}
          >Lastname</h3>
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
                setLastname(e.target.value);
              }
            }
          />
        </div>
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
            style={{
              width: '100%',
              marginBottom: '25px',
            }}
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
        <div>
          <h3 style={{
            marginBottom: '10px'
          }}
          >Password again</h3>
          <TextField
            style={{
              width: '100%',
              marginBottom: '25px',
            }}
            required
            id="outlined-password-input"
            label="Required"
            type='password'
            onChange={
              (e) => {
                setPwdAgain(e.target.value);
              }
            }
          />
        </div>
        <div style={{ 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', 
          marginBottom: '25px',
          width: '100%',
          margin: '10px'
        }}
        >
          <FormControlLabel control={<Checkbox onClick={checkboxHandler} />} />
          <Typography color="black">Acepto los</Typography>
          <Typography 
            color="blue"
            onClick={() => {
              setOpen(true);
            }}
            style={{ 
              marginLeft: '10px',
              cursor: 'pointer'
            }}>Terminos y Condiciones</Typography>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '15px',
          width: '100%',
          height: '3rem',
          border: 'none',
          cursor: 'pointer'
        }}
        >
          <Button
            variant="contained"
            onClick={btnHandler}
            style={{
              backgroundColor: '#3f51b5',
              color: '#fff',
              width: '100%',
              height: '3rem',
              border: 'none',
              cursor: 'pointer',
              marginRight: '15px'
            }}
          >Registrarse</Button>

          <Button
            style={{
              backgroundColor: 'transparent',
              color: '#3f51b5',
              width: '100%',
              height: '3rem',
              border: '2px solid #3f51b5',
              cursor: 'pointer'
            }}
          >Cancelar</Button>
        </div>

        <Modal
          open={openM}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: '750px' }}>
            <h2 id="parent-modal-title">Terminos y Condiciones</h2>
            <p id="parent-modal-description">
              Debes aceptar los terminos y condiciones
            </p>
            <Button 
              onClick={handleClose}
              style={{
                backgroundColor: '#3f51b5',
                color: '#fff',
                width: '100%',
                height: '3rem',
                border: 'none',
                cursor: 'pointer',
                marginRight: '15px'
              }}
            >Cerrar</Button>
          </Box>

        </Modal>
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
    </Box>
  )
}