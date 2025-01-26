import React, { useState } from "react"
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}))

function SubscriptionForm() {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [categories, setCategories] = useState({
    Tenders: false,
    "Policy Updates": false,
    "Press Releases": false,
    "Public Notices": false,
  })
  const [message, setMessage] = useState("")

  const handleCategoryChange = (event) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const selectedCategories = Object.keys(categories).filter((key) => categories[key])
      await axios.post("/api/subscriptions", { email, categories: selectedCategories })
      setMessage("Subscribed successfully!")
      setEmail("")
      setCategories({
        Tenders: false,
        "Policy Updates": false,
        "Press Releases": false,
        "Public Notices": false,
      })
    } catch (error) {
      setMessage("Subscription failed. Please try again.")
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        Subscribe to Email Alerts
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormGroup>
          {Object.keys(categories).map((category) => (
            <FormControlLabel
              key={category}
              control={<Checkbox checked={categories[category]} onChange={handleCategoryChange} name={category} />}
              label={category}
            />
          ))}
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          Subscribe
        </Button>
      </form>
      {message && (
        <Typography color={message.includes("failed") ? "error" : "primary"} align="center">
          {message}
        </Typography>
      )}
    </Paper>
  )
}

export default SubscriptionForm

