import React from "react"
import { Typography, Grid, Paper, makeStyles } from "@material-ui/core"
import SubscriptionForm from "../components/SubscriptionForm"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Welcome to Sarkariadda
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your trusted source for official government updates, press releases, tenders, and public notices.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>Tenders</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>Policy Updates</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>Press Releases</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>Public Notices</Paper>
        </Grid>
      </Grid>
      <SubscriptionForm />
    </div>
  )
}

export default Home

