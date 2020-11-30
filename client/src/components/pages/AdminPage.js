import React, {useContext, useEffect, useState} from "react";
import {Container, Grid, makeStyles, Typography} from "@material-ui/core";

import RequestsTable from "./helpers/RequestsTable";
import TrainingsTable from "./helpers/TrainingsTable";

import * as english from "../../languages/eng.json";
import * as ukrainian from "../../languages/ukr.json";
import * as config from "../../config/config.json";

import Switch from "@material-ui/core/Switch";

import axios from 'axios';
import {Language} from "@material-ui/icons";
import {LanguageContext} from "../../context/LanguageContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const API_CONFIRM_REQUIRED_URL = 'http://localhost:5000/requests/confirm/switch'

const useStyles = makeStyles({
    contentContainer: {
        marginTop: '80px'
    },
    marginBottom: {
        marginBottom: '10px'
    }
});

const AdminPage = () => {
    const classes = useStyles();

    const context = useContext(LanguageContext);
    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    const [state, setState] = useState({
        confirmationRequired: config.confirmationRequired
    });

    const onChangeConfirm = async (evt) => {
        setState({
            ...state,
            confirmationRequired: evt.target.checked
        });
        const data = await apiPostRequest(evt.target.checked);
    }

    const apiPostRequest = async (confirmationRequired) => {
        console.log('state.confirmationRequired: ', state.confirmationRequired);

        try {
            const response = await axios.post(API_CONFIRM_REQUIRED_URL, {
                title: config.title,
                domain: config.domain,
                confirmationRequired
            })
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container className={classes.contentContainer}>
            <FormControlLabel
                className={classes.marginBottom}
                control={<Switch checked={state.confirmationRequired} onChange={onChangeConfirm}/>}
                label={textObj.admin.switch}
            />

            <RequestsTable/>
            <TrainingsTable/>
        </Container>
    );
}

export default AdminPage