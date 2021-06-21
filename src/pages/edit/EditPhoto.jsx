import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import checkLength from '../../utils/checkLength';

import { putProfilePhoto } from '../../store/profileSlice';

import Button from '../../components/Button';



const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const File = styled.div`
    display: flex;
    align-items: center;

    input {
        display: none;
    }

    label {
        flex: 0 0 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        background: ${({theme}) => theme.lightBackground};
        border: 1px solid ${({theme}) => theme.border};
        border-radius: ${({theme}) => theme.radius};
        font-family: ${({theme}) => theme.secondaryFont};
        font-weight: 700;
        margin: 0 15px 0 0;
        cursor: pointer;
    }

    span {
        font-size: 14px;
        line-height: 1.2;
        overflow: hidden;
    }

    ${({theme}) => theme.breakpoints.tablet} {

        label {
            height: 40px;
        }
    }
`;

const EditButton = styled(Button)`
    max-width: 150px;
    margin: 25px 0 0 0;

    ${({theme}) => theme.breakpoints.tablet} {
        margin: 15px 0 0 0;
    }
`;



const Status = props => {
    const dispatch = useDispatch();

    const [fileName, setFileName] = useState('');

    const photoForm = useRef();



    // Photo form handlers

    const { register, handleSubmit } = useForm();

    const handlePhotoFormSubmit = formData => {
        const photoData = new FormData();
        const image = formData.photo[0];
        photoData.append('image', image);
        dispatch(putProfilePhoto(photoData));
        setFileName('');
    }

    const handlePhotoFormChange = formData => {
        setFileName(formData.photo[0].name);
    }
    


    return (
        <Form 
            ref={photoForm} 
            onChange={handleSubmit(handlePhotoFormChange)} 
            onSubmit={handleSubmit(handlePhotoFormSubmit)}>
            <File>
                <label>
                    Upload photo
                    <input
                        type="file"
                        {...register('photo')}
                    />
                </label>
                <span>
                    {checkLength(fileName, 16)}
                </span>
            </File>
            {
                fileName &&

                <EditButton color="green">
                    Submit
                </EditButton>
            }
        </Form>
    )
}



export default Status;