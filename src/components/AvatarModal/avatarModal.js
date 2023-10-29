import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Label from '@mui/material/FormLabel';
import "./style.css"


export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ModalStyle}>

                    <div className='avatar-container'>
                        <Avatar src="/src/Img/RicardoColor5.jpg" />
                        <Label>Avatar</Label>
                    </div>

                    <div className='container'>
                        <div className='name-container'>

                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value);
                                    }
                                }
                            />
                        </div>
                        <div className='lastname-container'>
                            <TextField
                                required
                                id="outlined-required"
                                label="Last Name"
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value);
                                    }
                                }
                            />
                        </div>
                    </div>

                    <div className='field-container'>

                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            onChange={
                                (e) => {
                                    setEmail(e.target.value);
                                }
                            }
                        />
                    </div>

                    <div className='field-container'>
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type='password'
                            autoComplete="current-password"
                            onChange={
                                (e) => {
                                    setPassword(e.target.value);
                                }
                            }
                        />
                    </div>

                    <div className='button-container'>
                        <Button variant="contained" >Add User</Button>
                    </div>


                </Box>

            </Modal>
        </div >
    );
}

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

