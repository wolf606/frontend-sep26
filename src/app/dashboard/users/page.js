'use client';
import React, { useState } from 'react';
import { UserList } from "@components/UserList";
import Button from '@mui/material/Button';
import Refresh from '@mui/icons-material/Refresh';
import RefreshIcon from '@mui/icons-material/Refresh';
import AvatarModal from '@components/AvatarModal/avatarModal';

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
    <div
      style={{
        margin: '30px',
      }}
    >
      <UserList
        updateTable={updateTable}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      ></UserList>

      <div style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
      }}>
        <Button
          variant="contained"
          onClick={addUser}
          style={{
            background: '#3f51b5',
            marginRight: '18px', 
            border: '1px solid #3f51b5',
          }}
        >
          Add
          <AvatarModal></AvatarModal>
        </Button>

        <Button
          variant="contained"
          onClick={updateNow}
          style={{
            marginRight: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            background: 'transparent',
            border: '1px solid #3f51b5',
            color: '#3f51b5',
          }}
        >
          Refresh <RefreshIcon />
        </Button>
      </div>
    </div>
  )
}