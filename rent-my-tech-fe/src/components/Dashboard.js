import React, { useEffect, useState } from 'react';
import axiosWithAuth from './utils/axiosWithAuth';
// import axios from 'axios'
import DashCard from './DashCard.js'
import { Link } from 'react-router-dom'

 const Dashboard = () => {

    const [user, setUser] = useState([]);
    const [dashboard, setDashboard] = useState([]);

    useEffect( () => {
     axiosWithAuth()
        .get(`/api/users/`)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('USERID', res.data.id)
            setUser(res.data)
        })
    }, [])
    

    console.log(user)

    useEffect(() => {
        const id = localStorage.getItem('USERID')
        axiosWithAuth()
           .get(`/api/users/${id}/ads`)
           .then(res => {
               console.log(res.data)
               setDashboard(res.data)
           })
       }, [])

    return(
        <div className='dashboard'>
            <div className='dash-top'>
                <div className='dash-top-section'>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/>
                </div>
                <div className='dash-top-section'>
            <h3>Hello {user.first_name}!</h3>
            <h4>You currently have {dashboard.length} items listed to be rented. </h4>
            <a href='#user-ads'><button>Manage Listings</button></a>
            <Link to='/additem'> <button> List New Tech</button></Link>
            </div>
            </div>
            <div className='user-ads'>
            {dashboard.map(item =>{
                return <DashCard item={item} dashboard={dashboard} setDashboard={setDashboard} />
            })}
            </div>
        </div>
    )
}

export default Dashboard;