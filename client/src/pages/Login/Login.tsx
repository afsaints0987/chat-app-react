// import {useState} from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as IconName from 'react-icons/gi'
import './login.scss'

interface UserInfo {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  image: object
}


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('userData');
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo))
    }
  },[])


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {username, password} = userInfo

    if(username !== loginUser.username || password !== loginUser.password){
      alert('Invalid username or password');
    } else {
      
      console.log(loginUser)
      setLoginUser({
        username: "",
        password: ""
      })
  
      navigate('/dashboard')

    }

  };


  return (
    <div className="container d-flex flex-column justify-content-center text-center align-items-center mx-auto">
      <p className="text-danger"></p>
      <form onSubmit={handleSubmit} className="bg-light shadow rounded p-5">
        <h3>
          Chat App <IconName.GiChatBubble />
        </h3>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input className="form-control" name="username" type="text" onChange={handleChange} value={loginUser.username}/>
        </div>
        <div className="form-group mt-2">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input className="form-control" name="password" type="password" onChange={handleChange} value={loginUser.password}/>
        </div>
        <div className="d-flex flex-column mt-2">
          <button className="btn btn-success my-2" type="submit">
            Login
          </button>
          <span className="mt-2">
            <p>Not yet registered? <Link to="/register">click here</Link></p>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login