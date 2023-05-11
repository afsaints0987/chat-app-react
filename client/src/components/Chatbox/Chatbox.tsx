import React, {useState, useEffect} from 'react'
import './chatbox.scss'
import {useParams} from 'react-router-dom'
import { UserTypes } from '../../types/UserTypes'


interface UserProps {
    users: UserTypes[]
}

const Chatbox: React.FC<UserProps> = ({users}) => {
    const {userId} = useParams()
    const [user, setUser] = useState<UserTypes[]>([])

    useEffect(() => {
        const getUser = async () => {
            const userData = await users.filter(user => Number(user.id) === Number(userId))
            setUser(userData)
        }
        getUser()
    },[userId, users])

    if(!user || user.length === 0){
        return null;
    }

  return (
    <div className="container-flex">
        {user.map(u => (
            <div key={u.id} className="chat-header p-4 bg-success m-0 shadow-sm d-flex flex-row text-light align-items-center">
                <img src={u.img} className="img-thumbnail rounded-circle mx-4" width="75px" height="75px" alt="user-avatar"/>
                <h4>{u.firstName} {u.lastName}</h4>
            </div>
        ))}
        <div className="chat-body">

        </div>
        <div className="chat-footer">
            <div className="input-group">
                <input type="text" placeholder="Type your message here..." className="form-control"/>
                <button className="btn btn-success">Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chatbox