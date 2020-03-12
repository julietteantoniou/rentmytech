import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemDetail from './ItemDetail';
import axiosWithAuth from './utils/axiosWithAuth';

const ItemPage = (props) => {
    
    const [itemDetail, setItemDetail] = useState();
    const id = props.match.params.id;
    // console.log(id)
    

    useEffect(() => {

        axios.get(`https://techrental.herokuapp.com/api/tech/tech/${id}`)
        .then(response => {
            console.log(response.data)
            setItemDetail(response.data)
            console.log('hi')
        })
        .catch(error => {
            console.log('Error:', error)
        })
    },[])
    console.log(itemDetail)

    if (!itemDetail) {
        return(
        <div>Page loading information</div>)
    } 

        return (
            <div>
           
            <ItemDetail item={itemDetail} />
         
        </div>
    );

}

export default ItemPage;