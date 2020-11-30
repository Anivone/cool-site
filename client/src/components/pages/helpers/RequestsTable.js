import React, {useContext, useEffect, useState} from "react";
import {Button, Container, makeStyles} from "@material-ui/core";

import MUIDataTable from "mui-datatables";
import axios from "axios";
import Switch from "@material-ui/core/Switch";

import * as english from "../../../languages/eng.json";
import * as ukrainian from "../../../languages/ukr.json";
import {LanguageContext} from "../../../context/LanguageContext";

const API_GET_REQUESTS_URL = 'http://localhost:5000/requests/all';
const API_REMOVE_REQUEST_URL = 'http://localhost:5000/requests/remove';

const useStyles = makeStyles({
    contentContainer: {
        marginTop: '70px'
    },
    margins: {
        marginBottom: '20px'
    },
    textCenter: {
        textAlign: 'center',
    }
});

const RequestsTable = () => {
    const context = useContext(LanguageContext);
    let textObj = context === 'eng' ? english : ukrainian;
    textObj = textObj.default;

    const requestCols = [
        {
            name: 'name',
            label: textObj.requestsTable.name,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'surname',
            label: textObj.requestsTable.surname,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'email',
            label: textObj.requestsTable.email,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'phoneNumber',
            label: textObj.requestsTable.phoneNumber,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'text',
            label: textObj.requestsTable.text,
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'confirmed',
            label: textObj.requestsTable.confirmed,
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <Switch
                            color={"primary"}
                            readOnly
                            checked={state.requests[dataIndex].confirmed}
                        />
                    );
                }
            }
        },
    ]

    const classes = useStyles();

    const [state, setState] = useState({
        requests: [],
    });

    useEffect(() => {
        (async () => {
            const data = await apiGetRequest();
            if (data.success)
                setState({
                    ...state,
                    requests: data.requests,
                });
        })();
    }, []);

    const apiGetRequest = async () => {
        const response = await axios.get(API_GET_REQUESTS_URL);
        return response.data;
    }

    return (
        <MUIDataTable
            className={classes.margins}
            title={textObj.requestsTable.tableTitle}
            data={state.requests}
            columns={requestCols}
            options={{
                print: false,
                download: false,
                onRowsDelete: async (rowsDeleted) => {
                    for (let row of rowsDeleted.data) {
                        console.log('row: ', row);
                        await axios.post(API_REMOVE_REQUEST_URL, {
                            requestId: state.requests[row.dataIndex]._id
                        })
                    }
                }
            }}
        />
    );
}

export default RequestsTable