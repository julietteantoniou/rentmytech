import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemDetail from './ItemDetail';
import axiosWithAuth from './utils/axiosWithAuth';

const ItemPage = (props) => {
    
    const [itemDetail, setItemDetail] = useState();
    const id = props.match.params.id;
    console.log(id)
    

    useEffect(() => {

        axiosWithAuth().get(`https://tech-stuff.herokuapp.com/api/ads/${id}`)
        .then(response => {
            setItemDetail(response.data.result)
            console.log(response.data.result)
        })
        .catch(error => {
            console.log('Error:', error)
        })
    },[])

    if (!itemDetail) {
        return(
        <div>Page loading information</div>)
    }
    return (
        <div>
            {itemDetail.map(item =>{
                return <ItemDetail item={item} />
            })}
        </div>
    );
}

export default ItemPage;