import React, {useEffect, useState} from "react";
import {
    useParams,
    Redirect
} from "react-router-dom";
import axios from 'axios';

const API_CONFIRM_REQUEST_URL = 'http://localhost:5000/requests/confirm'

const ConfirmationPage = () => {

    const [state, setState] = useState({
        success: false,
    })
    const {id} = useParams();

    console.log('id: ', id);

    useEffect(() => {
        (async () => {
            const data = await apiPostRequest();
            setState({
                ...state,
                success: data.success
            })
        })();
    }, []);

    const apiPostRequest = async () => {
        try {
            const response = await axios.post(API_CONFIRM_REQUEST_URL, {
                requestId: id
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Redirect to={'/'}/>
    );
}

export default ConfirmationPage;