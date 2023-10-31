'use client';
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  Alert,
  AlertTitle,
  Snackbar,
  Modal,
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search,
  Add,
  Delete,
  Edit,
  Refresh
} from '@mui/icons-material';
import { getUsers, deleteOneUser, deleteManyUsers } from '@utils/calls';
import { AvatarModal } from '@components/AvatarModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'lastname', headerName: 'Last name', width: 200 },
  { field: 'email', headerName: 'Email', width: 260 },
  { field: 'role', headerName: 'Role', width: 140 },
  {
    field: 'active',
    headerName: 'Active',
    width: 70,
    renderCell: (params) => (
      <Checkbox
        checked={params.value} 
      />
    ),
  },
];

export default function UserList() {
  const [updateTable, setUpdateTable] = useState(false);
  const [users, setUsers] = useState([]);
  const [cache, setCache] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [mode, setMode] = useState("edit");
  const [openAvatar, setOpenAvatar] = useState(false);
  const [userModel, setUserModel] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [openModal, setOpenModal] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  useEffect(() => {
    getUsers()
    .then(response => {
      setUsers(response);
      setCache(response);
    });
  }, [updateTable]);

  const updateNow = () => {
    setUpdateTable(!updateTable);
  };

  const addUser = () => {
    setMode("add");
    setOpenAvatar(true);
  };

  const editUser = () => {
    setMode("edit");
    if (selectedRows.length != 0) {
      setUserModel({
        id: selectedRows[selectedRows.length - 1],
      });
      setOpenAvatar(true);
    } else {
      setAlertSeverity("error");
      setAlertMessage("Please select a user to edit.");
      setAlert(true);
    }
  };

  const deleteManyHandler = async () => {
    await deleteManyUsers({id: selectedRows})
        .then(response => {
          if (response) {
            setUpdateTable(!updateTable);
            setAlertSeverity("success");
            setAlertMessage("Users deleted successfully.");
            setAlert(true);
          } else {
            setAlertSeverity("error");
            setAlertMessage("Failed to delete users.");
            setAlert(true);
          }
        });
  };

  const deleteOneHandler = async () => {
    await deleteOneUser(selectedRows[0])
        .then(response => {
          if (response) {
            setUpdateTable(!updateTable);
            setAlertSeverity("success");
            setAlertMessage("User deleted successfully.");
            setAlert(true);
          } else {
            setAlertSeverity("error");
            setAlertMessage("Failed to delete user.");
            setAlert(true);
          }
        });
  };

  const deleteUser = () => {
    if (selectedRows.length != 0) {
      if (selectedRows.length > 1) {
        setOpenModal(true);
      } else {
        setOpenModal(true); 
      }
    } else {
      setAlertSeverity("error");
      setAlertMessage("Please select a user to delete.");
      setAlert(true);
    }
  };

  const sortUsers = (name) => {
    const lowerCaseQuery = name.toLowerCase();
    const matchingItems = cache.filter((item) => {
      const fullName = `${item.name} ${item.lastname}`.toLowerCase();
      return fullName.includes(lowerCaseQuery);
    });

    setUsers(matchingItems);
  };

  const handleSelectionModelChange = (selection) => {
    setSelectedRows(selection);
  };

  return (
    <div style={{
      height: '500px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRadius: '5px',
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
      marginBottom: '2rem',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '15px',
        borderBottom: '1px solid #e0e0e0'
      }}
      >
        <Button
          variant="contained"
          style={{
            background: 'transparent',
            border: '1px solid #3f51b5',
            color: '#3f51b5',
            marginRight: '18px'
          }}
          onClick={updateNow}
        >
          <Refresh/>
        </Button>
        <Button
          variant="contained"
          style={{ 
            background: '#3f51b5',
            marginRight: '18px'
          }}
          onClick={addUser}
        >
          <Add/>
        </Button>
        <Button
          variant="contained"
          style={{ 
            background: '#3f51b5',
            marginRight: '18px'
          }}
          onClick={editUser}
        >
          <Edit/>
        </Button>
        <Button
          variant="contained"
          style={{
            background: '#f44336',
            marginRight: '18px'
          }}
          onClick={deleteUser}
        >
          <Delete/>
        </Button>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        borderBottom: '1px solid #e0e0e0',
      }}
      >
        <h3
          style={{ paddingRight: '15px' }}
        >
          <Search style={{fontSize: '35px'}}/>
        </h3>
        <TextField
          //Make height of text field narrower
          style={{ width: '100%' }}
          label="Search"
          id="outlined-required"
          variant="outlined"
          onChange={
            (e) => {
              if (e.target.value != "") {
                sortUsers(e.target.value);
              } else {
                setUsers(cache);
              }
            }
          }
        />
      </div>  
      <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize: '18px',
          },
          '& .MuiDataGrid-cell': {
            color: 'rgba(0, 0, 0, 0.87)',
          },

        }}
        rows={users}
        columns={columns}
        onRowSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectedRows}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <AvatarModal
        open={openAvatar}
        setOpen={setOpenAvatar}
        updateNow={updateNow}
        mode={mode}
        userModel={userModel}
        setUserModel={setUserModel}
        updateTable={updateTable}
        setUpdateTable={setUpdateTable}
      />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {
            selectedRows.length > 1 ?
            <h3>Are you sure you want to delete {selectedRows.length} users?</h3> :
            <h3>Are you sure you want to delete this user?</h3>
          }
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '1rem',
          }}
          >
            <Button
              variant="contained"
              style={{ 
                background: '#3f51b5',
                marginRight: '18px'
              }}
              onClick={() => {
                if (selectedRows.length > 1) {
                  deleteManyHandler();
                } else {
                  deleteOneHandler();
                }
                setOpenModal(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              style={{ 
                background: '#f44336',
                marginRight: '18px'
              }}
              onClick={() => {
                setOpenModal(false);
              }}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
      <Snackbar 
        open={alert} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
      >
          <Alert 
            onClose={handleCloseAlert} 
            severity={alertSeverity}
            sx={{ width: '100%' }}
          >
            <AlertTitle>{
              alertSeverity == "success" ?
              "Success" : "Error"
              }</AlertTitle>
            {alertMessage}
          </Alert>
      </Snackbar>
    </div>
  )
}