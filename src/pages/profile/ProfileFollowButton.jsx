import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
    selectFollowFetchingStatus
} from '../../store/slices/followSlice';

import {
    followActionCreators
} from '../../store/sagas/followSaga';

import Button from '../../components/Button'



const Wrapper = styled(Button)`
    min-width: 150px;

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 6px 24px;
    }
`;



const FollowButton = ({ userID, isFollowed }) => {
    const dispatch = useDispatch();

    const isFollowFetching = useSelector(selectFollowFetchingStatus);



    // Service functions

    const checkFollowFetchingStatus = () => isFollowFetching.some(ID => ID === userID);



    return (
        <>
            {
                isFollowed ?

                <Wrapper
                    color="green"
                    disabled={checkFollowFetchingStatus(userID)}
                    onClick={() => dispatch(followActionCreators.getUserUnfollow(userID))}>
                    Followed
                </Wrapper> :

                <Wrapper
                    color="red"
                    disabled={checkFollowFetchingStatus(userID)}
                    onClick={() => dispatch(followActionCreators.getUserFollow(userID))}>
                    Unfollowed
                </Wrapper>
            }
        </>
    )
}



export default FollowButton;