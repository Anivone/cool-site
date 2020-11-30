import React, {useEffect, useState} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import image from '../../img/main-page-image.png';
import Grid from "@material-ui/core/Grid";
import RequestForm from "../request/RequestForm";

import axios from 'axios';
import Training from "./helpers/Training";

const API_GET_TRAININGS_URL = 'http://localhost:5000/trainings/all';

const useStyles = makeStyles({
    mainPageContainer: {
        marginTop: '30px',
        width: '100%'
    },
    title: {
        fontSize: '32px'
    },
    contentContainer: {
        maxWidth: '100%',
        marginTop: '70px'
    },
    contentItem: {
      width: '75%'
    },
    requestForm: {
        width: '25%',
    },
});

const MainPage = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        trainings: [],
    })

    useEffect(() => {
        (async () => {
            const data = await apiGetRequest();
            if (data.success)
                setState({
                    ...state,
                    trainings: data.trainings,
                });
        })();
    }, []);

    const apiGetRequest = async () => {
        const response = await axios.get(API_GET_TRAININGS_URL);
        return response.data;
    }

    return (
        <Container className={classes.contentContainer}>
            <Grid wrap={"nowrap"} container justify={'space-between'} direction={"row"}>
                <Grid item className={classes.contentItem}>
                    <Container
                        className={classes.mainPageContainer}
                        maxWidth={"lg"}
                    >
                        {
                            state.trainings.map(t => {
                                return (<Training
                                    title={t.title}
                                    shortDescription={t.shortDescription}
                                    detailedDescription={t.detailedDescription}
                                />);
                            })
                        }
                    </Container>
                </Grid>
                <Grid item className={classes.requestForm}>
                    <RequestForm/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MainPage;