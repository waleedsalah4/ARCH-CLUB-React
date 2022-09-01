import React, { useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import classes from '../../styles/profile/FollowModal.module.css';
import { Typography } from '@mui/material';

const FetchData = (text, data) => {
    switch (text){
        case 'myFollowers':
            console.log('myFollowers');
            break;
        case 'myFollowing':
        console.log('myFollowing');
        break;
        case 'userFollowers':
            console.log('userFollowers');
            break;
        case 'userFollowing':
            console.log('userFollowing');
            break;
        default:
            console.log('closeModal');                 
    }
}

function FollowModal(props) {
    useEffect(()=>{
        FetchData(props.text,{page: 1})
    },[])

    return (
        <div className={classes.followContainer}>
            <Typography variant='h5'>{props.type} list</Typography>
            <div className={classes.userContainer}>
                <div className={classes.userAvatar}>
                    <Avatar 
                        alt='user avatar'
                        src='https://res.cloudinary.com/dnpol9y6s/image/upload/v1654530401/userPhotos/lcuvd6n1wypqchmoxpf4.webp'
                        sx={{ width: 50, height: 50 }}
                    />
                    <div >
                        <ListItemText
                            primary='wello'
                            secondary='0 follower'         
                        />
                    </div>
                </div>
                <div>
                    <Button variant='outlined'>
                        Following
                    </Button>
                </div>
            </div>
            
            <div className={classes.userContainer}>
                <div className={classes.userAvatar}>
                    <Avatar 
                        alt='user avatar'
                        src='https://res.cloudinary.com/dnpol9y6s/image/upload/v1654530401/userPhotos/lcuvd6n1wypqchmoxpf4.webp'
                        sx={{ width: 50, height: 50 }}
                    />
                    <div >
                        <ListItemText
                            primary='wello'
                            secondary='0 follower'
                                    
                        />
                    </div>
                </div>
                <div>
                    <Button variant='outlined'>
                        Following
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default FollowModal