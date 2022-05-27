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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios"
import create_new from './create_new';

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


function MainSection() {
    const classes = useStyles();
    const [shown, setShown] = useState(false);
    const [fileUrl,setfileUrl] = useState("");
    const [selectedTitle,setselectedTitle] = useState("");

    const isLoading = false;
    const books = [
                    {
                        _id: '5',
                        title: 'Esignature',
                        sent_on: "27-05-2022",
                        status: 'Pending',
                        signers: ["Krutika Bhatt","Riya Gori"],
                        url: "https://demo.docusign.net/signing/emails/v2-a390f5d471f14da3a55d06939e4521d648c8e50ff42a4a2fae7900fe204f510ec4f0f13975e3470fa7b6d54ff9051960",
                        sign: "https://demo.docusign.net/signing/emails/v2-a390f5d471f14da3a55d06939e4521d648c8e50ff42a4a2fae7900fe204f510ec4f0f13975e3470fa7b6d54ff9051960"
                    },
                    {
                        _id: '4',
                        title: 'Gradebook',
                        sent_on: "27-05-2022",
                        status: 'Pending',
                        signers: ["Krutika Bhatt","Riya Gori"],
                        url: "https://demo.docusign.net/signing/emails/v2-a390f5d471f14da3a55d06939e4521d65c05e0c5526f4e59b956d94a09c9e1163a9115deeedd4baf8a353bb0cfe992f3",
                        sign: "https://demo.docusign.net/signing/emails/v2-a390f5d471f14da3a55d06939e4521d65c05e0c5526f4e59b956d94a09c9e1163a9115deeedd4baf8a353bb0cfe992f3"
                    },
                    {_id:"1",
                    title: "Amendment Letter for Approval",
                    sent_on: '15-05-2022',
                    status: 'Pending',
                    signers: ["Riya Gori","Aishwarya","Shaurya"],
                    url: "http://www.africau.edu/images/default/sample.pdf",
                    sign: "#"
                    },
                    {_id:"2",
                    title: "Request to Reduce the Fees 2021-22",
                    sent_on: '02-02-2022',
                    status: 'Approved',
                    signers: ["Aishwarya","Shaurya"],
                    url: "https://smallpdf.com/handle-widget#url=https://assets.ctfassets.net/l3l0sjr15nav/29D2yYGKlHNm0fB2YM1uW4/8e638080a0603252b1a50f35ae8762fd/Get_Started_With_Smallpdf.pdf",
                    sign: "#",
                    },
                    {_id:"3",
                    title: "Signed Stamp for External Project",
                    sent_on: '28-01-2022',
                    status: 'Approved',
                    signers: ["Aishwarya"],
                    url: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
                    sign: "#"
                    }
                ];
    
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
        {shown && (
            <div className="pdf_viewer_modal">
                <div style={{display:'flex'}}>
                    <div style={{ margin: 'auto',color: 'black',border:'gray' }}>{selectedTitle}</div>
                    <button
                    style={{
                        backgroundColor: '#357edd',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                        padding: '8px',
                        width:'40px',
                    }}
                    onClick={() => setShown(false)}
                    >X</button>
                </div>
            
                <iframe
                title="pdf-render"
                src={`${fileUrl}#view=FitH#zoom=5`}
                frameborder="0"
                width="100%"
                height="100%"
                />
            </div>
            
        )}
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
                        
                            <TableCell align="left"><a href={book.sign}>{book.title}</a></TableCell>
                            <TableCell align="center">{book.sent_on}</TableCell>
                            {book.status == 'Approved'?(
                                <TableCell align="center" style={{color:"green"}}>{book.status}</TableCell>
                            ):(
                                <>
                                {book.status == 'Rejected'?(
                                    <TableCell align="center" style={{color:"red"}}>{book.status}</TableCell>
                                ):(
                                    <TableCell align="center">{book.status}</TableCell>
                                )}
                                </>
                            )}                        
                            <TableCell align="center">
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button>Edit</Button>
                                <Button>Remind</Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell align="center">
                                <select>
                                    {book.signers.map((name1) => (
                                        <option value={name1} key={name1}> {name1}</option>
                                    ))}
                                </select>
                            </TableCell>
                            <TableCell align="center">
                               <VisibilityIcon className="view__more" onClick={() => {setShown(true);setfileUrl(book.url);setselectedTitle(book.title)}}/>
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