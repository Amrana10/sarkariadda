import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}))

function Header() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <RouterLink to="/" className={classes.link}>
              Sarkariadda
            </RouterLink>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/articles">
            Articles
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header

