import React, {useContext, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {CardHeader, FormControl} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import axios from 'axios';

import * as english from '../../languages/eng.json';
import * as ukrainian from '../../languages/ukr.json';
import {LanguageContext} from "../../context/LanguageContext";

const config = require('../../config/config.json');

const API_REQUEST_CREATE_URL = 'http://localhost:5000/requests/create';

const useStyles = makeStyles({
    formCard: {
        width: '100%',
        marginTop: '30px'
    },
    formTitle: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    formInput: {
        marginTop: '15px'
    },
    textCenter: {
        textAlign: 'center',
    },
    sendRequest: {
        marginBottom: '15px',
    }
});

const RequestForm = () => {
    const classes = useStyles();

    const context = useContext(LanguageContext);
    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    const [state, setState] = useState({
        name: null,
        surname: null,
        email: null,
        phoneNumber: null,
        text: null,
    });

    const [stateError, setStateError] = useState({
        name: null,
        surname: null,
        email: null,
        phoneNumber: null,
        text: null
    })

    const apiPostRequest = async () => {
        try {
            await axios.post(API_REQUEST_CREATE_URL, {
                name: state.name,
                surname: state.surname,
                email: state.email,
                phoneNumber: `+38${state.phoneNumber.replace(' ', '')}`,
                text: state.text,
                confirmed: !config.confirmationRequired,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const validateRequest = () => {
        let errors = {
            name: null,
            surname: null,
            email: null,
            phoneNumber: null,
            text: null,
        }
        if (!state.name) {
            errors.name = textObj.requestForm.name.error
        }

        if (!state.surname) {
            errors.surname = textObj.requestForm.surname.error
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(state.email)) {
            errors.email = textObj.requestForm.email.error
        }

        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(state.phoneNumber)) {
            errors.phoneNumber = textObj.requestForm.phoneNumber.error
        }

        if (!state.text) {
            errors.text = textObj.requestForm.text.error
        }

        setStateError(errors)
        return errors;
    }

    const onClickSendRequest = (event) => {
        event.preventDefault();

        const errors = validateRequest();

        if (errors.name
            || errors.surname
            || errors.email
            || errors.phoneNumber
            || errors.text
        ) return;

        apiPostRequest()
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    const onChangeName = e => {
        setState({
            ...state,
            name: e.target.value,
        });
    };

    const onChangeSurname = e => {
        setState({
            ...state,
            surname: e.target.value,
        });
    };

    const onChangeEmail = e => {
        setState({
            ...state,
            email: e.target.value,
        });
    };

    const onChangePhone = e => {
        setState({
            ...state,
            phoneNumber: e.target.value,
        });
    };

    const onChangeText = e => {
        setState({
            ...state,
            text: e.target.value,
        });
    };

    return (
        <Card
            raised
            className={classes.formCard}
            variant={"elevation"}
        >
            <CardContent>
                <Typography color={"primary"} className={classes.formTitle}>
                    {textObj.requestForm.title}
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        value={state.name || ""}
                        onChange={onChangeName}
                        label={textObj.requestForm.name.label}
                        error={stateError.name}
                        placeholder={textObj.requestForm.name.placeholder}
                        variant={"outlined"}
                        helperText={stateError.name || ""}
                    />
                    <TextField
                        className={classes.formInput}
                        value={state.surname || ""}
                        onChange={onChangeSurname}
                        error={stateError.surname}
                        fullWidth
                        label={textObj.requestForm.surname.label}
                        placeholder={textObj.requestForm.surname.placeholder}
                        variant={"outlined"}
                        helperText={stateError.surname}
                    />
                    <TextField
                        className={classes.formInput}
                        value={state.email || ""}
                        onChange={onChangeEmail}
                        error={stateError.email}
                        fullWidth
                        label={textObj.requestForm.email.label}
                        placeholder={textObj.requestForm.email.placeholder}
                        variant={"outlined"}
                        helperText={stateError.email}
                    />
                    <TextField
                        className={classes.formInput}
                        value={state.phoneNumber || ""}
                        onChange={onChangePhone}
                        error={stateError.phoneNumber}
                        fullWidth
                        label={textObj.requestForm.phoneNumber.label}
                        placeholder={textObj.requestForm.phoneNumber.placeholder}
                        variant={"outlined"}
                        helperText={stateError.phoneNumber}
                        InputProps={{
                            startAdornment: <InputAdornment position={"start"}>+38</InputAdornment>
                        }}
                    />
                    <TextField
                        className={classes.formInput}
                        value={state.text || ""}
                        onChange={onChangeText}
                        error={stateError.text}
                        fullWidth
                        multiline
                        rows={6}
                        label={textObj.requestForm.text.label}
                        placeholder={textObj.requestForm.text.placeholder}
                        variant={"outlined"}
                        helperText={stateError.text}
                    />
                </form>
            </CardContent>
            <CardActions className={classes.sendRequest}>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    fullWidth
                    size={"large"}
                    onClick={onClickSendRequest}
                >
                    {textObj.requestForm.button}
                </Button>
            </CardActions>
        </Card>
    );
}

export default RequestForm;