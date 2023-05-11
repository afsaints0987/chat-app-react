import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chatbox from "./components/Chatbox/Chatbox";

const AppRoute = () => {

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
          <Route path=":userId" element={<Chatbox/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}


const App: React.FC = () => {
  return (
    <div>
      <AppRoute/>
    </div>
  );
};

export default App;
