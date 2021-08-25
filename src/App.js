import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import DetalsBlog from "./pages/detailsPage/DetalsBlog";
import AddBlog from "./pages/addPage/AddBlog";
import EditBlog from "./pages/editPage/EditBlog";

function App() {
  return (
    <div className="App">
      <h1 className="app-title">Blog application with Fetch API</h1>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/addblog" component={AddBlog} />
        <Route exact path="/detailsblog/:id" component={DetalsBlog} />
        <Route exact path="/editblog/:id" component={EditBlog} />
      </Switch>
    </div>
  );
}

export default App;
