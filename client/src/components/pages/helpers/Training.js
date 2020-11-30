import React, {useContext, useState} from "react";
import {Button, makeStyles, Typography} from "@material-ui/core";

import * as english from '../../../languages/eng.json';
import * as ukrainian from '../../../languages/ukr.json';
import {LanguageContext} from "../../../context/LanguageContext";

const useStyles = makeStyles({
    trainingBlock: {
        padding: '10px',
        border: 'solid 2px #cdcdcd',
        marginBottom: '10px'
    },
    heading: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    shortDesc: {
        marginBottom: '15px'
    },
    showButton: {
        marginLeft: '15px',
        marginBottom: '10px'
    }
});

const Training = ({
                      title,
                      shortDescription,
                      detailedDescription
                  }) => {
    const classes = useStyles();

    const context = useContext(LanguageContext);
    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    const [state, setState] = useState({
        expand: false,
    });

    const onClickExpand = (e) => {
        e.preventDefault();
        setState({
            ...state,
            expand: !state.expand
        });
    };

    return (
        <div className={classes.trainingBlock}>
            <Typography color={"primary"}>
                <div className={classes.heading}>{title}</div>
            </Typography>
            <div className={classes.shortDesc}>{shortDescription}</div>
            <Button className={classes.showButton} variant={"outlined"} onClick={onClickExpand}>
                {state.expand ? textObj.training.hide : textObj.training.show}
            </Button>
            {state.expand
                ? <div>{detailedDescription}</div>
                : null
            }
        </div>
    );
}

export default Training;