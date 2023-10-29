'use client';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers } from '@utils/calls';
import SearchIcon  from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'lastname', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'active', headerName: 'Active', width: 70 },
  { field: 'role', headerName: 'Role', width: 70 },
  { 
    field: 'Edit',
    renderCell(cellValues) {
      return (
        <Button
          variant="contained"
          style={{ 
            background: '#3f51b5'
          }}
          onClick={(event) => {
            console.log("Edit: ", cellValues);
          }}
        >
          <EditIcon/>
        </Button>
      );
    }
  },
  { 
    field: 'Delete',
    renderCell(cellValues) {
      return (
        <Button
          variant="contained"
          style={{ 
            background: 'red'
          }}
          onClick={(event) => {
            console.log("Delete: ", cellValues);
          }}
        >
          <DeleteIcon/>
        </Button>
      );
    }
  },

];

export default function UserList({ updateTable, selectedRows, setSelectedRows }) {
  const [users, setUsers] = useState([]);
  const [cache, setCache] = useState([]);

  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response);
        setCache(response);
      });
  }, [updateTable]);

  const sortUsers = (name) => {
    const lowerCaseQuery = name.toLowerCase();

    // Use the filter method to find matches in the array
    const matchingItems = cache.filter((item) => {
      // Concatenate the "name" and "lastname" properties and convert to lowercase
      const fullName = `${item.name} ${item.lastname}`.toLowerCase();

      // Check if the fullName contains the search query
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
      alignContent: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '5px',
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
      marginBottom: '2rem',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px'
      }}
      >
        <h3
          style={{ paddingRight: '15px' }}
        >
          <SearchIcon style={{fontSize: '35px'}}>
          </SearchIcon>
        </h3>
        <TextField
          style={{ width: '100%' }}
          label="Search"
          id="outlined-required"
          onChange={
            (e) => {
              console.log("name: ", e.target.value);
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

    </div>
  )
}