'use client';
import React, {useState} from 'react';
import { UserList } from "@components/UserList";
import Button from '@mui/material/Button';

export default function Services() {
    const [updateTable, setUpdateTable] = useState(false);

    const updateNow = () => {
        setUpdateTable(!updateTable);
    };

    return (
        <div>
            <Button 
            variant="contained"
            onClick={updateNow}
          >
            Update
          </Button>
            <UserList updateTable={updateTable} ></UserList>
        </div>
    )
}