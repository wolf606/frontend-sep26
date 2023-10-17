'use client';
import React, {useState} from 'react';
import { UserList } from "@components/UserList";
import Button from '@mui/material/Button';

export default function Services() {
    const [updateTable, setUpdateTable] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const updateNow = () => {
        setUpdateTable(!updateTable);
    };

    const addUser = () => {
      console.log("add user");
    };

    const editUser = () => {
      console.log("edit user");
    };

    const deleteUser = () => {
      console.log("delete user");
    };

    return (
        <div>
            <div>
            <Button 
            variant="contained"
            onClick={updateNow}
          >
            Refresh
          </Button>
          <Button 
            variant="contained"
            onClick={addUser}
            style={
              {background: 'green'}
            }
          >
            Add
          </Button>
          <Button 
            variant="contained"
            onClick={editUser}
            style={
              {background: 'purple'}
            }
          >
            Edit
          </Button>
          <Button 
            variant="contained"
            onClick={deleteUser}
            style={
              {background: 'red'}
            }
          >
            Delete
          </Button>
            </div>
            <UserList updateTable={updateTable} selectedRows={selectedRows} setSelectedRows={setSelectedRows} ></UserList>
        </div>
    )
}