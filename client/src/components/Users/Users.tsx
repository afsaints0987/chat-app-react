import React from 'react'
import { UserTypes } from '../../types/UserTypes'
import { useNavigate} from 'react-router-dom'
import './users.scss'

interface ContactProps {
    users: UserTypes[]
}

const Contacts: React.FC<ContactProps> = ({users}) => {
    const navigate = useNavigate()

    const handleChatbox = (user: UserTypes) => {
        console.log(user)
        navigate(`${user.id}`)
    }

  return (
    <div className="container mt-4 mx-2">
        <input type="text" className="form-control" placeholder="Search"/>
        <div className="my-3">
            <h5 className="text-muted">Users</h5>
            {users.map(user => (
                <div key={user.id} className="contact-list d-flex align-items-center" onClick={() => handleChatbox(user)}>
                    <img src={user.img} className="img-thumbnail mx-3 my-2 rounded-circle border border-success" width="50px" height="50px" alt="user_avatar"/>
                    <h6>{user.firstName} {user.lastName}</h6>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Contacts