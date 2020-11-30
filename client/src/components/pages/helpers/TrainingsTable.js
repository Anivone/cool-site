import React, {useContext, useEffect, useState} from "react";
import {Container, makeStyles} from "@material-ui/core";

import MUIDataTable from "mui-datatables";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreationDialog from "./CreationDialog";

import * as english from "../../../languages/eng.json";
import * as ukrainian from "../../../languages/ukr.json";
import {LanguageContext} from "../../../context/LanguageContext";

const API_GET_TRAININGS_URL = 'http://localhost:5000/trainings/all';
const API_REMOVE_TRAINING_URL = 'http://localhost:5000/trainings/remove';

const useStyles = makeStyles({
    contentContainer: {
        marginTop: '70px'
    }
});

const TrainingsTable = () => {
    const context = useContext(LanguageContext);
    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    const requestCols = [
        {
            name: 'title',
            label: textObj.trainingsTable.title,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'shortDescription',
            label: textObj.trainingsTable.shortDescription,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'detailedDescription',
            label: textObj.trainingsTable.detailedDescription,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                customHeadRender: () => {
                    return (
                        <CreationDialog entity='training'/>
                    );
                }
            }
        }
    ]

    const [state, setState] = useState({
        trainings: [],
    });

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
        <MUIDataTable
            title={textObj.trainingsTable.tableTitle}
            data={state.trainings}
            columns={requestCols}
            options={{
                print: false,
                download: false,
                onRowsDelete: async (rowsDeleted) => {
                    for (let row of rowsDeleted.data) {
                        console.log('row: ', row);
                        await axios.post(API_REMOVE_TRAINING_URL, {
                            trainingId: state.trainings[row.dataIndex]._id
                        })
                    }
                }
            }}
        />
    );
}

export default TrainingsTable