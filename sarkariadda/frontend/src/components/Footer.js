import React from "react"
import { Typography, Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.grey[200],
  },
}))

function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Sarkariadda. All rights reserved.
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer

