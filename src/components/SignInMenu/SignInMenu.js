import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SignInMenu() {


  return (
    <Box sx={{
      flexGrow: 1
    }}>
      <AppBar position="static">
        <Toolbar sx={{
          color: 'white',
          background: 'linear-gradient(to right, #4275ff, #021036)',
          }}
        >
          <Typography variant="h6" component="div" sx={{
            flexGrow: 1,
          }}
          >Services
          </Typography>
          <Button
            color="inherit"
            href='/dashboard'
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            href='/login'
          >
            Login
          </Button>
          <Button
            color="inherit"
            href='/signup'
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}