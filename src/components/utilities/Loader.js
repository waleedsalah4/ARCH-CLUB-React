import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{textAlign: 'center', marginTop: '3rem',marginBottom: '2rem'}}>
      <CircularProgress />
    </Box>
  );
}
