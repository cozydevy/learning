import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, Input, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import swal from "sweetalert";

import { useLocation } from "react-router-dom";

export default function Questions({ id, name, hint,taskIds,statusQ}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "50em",
      },
    },
    btnAns: {
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  }));
  const classes = useStyles();
  const token = localStorage.getItem("accessToken");
  const users = localStorage.getItem("user");
  const user = JSON.parse(users);

  const [result, setResults] = useState();
  const [answer, setAnswer] = useState("");
  const [taskId, setTaskId] = useState(taskIds);
  const [userId, setUserId] = useState(user.id);
  const [statusQuestion, setStatusQuestion] = useState(statusQ);

  const [open, setOpen] = useState(false);
  // const [statusQuestion, setStatusQuestion] = useState(updateQuestion);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendAns = async (e) => {
    e.preventDefault();
    const bodyParameters = { id, answer ,taskId,userId};
    console.log(userId);

    // console.log("bodyParameters"+JSON.stringify(bodyParameters));
    await axios
      .post("/api/v1/questions/CheckAns", bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        swal({
          text: "wrong answer",
          icon: "warning",
          dangerMode: true,
        });
        setAnswer("");

        
      });
  };



    return (
      <Grid container>
        <Grid item container xl={12}>
          <Grid item xl={10}>
        
              <Typography variant="subtitle1" component="h2" gutterBottom>
                <b>Questions : </b> 
                {name}
           
              </Typography>
           
              {statusQ ? (
                <div></div>
            ) : (    <TextField 
              id="standard-basic"
              label="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            /> )}
           </Grid>
           {statusQ ? (
                <div> <b>Complete</b></div>
                 ) : (   <Grid item container xl={2} className={classes.btnAns}>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Hint
                  </Button>
            
    
               
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"HINT"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {hint}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        close
                      </Button>
                    </DialogActions>
                  </Dialog>
                
                <Button
                  variant="contained"
                  color="secondary"
                 
                  onClick={sendAns}
                >
                  Submit
                </Button>
                </Grid>)}
        </Grid>
      </Grid>
    );


// const hasAnswer = () => {

//   return (
//     <Grid container>
//       <Grid item container xl={12}>
//         <Grid item xl={10}>
      
//             <Typography variant="subtitle1" component="h2" gutterBottom>
//               <b>Questions : </b>{name}
//             </Typography>

//             {/* <TextField 
//               id="standard-basic"
//               label="Answer"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//             /> */}
//          </Grid>

//             {/* <Grid item container xl={2} className={classes.btnAns}>
//               <Button variant="outlined" onClick={handleClickOpen}>
//                 Hint
//               </Button>
        

           
//               <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//               >
//                 <DialogTitle id="alert-dialog-title">{"HINT"}</DialogTitle>
//                 <DialogContent>
//                   <DialogContentText id="alert-dialog-description">
//                     {hint}
//                   </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={handleClose} color="primary">
//                     close
//                   </Button>
//                 </DialogActions>
//               </Dialog>
            
//             <Button
//               variant="contained"
//               color="secondary"
             
//               onClick={sendAns}
//             >
//               Submit
//             </Button>
//             </Grid> */}
//       </Grid>
//     </Grid>
//   );
// }

}
