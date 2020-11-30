import React, {useContext, useEffect} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import image from "../../img/main-page-image.png";
import RequestForm from "../request/RequestForm";
import {LanguageContext} from "../../context/LanguageContext";
import * as english from "../../languages/eng.json";
import * as ukrainian from "../../languages/ukr.json";
import axios from "axios";

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
    header: {
        padding: '40px',
        backgroundColor: '#cdcdcd',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    subheader: {
        marginTop: '30px',
        fontSize: '20px',
    }
})

const AboutPage = () => {
    const classes = useStyles();
    let context = useContext(LanguageContext);

    useEffect(() => {
        (async () => {
            context = await langGetRequest();
            console.log('context: ', context);
        })();
    }, []);

    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    const langGetRequest = async () => {
        try {
            const response = await axios.get('http://localhost:5000/lang');

            return response.data.lang;
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <Container className={classes.contentContainer}>
            <Grid wrap={"nowrap"} container justify={'space-between'} direction={"row"}>
                <Grid item className={classes.contentItem}>
                    <Container
                        className={classes.mainPageContainer}
                        maxWidth={"lg"}
                    >
                        <Typography>
                            <div className={classes.header}>
                                {textObj.about.heading.first} <br/>
                                {textObj.about.heading.second}
                            </div>
                        </Typography>
                        <Typography>
                            <div className={classes.subheader}>
                                {textObj.about.subHeading.first} <br/>
                                {textObj.about.subHeading.second}
                            </div>
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

export default AboutPage;