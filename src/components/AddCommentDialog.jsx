import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Snackbar, TextField} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {useState} from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [open, setOpen] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [message, setMessage] = useState('Comment was added')
    const [snackbarType, setSnackbarType] = useState('success')
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('')
        setText('')
    };
    const sendComment = () => {
        if (name !== '' && text !== '') {
            props.addComment(name, text)
            setOpen(false);
            setName('')
            setText('')
            setSnackbarType('success')
            setMessage('Comment was added')
            setOpenNote(true)
        } else {
            setSnackbarType('error')
            setMessage('You must enter name and text!')
            setOpenNote(true)
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{marginBottom: 10}}>
                Add comment
            </Button>
            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={openNote} autoHideDuration={3000} onClose={() => {
                setOpenNote(false)
            }}>
                <Alert onClose={() => {
                    setOpenNote(false)
                }} severity={snackbarType} sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add comment"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div style={{minWidth: 400}}>
                            <div>
                                <TextField style={{width: 390}} value={name} placeholder="Write a name .."
                                           onChange={(e) => {
                                               setName(e.target.value)
                                           }}/>
                            </div>
                            <div style={{marginTop: 20}}>
                                <TextField style={{width: 390}} value={text} placeholder="Write a text .."
                                           onChange={(e) => {
                                               setText(e.target.value)
                                           }}/>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button variant="contained" color="success" onClick={sendComment}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}