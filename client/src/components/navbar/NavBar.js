import React, {useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import * as config from '../../config/config.json';

import {makeStyles} from "@material-ui/core";
import {LanguageContext} from "../../context/LanguageContext";

import * as english from '../../languages/eng.json';
import * as ukrainian from '../../languages/ukr.json';

const useStyles = makeStyles({
    marginLeft30: {
        marginLeft: '30px',
    },
    marginLeft15: {
        marginLeft: '15px',
    },
    flexGrow1: {
        flexGrow: '1',
    }
})

const NavBar = ({onChangeLanguage}) => {

    const classes = useStyles();

    const context = useContext(LanguageContext);
    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    return (
        <AppBar color={"primary"} position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    {config.domain} |
                </Typography>
                <Button
                    className={classes.marginLeft30}
                    color={"inherit"}
                    onClick={() => window.location.href = '/'}
                >
                    {textObj.navbar.main}
                </Button>
                <Button
                    className={classes.marginLeft15}
                    color={"inherit"}
                    onClick={() => window.location.href = '/trainings'}
                >
                    {textObj.navbar.trainings}
                </Button>
                <Button
                    className={classes.marginLeft15}
                    color={"inherit"}
                    onClick={() => window.location.href = '/about'}
                >
                    {textObj.navbar.about}
                </Button>

                <Typography className={classes.flexGrow1}/>

                <Button
                    color={"inherit"}
                    onClick={(e) => {
                        e.preventDefault();
                        onChangeLanguage('eng')
                    }}
                >
                    Eng
                </Button>
                <Button
                    color={"inherit"}
                    onClick={(e) => {
                        e.preventDefault();
                        onChangeLanguage('ukr')
                    }}
                >
                    Укр
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;