import React from "react"
import { Switch, Route } from "react-router-dom"
import { Container } from "@material-ui/core"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import ArticleList from "./pages/ArticleList"
import ArticleDetail from "./pages/ArticleDetail"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articles" component={ArticleList} />
          <Route path="/articles/:id" component={ArticleDetail} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Container>
      <Footer />
    </>
  )
}

export default App

