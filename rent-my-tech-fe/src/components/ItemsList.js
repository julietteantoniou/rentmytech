import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import ItemsCard from './ItemsCard';
import axiosWithAuth from './utils/axiosWithAuth';
import { Link } from 'react-router-dom'

function ItemsList() {
    const [itemsList, setItemsList] = useState([]);

    const userid = localStorage.getItem("USERID");

    useEffect(() => {
        const getItems = () => {
            axiosWithAuth()
            .get('https://tech-stuff.herokuapp.com/api/ads')
            .then(response => {
                console.log(response.data);
               setItemsList(response.data.result); 
            })
            .catch(error => {
                console.log('Error', error);
            });
        }
        getItems();
    }, [])
    return (
        <>
        <div className='dash-top'>
            <div className='dash-top-section'>
                <h2>Welcome to Rent My Tech</h2>
                <h3>Share Tech, Save Money</h3>
                <p>Rent my Tech allows you to both save and earn. Avoid purchasing gadgets that you'll only use once and rent them locally instead, or make some extra income on that pricey equipment you swore you'd use all the time.</p>
                {userid &&(
                <p>Browse our current selection of available rentals below.</p>
                )}
                {!userid && (<p><Link to='/login'>Log in</Link> to view our current available rentals</p>)}
            </div>
            <div className='dash-top-section'>
                <img className='top-img' src='https://images.unsplash.com/photo-1539683255143-73a6b838b106?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80'/>
            </div>
        </div>
        <div className='itemslist'>
            {itemsList.map(item => (
                <ItemsCard key={item.id} item={item}/>
            ))}
        </div>
        </>
    )
}

export default ItemsList;