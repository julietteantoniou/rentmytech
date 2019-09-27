import React from 'react';
import { Link } from "react-router-dom";

function ItemsCard ({ item }) {
    const {title, description, img_url, price, item_condition} = item;
    return(
        <div className='item-card'>
            <Link to={`/item/${item.id}`}>
            <img className='card-image' alt="" src={img_url}/>
            <h3>{title}</h3>
            <p>${price}/per day</p>
            </Link>
        </div>
    )
}

export default ItemsCard;
