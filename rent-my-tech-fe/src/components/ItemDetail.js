import React, { useState } from "react";
import { Grid, Col } from "react-bootstrap";
import { Route, NavLink } from "react-router-dom";
import ItemsList from "./ItemsList";
import axiosWithAuth from './utils/axiosWithAuth'

const ItemDetail = ({item}) => {

  const [itemToBook, setItemToBook] = useState({});


console.log(item)

const setItem = () => {
  setItemToBook(item)
  console.log(itemToBook)
}


  const bookItemFunc = () =>{
    
    itemToBook.item_available=false;
    itemToBook.title = item.title;
    itemToBook.description= item.description;
    itemToBook.price = Number(item.price);
    itemToBook.img_url = item.img_url
    itemToBook.negotiable = true;
    itemToBook.item_condition= item.item_condition;
    delete itemToBook.id
    delete itemToBook.updated_at
    delete itemToBook.created_at
    delete itemToBook.user_id
    console.log(itemToBook)
  
    axiosWithAuth()
      .put(`/api/ads/user/${item.user_id}/update/${item.id}`, itemToBook)
      .then(res => {
        // window.location.reload();
        console.log('response log', res);
      })
      .catch(error => {
        console.log('Error', error);
    });
  }
      
  
  return (
    <div classname="item-detail">
      <div className='filler'></div>
      <div className='detail-top'>
        <div className='detail-top-section-L'>
      <img className='card-image' src={item.img_url} />
      </div>
      <div className='dash-top-section'>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>${item.price}/per day</p>
      <p>{item.item_condition}</p>
      {item.item_available && (
        <div className='item-available'>
        <h3>This item is available!</h3>
        <button onClick={bookItemFunc}>Rent Now</button>
        </div>
        )}
      {!item.item_available && (<h3>Sorry, this item has been rented</h3>)}
      </div>
    </div>
    <div className='reviews'>
      <h3>Great Quality! 	&#x2605; 	&#x2605; 	&#x2605; 	&#x2605; 	&#x2606;</h3>
      <h4>techrenter123</h4>
      <p>I rented this tech and it was very good. I would rent this tech again. If you want to rent techa, this is a good tech to rent. Rent my tech is a good place for renting tech and you should rent tech equipment from here all the time forever. Four stars because I had to drive kind of far to pick it up.</p>
    </div>
    </div>
  );
};

export default ItemDetail;
