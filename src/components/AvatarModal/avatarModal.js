import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {
    Box,
    Button,
    TextField,
    Modal,
    Avatar,
    Alert,
    AlertTitle,
    Snackbar,
    Select,
    MenuItem,
    Checkbox,
    Typography
} from '@mui/material';
import { 
    UploadFile,
} from '@mui/icons-material';
import { getUserSpecific, editUser, addUser, getUserAvatar } from '@utils/calls';
import "./style.css"

const roles = [
    {
        value: 'admin',
        label: 'Admin',
    },
    {
        value: 'student',
        label: 'Student',
    },
    {
        value: 'none',
        label: 'None',
    }
];

export default function AvatarModal({mode, open, setOpen, userModel, setUserModel, updateTable, setUpdateTable}) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setUpdateTable(!updateTable)
        setOpen(false);
        setUserModel({});
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert(false);
      };


    const [file, setFile] = useState(null);
    const [fileReq, setFileReq] = useState(null);
    const handleUploadClick = ()  => {
        document.getElementById('fileInput').click();
    }
    const handleUpload = (e) => {
        const file = e.target?.files?.[0];
        setFileReq(e.target?.files?.[0]);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFile(reader.result);
        }
    };
      
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
      };
    
      const handleMouseLeave = () => {
        setHover(false);
      };

    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const [cache, setCache] = useState({});
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [active, setActive] = useState(false);
    const [password, setPassword] = useState("");
    var message = "";


    async function handleEditUser() {
        var dict = {};
        if (name != cache.name) dict.name = name;
        if (lastname != cache.lastname) dict.lastname = lastname;
        if (email != cache.email) dict.email = email;
        if (password != "") dict.password = password;
        if (fileReq != null) dict.avatar = fileReq;
        dict.id = id;
        dict.role = role;
        dict.active = active;
        const res = await editUser(dict);
        if (res) {
            setSuccess(true);
            setOpen(false);
            setUpdateTable(!updateTable);
        } else {
            setSuccess(false);
        }
        message = success ? 'User edited successfully' : 'Failed to edit user';
        setAlert(true);
        setUserModel({});
    }

    async function handleAddUser() {
        const res = await addUser({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            role: role,
            avatar: fileReq,
        });
        if (res) {
            setSuccess(true);
            setOpen(false);
            setUpdateTable(!updateTable);
        } else {
            setSuccess(false);
        }
        message = success ? 'User edited successfully' : 'Failed to edit user';
        setAlert(true);
        setUserModel({});
    }

    useEffect(() => {
        setId("");
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");
        setRole("");
        setActive(false);
        setFile(null);
        setFileReq(null);
        if (Object.keys(userModel).length > 0) {
            getUserSpecific(userModel.id)
            .then(response => {
                if (response != null) {
                    setCache(response);
                    setId(response.id);
                    setName(response.name);
                    setLastname(response.lastname);
                    setEmail(response.email);
                    setRole(response.role !== undefined ? response.role : "none");
                    setActive(response.active);
                    const avatarUrl = response.avatar.url;
                    if (avatarUrl != null) {
                        getUserAvatar(avatarUrl)
                        .then(response => {
                            if (response != null) {
                                setFile(response);
                            }
                        });
                    }
                }

            });
        }
      }, [open]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={ModalStyle}>

                    <div>
                        <Typography variant='h5'>
                            {mode == "edit" ? "Edit User" : "Add User"}
                        </Typography>   
                    </div>

                    <div className='avatar-container'>
                        <Avatar
                            sx={{ width: 100, height: 100, cursor: 'pointer' }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleUploadClick}
                        >
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleUpload}
                            />
                            {hover ? (
                                <div style={
                                    {
                                        position: 'relative',
                                    }
                                }>
                                <UploadFile
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                                {
                                    file != null ? (
                                        <Image
                                            src={file}
                                            alt="Picture of the author"
                                            width={150}
                                            height={150}
                                            style={
                                                {
                                                    opacity: '0.1',
                                                    objectFit: 'cover'
                                                }
                                            }
                                        />
                                    ) : (
                                        <div></div>
                                    )
                                }
                                </div>
                            ) : (
                                <div>
                                    {
                                    file != null ? (
                                        <Image
                                            src={file}
                                            alt="Picture of the author"
                                            width={150}
                                            height={150}
                                            style={
                                                {
                                                    objectFit: 'cover'
                                                }
                                            }
                                        />
                                    ) : (
                                        <Typography>{
                                            name != "" ? name[0] : "New user"    
                                            }</Typography>
                                    )
                                }
                                </div>
                            )}
                        </Avatar>
                    </div>
                    <div className='container'>
                        <div className='name-container'>
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                value={name}
                                onChange={
                                    (e) => {
                                        setName(e.target.value);
                                    }
                                }
                            />
                        </div>
                        <div className='lastname-container'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Last Name"
                                    value={lastname}
                                    onChange={
                                        (e) => {
                                            setLastname(e.target.value);
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
                            value={email}
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
                            onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                            }
                        />
                    </div>
                    
                
                    {
                        mode == "edit" ? (
                            <div className='field-container'>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Role"
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                >
                                    {roles.map((role, index) => (
                                        <MenuItem key={index} value={role.value}>{role.label}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                    
                    {/* check mode is edit and userModel is not {} */}
                    {mode == "edit" && Object.keys(userModel).length > 0 ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: '15px'
                        }}>
                            <Checkbox
                                checked={active}
                                onChange={(e) => {
                                    setActive(e.target.checked);
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography>Active</Typography>
                        </div>
                        ) : (
                            <div></div>
                        )}

                    <div className='button-container'>
                        {mode == "edit" ? (
                            <Button 
                                variant="contained" 
                                onClick={handleEditUser}
                            >Edit User</Button>
                        ) : 
                        (
                            <Button variant="contained" 
                                onClick={handleAddUser}
                            >Add User</Button>
                        )}
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                    </Box>
            </Modal>
            <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert severity={success ? 'success' : 'error'} onClose={handleCloseAlert}>
                <AlertTitle>{success ? 'Success' : 'Error'}</AlertTitle>
                {message}
            </Alert>
            </Snackbar>
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

