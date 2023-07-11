import React from 'react'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { TextField } from '@mui/material';

const BorrowPage = () => {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Stack spacing={3}>
        <TextField variant='filled' label="">

        </TextField>
      </Stack>
    </Box>
  )
}

export default BorrowPage