import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  footer: {
    backgroundColor: "#000",
    padding: theme.spacing(2),
    color: "#fff",
  },
}));
export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography component="h5" align="center" gutterBottom>
          Copyright Adaptive Learning
        </Typography>
      </Container>
    </footer>
  );
}
