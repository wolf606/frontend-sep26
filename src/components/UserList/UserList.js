'use client';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers } from '@utils/calls';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'lastname', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'active', headerName: 'Active', width: 70 },
  { field: 'role', headerName: 'Role', width: 70 },
  { field: 'actions', headerName: 'Actions', width: 70 },

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
    <div style={{ width: 800, background: 'white' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '.5rem' }}>
        <h3
          style={{ paddingRight: '.5rem' }}
        >Names:</h3>
        <TextField
          required
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