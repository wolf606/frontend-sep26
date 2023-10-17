'use client';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers } from '@utils/calls';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'lastname', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'active', headerName: 'Active', width: 70 },
    { field: 'role', headerName: 'Role', width: 70 },
  ];

export default function UserList({updateTable}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
        .then(response => {
            console.log("Response: ", response);
          setUsers(response);
        });
      }, [updateTable]);
    

    return (
        <div style={{ height: 400, width: 800, background: 'white' }}>
      <DataGrid
        rows={users}
        columns={columns}
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