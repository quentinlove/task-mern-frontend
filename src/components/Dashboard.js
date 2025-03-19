import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskForm from "./taskForm";
import { useNavigate } from "react-router-dom";

const Dashboard = ()=>{
    const navigate = useNavigate()
    const {user}= useSelector(state => state.auth)
    useEffect(()=>{
        if(!user)navigate('/login')
    },[user,navigate])
    return (
        <>
          <section className="heading">
              <h1>Welcome {user && user.name}</h1>
              <div style={{display:'flex',justifyContent:"center"}}>
                 <button className="btn" onClick={()=>navigate('/alltasks')}>Check Tasks</button>
              </div>
          </section>
          <TaskForm />
        </>
    )
}
export default Dashboard