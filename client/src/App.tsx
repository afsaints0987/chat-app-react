import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Chatbox from "./components/Chatbox/Chatbox";

const AppRoute = () => {

  return (
    
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path=":userId" element={<Chatbox users={[]}/>} />
      </Route>
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    
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
