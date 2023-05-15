// import {useState} from 'react'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as IconName from 'react-icons/gi'
import './register.scss'
import avatar from '../../assets/avatar-user.png'


const Register: React.FC = () => {
  const navigate = useNavigate()
  const [imageUpload, setImageUpload] = useState<File | null>(null)
  const [registerUser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleImageUpload = (e: any) => {
    const file = e.target.files && e.target.files[0]
    if(file) {
      setImageUpload(file)
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterUser({
      ...registerUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userData = {
      ...registerUser,
      imageUpload
    }

    const {firstName, lastName, email, password, username} = userData

    if(!firstName || !lastName || !email || !password || !username) {
      alert("Please fill up the form")
    } else {
      console.log("Registration Successful!", userData)
  
      setRegisterUser({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      })
  
      setImageUpload(null)

      navigate('/login')
    }


  };


  return (
    <div className="container d-flex flex-column justify-content-center text-center align-items-center mx-auto">
      <form onSubmit={handleSubmit} className="bg-light shadow rounded p-5">
        <h3>
          Chat App <IconName.GiChatBubble />
        </h3>
        <div className="mt-2">
          <div className="form-group d-flex flex-row align-items-center justify-content-between">
            <img src={imageUpload ? URL.createObjectURL(imageUpload) : avatar} alt="avatar-user" className="rounded-circle bg-secondary" width="75" height="75"/>
            <input type="file" accept="image/*" id="image-upload" className="mx-2" onChange={handleImageUpload}/>
          </div>
            
        
            <div className="form-group mt-2">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input className="form-control" name="firstName" type="text" onChange={handleChange} value={registerUser.firstName}/>
            </div>

            <div className="form-group mt-2">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input className="form-control" name="lastName" type="text" onChange={handleChange} value={registerUser.lastName}/>
            </div>

            <div className="form-group mt-2">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input className="form-control" name="email" type="email" onChange={handleChange} value={registerUser.email}/>
            </div>
          
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input className="form-control" name="username" type="text" onChange={handleChange} value={registerUser.username}/>
            </div>

            <div className="form-group mt-2">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input className="form-control" name="password" type="password" onChange={handleChange} value={registerUser.password}/>
            </div>
          
          
        </div>
          <div className="d-flex flex-column mt-2">
            <button className="btn btn-success my-2" type="submit">
              Register
            </button>
            <span className="mt-2">
              <p>Already registered? <Link to="/login">click here</Link></p>
            </span>
          </div>
      </form>
    </div>
  );
}

export default Register