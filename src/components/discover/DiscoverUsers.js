import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { discoverUsersReq } from '../../store/reducers/discoverUsersSlice';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FeedBack from '../utilities/FeedBack';
import classes from '../../styles/discover/Discover.module.css';

export default function DiscoverUsers() {
    const dispatch = useDispatch();
    const {discoverUsers,discoverUsersPage, isLoading, disUsersError,loadMoreVisible} = useSelector(state => state.discoverUsersSlice)

    useEffect(()=> {
        dispatch(discoverUsersReq(1))
        // console.log('useEffect runs')
    },[dispatch])


    const handleLoadMoreUsers = () => {
        dispatch(discoverUsersReq(discoverUsersPage))
    }

    return (
    <>
        <div style={{width: '100%'}}>
            {discoverUsers && discoverUsers.map(user=>(
                <div key={user._id} className={classes.userContainer}>
                    <div className={classes.userAvatar}>
                        <Avatar 
                            alt='user avatar'
                            src={user.photo}
                            sx={{ width: 50, height: 50 }}
                        />
                        <div className={classes.userName}>
                            <ListItemText
                                primary={user.name}
                                secondary={`${user.followers >= 1? user.followers : '0'} follower`}
                                
                            />
                        </div>
                    </div>
                    <div>
                        <Button variant='outlined'>
                            Following
                        </Button>
                    </div>
                </div>
            ))}  

            {isLoading && <div>Loading...</div>}
            {loadMoreVisible && <Button 
                    variant='contained'
                    onClick={handleLoadMoreUsers}
                >
                    Load More
                </Button>
            }
                {discoverUsers.length ===0 && !isLoading && <p>There's podcasts to discover</p>}           
        </div>

        {disUsersError && <FeedBack openStatus={true} message={disUsersError} status='error' /> }
    </>
  );
}
