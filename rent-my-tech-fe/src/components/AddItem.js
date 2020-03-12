import React, {useState} from 'react';
import axios from 'axios';
import axiosWithAuth from './utils/axiosWithAuth';

const AddItem = (props) => {

    const [item, setItem] = useState({title:"",description:"", make: "", model: "",  img_url:"", daily_cost:20.00, condition:"Excellent", category: "Accessories", available: true})

    const handleItem = event => {
        setItem({...item,
        [event.target.name]: event.target.value})
        console.log(item)
    }

    const submitItem = e =>{
        e.preventDefault();
        const id = localStorage.getItem('userId')
        const postObj = {
            user_id: id,
            ...item
        }
        console.log(postObj)
        axiosWithAuth()
        .post(`/api/tech/tech`, postObj)
            .then(res =>{
                console.log(postObj)
                console.log(res)
                props.history.push('/dashboard')
            })
            .catch(err => console.log(err.message))
    }

    return(
        <div className='additem-form'>
            <h3>Add New Item to Rent:</h3>
            <form>
            <span>Title:</span>
            <input type='text'
                   name= 'title'
                   value={item.title}
                   onChange={handleItem}
                   />
            <span>Description:</span>
            <input type='textarea'
                   name='description'
                   value={item.description}
                   onChange={handleItem}
                   />
            <span>Make:</span>
            <input type='text'
                   name='make'
                   value={item.make}
                   onChange={handleItem}
                   />
            <span>Model:</span>
            <input type='text'
                   name='model'
                   value={item.model}
                   onChange={handleItem}
                   />
            <span>Image Url</span>
            <input type='text'
                   name='img_url'
                   value={item.img_url}
                   onChange={handleItem}
                   />
            <span>Daily Cost:</span>
            <input type='text'
                   name='daily_cost'
                   value={item.daily_cost}
                   onChange={handleItem}
                   />
            <span> Condition:</span>
            <select name='item_condition' value={item.item_condition}onChange={handleItem}>
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
            </select>
            <span>Category</span>
            <select
                   name= 'category'
                   value={item.category}
                   onChange={handleItem}
                   >
                <option>Accessories</option>
                <option>Audio</option>
                <option>Cameras</option>
                <option>Computers</option>
                <option>Gadgets</option>
                <option>Phones</option>
                <option>Televisions</option>
            </select>
            <button onClick={submitItem}>List Item</button>
            </form>
        </div>
    )
}

export default AddItem;