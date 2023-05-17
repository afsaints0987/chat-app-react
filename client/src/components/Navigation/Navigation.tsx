import React, { useEffect, useState } from 'react'
import './navigation.scss'
import * as FaIcons from 'react-icons/fa'
import * as BsFill from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<{imageUpload: string} | null>(null);

  useEffect(()=>{
    const userInfo = localStorage.getItem('userData')
    if(userInfo){
      setUserInfo(JSON.parse(userInfo))
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("userData")
    navigate('/login')
  }

  return (
    <header className="container-flex text-light">
        <nav className="navbar navbar-expand-sm bg-success d-flex flex-column vh-100">
            <img src={userInfo?.imageUpload} className="img-thumbnail rounded-circle mt-4" width="75px" height="75px"/>
            <ul className="nav-list list-group mt-4">
                <li className="nav-item list-item"><FaIcons.FaCommentAlt/></li>
                <li className="nav-item list-item"><FaIcons.FaUser/></li>
                <li className="nav-item list-item"><FaIcons.FaUserPlus/></li>
                <li className="nav-item list-item"><BsFill.BsFillGearFill/></li>
            </ul>
            <div className="fixed-bottom my-4 mx-5 w-25" id="logout">
                <span id="logout-btn" onClick={handleLogout}>
                  <FaIcons.FaSignOutAlt/>
                </span>
            </div>
        </nav>
    </header>
  )
}

export default Navigation