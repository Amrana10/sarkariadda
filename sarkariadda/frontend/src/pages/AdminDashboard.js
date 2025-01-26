import React, { useState, useEffect } from "react"
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core"
import axios from "axios"
import ArticleForm from "../components/ArticleForm"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}))

function AdminDashboard() {
  const classes = useStyles()
  const [articles, setArticles] = useState([])
  const [userRole, setUserRole] = useState("")
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesResponse, userResponse] = await Promise.all([
          axios.get("/api/articles", {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }),
          axios.get("/api/users/me", {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }),
        ])
        setArticles(articlesResponse.data)
        setUserRole(userResponse.data.role)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/articles/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      setArticles(articles.filter((article) => article._id !== id))
    } catch (error) {
      console.error("Error deleting article:", error)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Admin Dashboard
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Articles" />
        <Tab label="Create Article" />
      </Tabs>
      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Publish Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article._id}>
                  <TableCell component="th" scope="row">
                    {article.title}
                  </TableCell>
                  <TableCell align="right">{article.category}</TableCell>
                  <TableCell align="right">{article.author.username}</TableCell>
                  <TableCell align="right">{new Date(article.publishDate).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Button color="primary">Edit</Button>
                    {userRole === "admin" && (
                      <Button color="secondary" onClick={() => handleDelete(article._id)}>
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tabValue === 1 && <ArticleForm />}
    </div>
  )
}

export default AdminDashboard

