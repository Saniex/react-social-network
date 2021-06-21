import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { 
    selectAuthStatus 
} from '../../store/authSlice';

import {
    cleanUsersList,
    getUsersList,
    selectUsersList,
    selectUsersFetchingStatus,
    selectUsersTotalCount
} from '../../store/usersSlice';

import Input from '../../components/Input';
import Icon from '../../components/Icon';
import Checkbox from '../../components/Checkbox';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { ReactComponent as Search } from '../../assets/icons/search.svg';



const Wrapper = styled.div`
    border-bottom: 1px solid ${({theme}) => theme.border};
    padding: 0 0 25px 0;

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 0 0 15px 0;
    }
`;

const SearchForm = styled.form`
    position: relative;
    display: flex;
    margin: 0 0 15px 0;
`;

const SearchIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    left: 22px;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    fill: ${({theme}) => theme.lightText};

    ${({theme}) => theme.breakpoints.tablet} {
        width: 18px;
        height: 18px;
    }
`;

const SearchInput = styled(Input)`
    border-right: none;
    border-radius: ${({theme}) => `${theme.radius} 0 0 ${theme.radius}`};
    padding: 0 22px 0 66px;

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 0 18px 0 54px;
    }
`;

const SearchButton = styled(Button)`
    flex: 0 0 150px;
    border-radius: ${({theme}) => `0 ${theme.radius} ${theme.radius} 0`};
    font-size: 18px;

    ${({theme}) => theme.breakpoints.tablet} {
        flex: 0 0 90px;
        font-size: 16px;
    }
`;

const Settings = styled.div`
    display: flex;
    align-items: center;
`;

const InputWrapper = styled.div`
    margin: 0 20px 0 0;

    &:last-child {
        margin: 0;
    }
`;



const SearchPanel = props => {
    const dispatch = useDispatch();

    const isUsersFetching = useSelector(selectUsersFetchingStatus);
    const usersList = useSelector(selectUsersList);
    const usersTotalCount = useSelector(selectUsersTotalCount);
    const isAuth = useSelector(selectAuthStatus);

    const [count, setCount] = useState(localStorage['count'] || 20);
    const [page, setPage] = useState(1);
    const [term, setTerm] = useState('');
    const [friend, setFriend] = useState(isAuth ? (localStorage['friend'] || false) : false);
    const [isLoading, changeLoadingStatus] = useState(isUsersFetching);


    
    useEffect(() => {
        changeLoadingStatus(true);

        return () => dispatch(cleanUsersList());
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', handleSearchPageScroll);

        return () => document.removeEventListener('scroll', handleSearchPageScroll);
    }, [usersTotalCount, usersList]);

    useEffect(() => {
        !isUsersFetching && isLoading && changeLoadingStatus(isUsersFetching);
    }, [isUsersFetching]);

    useEffect(() => {
        isLoading && requestUsers();
    }, [isLoading]);

    useEffect(() => {
        resetParams();
        changeLoadingStatus(true);
    }, [count, term, friend]);

    

    // Service functions

    const requestUsers = () => {
        dispatch(getUsersList({count, page, term, friend}));
        setPage(prevState => prevState + 1);
    }

    const resetParams = () => {
        dispatch(cleanUsersList());
        setPage(1);
    }



    // Scroll handler

    const handleSearchPageScroll = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && 
            usersTotalCount > usersList.length) {
            changeLoadingStatus(true);
        }
    }
    


    // Option handlers

    const handleSelect = e => {
        setCount(e.currentTarget.value);
        localStorage.setItem('count', `${e.currentTarget.value}`);
    }
    const handleCheckbox = e => {
        setFriend(e.currentTarget.checked);
        localStorage.setItem('friend', `${e.currentTarget.checked}`);
    }



    // Form handlers

    const { register, handleSubmit } = useForm();
    
    const searchFormHandler = formData => setTerm(formData.username);



    return (
        <Wrapper>
            <SearchForm onSubmit={handleSubmit(searchFormHandler)}>
                <SearchIcon as={Search} />
                <SearchInput
                    {...register('username')}
                    placeholder="Search for users" 
                />
                <SearchButton outlined>
                    Search
                </SearchButton>
            </SearchForm>
            <Settings>
                {
                    isAuth && (
                        <InputWrapper>
                            <Checkbox
                                checked={JSON.parse(localStorage['friend'] || false)}
                                onChange={handleCheckbox}
                                id="search-form-friends-checkbox"
                                label="Friends"
                            />
                        </InputWrapper>
                    )
                }
                <InputWrapper>
                    <Select value={localStorage['count'] || 20} onChange={handleSelect}>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </Select>
                </InputWrapper>
            </Settings>
        </Wrapper>
    )
}



export default SearchPanel;