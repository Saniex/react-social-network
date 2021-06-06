import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { 
    getUserFollow, 
    getUserUnfollow, 
    selectFollowFetchingStatus
} from '../../store/followSlice';

import Button from '../../components/Button'



const Wrapper = styled(Button)`
    min-width: 150px;

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 6px 24px;
    }
`;



const FollowButton = props => {

    const { userID, isFollowed } = props;

    const dispatch = useDispatch();

    const isFollowFetching = useSelector(selectFollowFetchingStatus);



    const checkFollowFetchingStatus = () => isFollowFetching.some(ID => ID === userID);



    return (
        <>
            {
                isFollowed ?

                <Wrapper
                    color="green"
                    disabled={checkFollowFetchingStatus(userID)} 
                    onClick={() => dispatch(getUserUnfollow(userID))}>
                    Followed
                </Wrapper> :

                <Wrapper
                    color="red"
                    disabled={checkFollowFetchingStatus(userID)} 
                    onClick={() => dispatch(getUserFollow(userID))}>
                    Unfollowed
                </Wrapper>
            }
        </>
    )
}



export default FollowButton;