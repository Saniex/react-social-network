import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
    selectUsersFetchingStatus, 
    selectUsersList,
    selectUsersInitStatus
} from '../../store/usersSlice';

import Preloader from '../../components/Preloader';

import UserCard from './SearchUserCard';


const Wrapper = styled.div`
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
`;



const UsersList = props => {

    const usersList = useSelector(selectUsersList);
    const isUsersFetching = useSelector(selectUsersFetchingStatus);
    const isUsersInit = useSelector(selectUsersInitStatus);



    const makeUserCards = users => {
        return users.map(user => (
            <UserCard key={user.id} user={user} />
        ));
    }



    return (
        <Wrapper>
            { makeUserCards(usersList) }
            { 
                (isUsersFetching && usersList.length === 0) ?

                <Preloader /> :

                isUsersFetching ?

                <Preloader local="true" /> :

                (isUsersInit && usersList.length === 0) ?

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 auto'}}>
                    Users is not found
                </div> :

                null
            }
        </Wrapper>
    )
}



export default UsersList;