import React, { useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    title_selection: {
        marginLeft:30,
        marginTop:15,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      color: theme.palette.text.secondary,
    },
  }));


const BookDelete = id => {
    const uri = `https://frappebackend.herokuapp.com/books/${id}`;
    if (window.confirm("The Book will be deleted from library")) {
        axios.delete(uri).then(resp =>{
            console.log(resp.data);
            window.location.reload();
        })
        .catch(error =>{
            console.log(error);
        })
    } else {
    console.log("Cancel deletion")
    }
    
}

function MainSection() {
    const classes = useStyles();
    const isLoading = false;
    const books = [{_id:"1",
                    title: "Amendment Letter for Approval",
                    sent_on: '15-05-2022',
                    status: 'Pending',
                    signers: ["Riya Gori","Aishwarya","Shaurya"]
                    }];
    
    return (
        <>
        {isLoading ?(
            <div className="center__box">
                <div className="container__box">
                    <h3>Loading ....</h3>
                </div>
            </div>
        ):(
        <>
        <div className="container__box">
            <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">    
                <Paper className={classes.paper}>
                <Box display="flex" className={classes.title_selection}>
                    <Box flexGrow={1}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        INBOX
                    </Typography>
                    </Box>                    
                </Box>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="center">Sent on</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                        <TableCell align="center">Recepients</TableCell>
                        <TableCell align="center">View</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {books.map((book) => (
                        <TableRow key={book._id}>
                            <TableCell align="center">{book._id.slice(-4)}</TableCell>
                        
                            <TableCell align="left">{book.title}</TableCell>
                            <TableCell align="center">{book.sent_on}</TableCell>
                            <TableCell align="center">{book.status}</TableCell>
                            <TableCell align="center">
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button>Edit</Button>
                                <Button>Remind</Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell align="center">
                                <select>
                                    {book.signers.map((name1) => (
                                        <option value={name1}> {name1}</option>
                                    ))}
                                </select>
                            </TableCell>
                            <TableCell align="center">
                               <VisibilityIcon className="view__more"/>
                            </TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Paper>
        </Container>
    </div>
    </div>
    </>
    )}
    </>
    );
}

export default MainSection;