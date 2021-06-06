import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';

import {
    putUserInfo
} from '../../store/profileSlice';

import Input from '../../components/Input';
import Button from '../../components/Button';



const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const EditInput = styled(Input)`
    margin: 0 0 25px 0;

    &:last-child {
        margin: 0;
    }

    ${({ theme }) => theme.breakpoints.tablet} {
        margin: 0 0 15px 0;
    }
`;

const ErrorMessage = styled.p`
    font-family: ${({theme}) => theme.secondaryFont};
    color: ${({theme}) => theme.darkRed};
    margin: 15px 0 0 0;

    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 14px;
    }
`;

const EditButton = styled(Button)`
    max-width: 150px;
    margin: 25px 0 0 0;

    ${({theme}) => theme.breakpoints.tablet} {
        margin: 15px 0 0 0;
    }
`;


let schema = yup.object().shape({
    fullName: yup
        .string()
        .required('You have not filled in all the required fields'),
    aboutMe: yup
        .string()
        .required('You have not filled in all the required fields'),
    LookingForAJobDescription: yup
        .string()
        .required('You have not filled in all the required fields'),
});



const Profile = props => {

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit } = useForm();



    const handleProfileForm = formData => {
        const {
            fullName,
            aboutMe,
            LookingForAJobDescription,
            vk,
            facebook,
            instagram,
            youtube,
            twitter,
            github,
            mainLink
        } = formData;

        const profileInfo = {
            fullName,
            aboutMe,
            lookingForAJob: true,
            LookingForAJobDescription,
            contacts: {
                facebook,
                vk,
                instagram,
                youtube,
                twitter,
                github,
                mainLink
            }
        }

        schema.validate(profileInfo)
            .then(() => {
                dispatch(putUserInfo(profileInfo));
                errorMessage && setErrorMessage('');
            })
            .catch(({ message }) => {
                setErrorMessage(message);
            });
    }



    return (
        <Form onSubmit={handleSubmit(handleProfileForm)}>
            <div>
                <EditInput
                    {...register('fullName')}
                    type="text"
                    placeholder="Full name*"
                />
                <EditInput
                    {...register('aboutMe')}
                    type="text"
                    placeholder="Tell about yourself*"
                />
                <EditInput
                    {...register('LookingForAJobDescription')}
                    type="text"
                    placeholder="Looking for a job*"
                />
                <EditInput
                    {...register('vk')}
                    type="text"
                    placeholder="VK"
                />
                <EditInput
                    {...register('facebook')}
                    type="text"
                    placeholder="Facebook"
                />
                <EditInput
                    {...register('instagram')}
                    type="text"
                    placeholder="Instagram"
                />
                <EditInput
                    {...register('youtube')}
                    type="text"
                    placeholder="YouTube"
                />
                <EditInput
                    {...register('twitter')}
                    type="text"
                    placeholder="Twitter"
                />
                <EditInput
                    {...register('github')}
                    type="text"
                    placeholder="GitHub"
                />
                <EditInput
                    {...register('mainLink')}
                    type="text"
                    placeholder="Your Website"
                />
            </div>
            {
                errorMessage && 

                <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>
            }
            <EditButton color="green">
                Submit
            </EditButton>
        </Form>
    )
}



export default Profile;