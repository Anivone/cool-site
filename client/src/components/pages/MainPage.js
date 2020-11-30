import React, {useContext} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import image from '../../img/main-page-image.png';
import Grid from "@material-ui/core/Grid";
import RequestForm from "../request/RequestForm";
import {LanguageContext} from "../../context/LanguageContext";

import * as english from '../../languages/eng.json';
import * as ukrainian from '../../languages/ukr.json';

const useStyles = makeStyles({
    mainPageContainer: {
        marginTop: '30px'
    },
    title: {
        fontSize: '32px'
    },
    contentContainer: {
        maxWidth: '100%',
        marginTop: '70px'
    },
    requestForm: {
        width: '25%',
    },
    contentItem: {
        width: '75%'
    },
})

const MainPage = () => {
    const classes = useStyles();

    const context = useContext(LanguageContext);
    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    return (
        <Container className={classes.contentContainer}>
            <Grid wrap={"nowrap"} container justify={'space-between'} direction={"row"}>
                <Grid item>
                    <Container
                        className={classes.mainPageContainer}
                        maxWidth={"lg"}
                    >
                        <img width='100%' height='100%' src={image} alt="Main Page"/>
                        <Typography className={classes.title} color={"primary"}>
                            <h1>{textObj.mainPage.welcome}</h1>
                        </Typography>
                        <Typography>
                            <h2>{textObj.mainPage.subWelcome.first}<br/>
                                {textObj.mainPage.subWelcome.second}</h2>
                        </Typography>
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