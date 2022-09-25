import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../store/reducers/SearchSlice';
import UsersCard from '../discover/UsersCard';
import FeedBack from '../utilities/FeedBack';
import Loader from '../utilities/Loader';

function SearchUser({value}) {
    const dispatch = useDispatch();
    const {
        users,
        isLoadingUsers,
        usersError,
        followUserError
    } = useSelector(state => state.SearchSlice)

    useEffect(() => {
        dispatch(searchUser({page: 1,value}))
    },[dispatch])

    return (
        <>
            {users && users.map(user => (
                <UsersCard key={user._id} user={user} />
            ))}

            {isLoadingUsers && <Loader />}
           
            {users.length ===0 && !isLoadingUsers && <p>There is no user with this name</p>}

            {usersError && <FeedBack openStatus={true} message={usersError} status='error' /> }
            {followUserError && <FeedBack openStatus={true} message={followUserError} status='error' /> }
        </>
    )
}

export default SearchUser