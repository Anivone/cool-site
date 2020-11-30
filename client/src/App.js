import React, {createContext, useContext, useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import * as config from './config/config.json';

import makeStyles from "@material-ui/core/styles/makeStyles";
import NavBar from "./components/navbar/NavBar";
import MainPage from "./components/pages/MainPage";
import TrainingsPage from "./components/pages/TrainingsPage";
import AboutPage from "./components/pages/AboutPage";
import AdminPage from "./components/pages/AdminPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";

import { LanguageContext } from './context/LanguageContext'

import axios from 'axios';

const API_LANGUAGE_URL = 'http://localhost:5000/lang';

const useStyles = makeStyles({
    mainContainer: {
        width: "100%",
        height: '100%'
    },
});

const App = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        language: null
    });

    useEffect(() => {
        document.title = config.title;
        (async () => {
            const data = await apiGetRequest();
            setState({
                ...state,
                language: data.lang
            })
        })();
    }, []);

    const onChangeLanguage = async (lang) => {
        const data = await apiPostRequest(lang);
        console.log('data: ', data);
        setState({
            ...state,
            language: data.lang
        })
    }

    const apiPostRequest = async (lang) => {
        try {
            const response = await axios.post(API_LANGUAGE_URL, {lang})
            return response.data;
        }catch (e) {
            console.log(e);
        }
    }
    const apiGetRequest = async () => {
        try {
            const response = await axios.get(API_LANGUAGE_URL)
            return response.data;
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <LanguageContext.Provider value={state.language}>
            <div className={classes.mainContainer}>
                <NavBar
                    onChangeLanguage={onChangeLanguage}
                />
                <Router>
                    <Switch>
                        <Route path='/confirm/:id'><ConfirmationPage/></Route>
                        <Route path='/admin'><AdminPage/></Route>
                        <Route path='/trainings'><TrainingsPage/></Route>
                        <Route path='/about'><AboutPage/></Route>
                        <Route path='/'><MainPage/></Route>
                    </Switch>
                </Router>
            </div>
        </LanguageContext.Provider>
    );
}

export default App;
