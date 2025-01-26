import React, { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Typography, List, ListItem, ListItemText, Divider, makeStyles } from "@material-ui/core"
import axios from "axios"
import SearchArticles from "../components/SearchArticles"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}))

function ArticleList() {
  const classes = useStyles()
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/articles")
      setArticles(response.data)
    } catch (error) {
      console.error("Error fetching articles:", error)
    }
  }

  const handleSearchResults = (results) => {
    setArticles(results)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Articles
      </Typography>
      <SearchArticles onSearchResults={handleSearchResults} />
      <List component="nav" aria-label="article list">
        {articles.map((article) => (
          <React.Fragment key={article._id}>
            <ListItem button component={RouterLink} to={`/articles/${article._id}`}>
              <ListItemText
                primary={article.title}
                secondary={`${article.category} - ${new Date(article.publishDate).toLocaleDateString()}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

export default ArticleList

