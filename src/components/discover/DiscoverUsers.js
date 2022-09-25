import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { discoverUsersReq } from '../../store/reducers/discoverUsersSlice';

import Button from '@mui/material/Button';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';
import UsersCard from './UsersCard';


export default function DiscoverUsers() {
    const dispatch = useDispatch();
    const {discoverUsers,discoverUsersPage, isLoading, disUsersError,loadMoreVisible, followError} = useSelector(state => state.discoverUsersSlice)

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
               <UsersCard key={user._id} user={user} />
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
