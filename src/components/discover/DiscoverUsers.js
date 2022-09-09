import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { discoverUsersReq } from '../../store/reducers/discoverUsersSlice';
import { followUser, unFollowUser } from '../../store/reducers/FollowUsersSlice';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import classes from '../../styles/discover/Discover.module.css';

export default function DiscoverUsers() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {discoverUsers,discoverUsersPage, isLoading, disUsersError,loadMoreVisible, followError} = useSelector(state => state.discoverUsersSlice)

    useEffect(()=> {
        dispatch(discoverUsersReq(1))
        // console.log('useEffect runs')
    },[dispatch])


    const handleLoadMoreUsers = () => {
        dispatch(discoverUsersReq(discoverUsersPage))
    }

    const goToUserPage = (id) => {
        navigate(`/user-profile/${id}`)
    }

    const handleFollowUser = (user) => {
        if(user.isFollowed){
            dispatch(unFollowUser({id: user._id,type: 'discover' }))
        } else{
            dispatch(followUser({id: user._id,type: 'discover' }))
        }
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
                            sx={{ width: 50, height: 50, cursor: 'pointer'}}
                            onClick={() =>goToUserPage(user._id)}
                        />
                        <div className={classes.userName}>
                            <ListItemText
                                primary={user.name}
                                onClick ={()=> goToUserPage(user._id)}
                                secondary={`${user.followers >= 1? user.followers : '0'} follower`}
                                
                            />
                        </div>
                    </div>
                    <div>
                        <Button 
                            variant={user.isFollowed ? 'contained': 'outlined'}
                            onClick={()=> handleFollowUser(user)}
                        >
                            {user.isFollowed ? 'Following': 'Follow'}
                        </Button>
                    </div>
                </div>
            ))}  

            {isLoading && <Loader />}
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
        {followError && <FeedBack openStatus={true} message={followError} status='error' /> }
    </>
  );
}
