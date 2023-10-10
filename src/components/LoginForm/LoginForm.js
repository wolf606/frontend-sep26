import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Snackbar, Alert as MuiAlert } from '@mui/material';
import React, { useState } from "react";
import { logIn, getMe } from '@utils/calls';

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

export default function LoginForm({setOpen}) {
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
    if(!password.trim()){
      errors.password = 'Password is required'
    }else if(password.length < 6){
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
      const me = await getMe();
      console.log("me: ", me);
    }
  };
    return (
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': 
        { 
            m: 1, 
            width: '25ch',
        },
        backgroundColor: 'white',
        justifyContent: 'center',
        width: 'fit-content',
        padding: '1rem'
      }}
      autoComplete="off"
    >
      <div>
        <h3>Email</h3>
        <TextField
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
        <h3>Password</h3>
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
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      <Button variant="contained" onClick={btnHandler} >Iniciar Sesion</Button>
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
    </Box>
    )
}