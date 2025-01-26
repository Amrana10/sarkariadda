import React, { useState } from "react"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
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

function SearchArticles({ onSearchResults }) {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get("/api/articles/search", {
        params: {
          q: searchTerm,
          category,
          startDate,
          endDate,
        },
      })
      onSearchResults(response.data)
    } catch (error) {
      console.error("Error searching articles:", error)
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        Search Articles
      </Typography>
      <form className={classes.form} onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search Term"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Tenders">Tenders</MenuItem>
                <MenuItem value="Policy Updates">Policy Updates</MenuItem>
                <MenuItem value="Press Releases">Press Releases</MenuItem>
                <MenuItem value="Public Notices">Public Notices</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
    </Paper>
  )
}

export default SearchArticles

