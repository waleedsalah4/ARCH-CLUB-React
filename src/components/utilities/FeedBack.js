import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FeedBack = ({openStatus, message, status}) => {
    const [open, setOpen] = useState(openStatus);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    return (
      
        <Snackbar 
            open={open} 
            autoHideDuration={3000} 
            onClose={handleClose}
        >
            <Alert 
                onClose={handleClose} 
                severity={status} 
                sx={{ width: '100%' }}
            >
            {message}
        </Alert>
      </Snackbar>

    )
}

export default FeedBack