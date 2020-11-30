import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import {FormControl, makeStyles} from "@material-ui/core";

import axios from 'axios';

const API_CREATE_TRAINING_URL = 'http://localhost:5000/trainings/create'

const useStyles = makeStyles({
    textCenter: {
        textAlign: 'center',
    },
    marginBottom: {
        marginBottom: '15px'
    }
})

const CreationDialog = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        title: null,
        shortDescription: null,
        detailedDescription: null
    })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClickAdd = async () => {
        const data = await apiPostRequest();
        handleClose();
        if(data.success)
            window.location.reload();
    }

    const apiPostRequest = async () => {
        try {
            const response = await axios.post(API_CREATE_TRAINING_URL, {
                title: state.title,
                shortDescription: state.shortDescription,
                detailedDescription: state.detailedDescription
            })
            return response.data;
        }catch (e) {
            console.log(e);
        }
    }

    const onChange = (evt) => {
        setState({
            ...state,
            [evt.target.name]: evt.target.value
        })
    }

    return (
        <div className={classes.textCenter}>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <AddCircleIcon
                    color={"primary"}
                    fontSize={"large"}
                />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Input information to add Training
                    </DialogContentText>
                    <FormControl fullWidth>
                        <TextField
                            variant={"outlined"}
                            className={classes.marginBottom}
                            autoFocus
                            name={'title'}
                            value={state.title || ""}
                            label="Title"
                            placeholder={"Input title here"}
                            fullWidth
                            onChange={onChange}
                        />

                        <TextField
                            variant={"outlined"}
                            className={classes.marginBottom}
                            name={'shortDescription'}
                            label="Short Description"
                            value={state.shortDescription || ""}
                            placeholder={"Input short description here"}
                            multiline
                            rows={4}
                            fullWidth
                            onChange={onChange}
                        />

                        <TextField
                            variant={"outlined"}
                            className={classes.marginBottom}
                            label="Detailed Description"
                            name={'detailedDescription'}
                            value={state.detailedDescription || ""}
                            placeholder={"Input detailed description here"}
                            multiline
                            rows={6}
                            fullWidth
                            onChange={onChange}
                        />

                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button variant={"contained"} onClick={onClickAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreationDialog;