import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import {
    clearProfileData,
    selectProfileFetchingStatus,
    selectProfileInitStatus
} from '../../store/slices/profileSlice';

import {
    profileActionCreators
} from '../../store/sagas/profileSaga';

import { 
    selectAuthStatus,
    selectCurrentUserData
} from '../../store/slices/authSlice';

import Preloader from '../../components/Preloader';

import Card from './ProfileCard';
import PostsList from './ProfilePostsList';



const ProfilePage = props => {
    const dispatch = useDispatch();
    
    const isProfileInit = useSelector(selectProfileInitStatus);
    const isProfileFetching = useSelector(selectProfileFetchingStatus);
    const userData = useSelector(selectCurrentUserData);
    const isAuth = useSelector(selectAuthStatus);

    const pageID = props.match.params.userID;



    useLayoutEffect(() => {
        (pageID || isAuth) && dispatch(profileActionCreators.getUserProfile(pageID || userData.id));

        return () => dispatch(clearProfileData());
    }, [pageID]);



    if (!isAuth && !pageID) return <Redirect to="/login" />

    if (pageID == userData.id) return <Redirect to="/profile" />

    if (
        !isProfileInit || 
        isProfileFetching.profile ||
        isProfileFetching.status ||
        isProfileFetching.photo
    ) return <Preloader />

    return (
        <>  
            <Card isAuth={isAuth} pageID={pageID} />
            <PostsList />
        </>
    )
}



export default ProfilePage;