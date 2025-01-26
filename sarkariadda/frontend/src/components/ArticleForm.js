import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
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
  editor: {
    height: "300px",
    marginBottom: theme.spacing(2),
  },
}))

function ArticleForm() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        "/api/articles",
        { title, content, category, tags: tags.split(",").map((tag) => tag.trim()) },
        { headers: { "x-auth-token": localStorage.getItem("token") } },
      )
      history.push("/admin")
    } catch (error) {
      setError("Failed to create article. Please try again.")
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Create New Article
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <FormControl variant="outlined" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="Tenders">Tenders</MenuItem>
            <MenuItem value="Policy Updates">Policy Updates</MenuItem>
            <MenuItem value="Press Releases">Press Releases</MenuItem>
            <MenuItem value="Public Notices">Public Notices</MenuItem>
          </Select>
        </FormControl>
        <ReactQuill theme="snow" value={content} onChange={setContent} className={classes.editor} />
        <TextField
          label="Tags (comma-separated)"
          variant="outlined"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Article
        </Button>
      </form>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
    </Paper>
  )
}

export default ArticleForm

