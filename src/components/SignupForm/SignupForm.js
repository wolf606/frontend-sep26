import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";

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

export default function SignupForm({setOpen}) {
  const [agree, setAgree] = useState(false);
  const [openM, setOpenM] = useState(false);

  const handleOpen = () => {
    setOpenM(true);
  };
  const handleClose = () => {
    setOpenM(false);
  };

  const checkboxHandler = () => {
    setAgree(!agree);
  }
  const btnHandler = () => {
    if (!agree) {
      handleOpen();
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
        <h3>Name</h3>
        <TextField
          required
          id="outlined-required"
          label="Required"
        />
      </div>
      <div>
        <h3>Email</h3>
        <TextField
          required
          id="outlined-required"
          label="Required"
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
        />
      </div>
      <div>
        <h3>Password again</h3>
        <TextField
          required
          id="outlined-password-input"
          label="Required"
          type='password'
        />
      </div>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <FormControlLabel control={<Checkbox onClick={checkboxHandler}/>} />
        <Typography color="black">Acepto los</Typography>
        <Typography color="blue" onClick={setOpen} style={{marginLeft:'0.25rem',cursor:'pointer'}}>Terminos y Condiciones  </Typography>
      </div>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      <Button variant="contained" onClick={btnHandler} >Registrarse</Button>
      <Button variant="outlined">Cancelar</Button>
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
              <Button onClick={handleClose}>Cerrar</Button>
          </Box>
      </Modal>
    </Box>
    )
}