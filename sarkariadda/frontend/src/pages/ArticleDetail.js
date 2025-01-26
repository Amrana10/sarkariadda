import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Typography, Paper, makeStyles } from "@material-ui/core"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  meta: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

function ArticleDetail() {
  const classes = useStyles()
  const { id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`)
        setArticle(response.data)
      } catch (error) {
        console.error("Error fetching article:", error)
      }
    }

    fetchArticle()
  }, [id])

  if (!article) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {article.title}
      </Typography>
      <Typography variant="subtitle1">Category: {article.category}</Typography>
      <Typography variant="body1" className={classes.content}>
        {article.content}
      </Typography>
      <Typography variant="body2" className={classes.meta}>
        Published on: {new Date(article.publishDate).toLocaleDateString()}
      </Typography>
      <Typography variant="body2" className={classes.meta}>
        Author: {article.author.username}
      </Typography>
    </Paper>
  )
}

export default ArticleDetail

