import React, { useState } from 'react';
import axiosWithAuth from './utils/axiosWithAuth'
import Modali, { useModali } from 'modali';

const DashCard = ({ item, dashboard, setDashboard }) => {

const userid = localStorage.getItem("USERID");



  const {
    title,
    description,
    img_url,
    price,
    item_condition,
    item_available,
    negotiable
  } = item;

  const [editing, setEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({
    title: "",
    description: "",
    img_url: "",
    price: 300,
    item_condition: "",
    item_available: true,
    negotiable: true,
});
  const [exampleModal, toggleExampleModal] = useModali();

  const editItem = item => {
    toggleExampleModal();
    setEditing(true);
    setItemToEdit(item);
    
    console.log(item)
  };

  const editItemHandler= e => {
    setItemToEdit({ ...itemToEdit, 
        [e.target.name]: e.target.value })
        console.log(itemToEdit)
  }

  const saveEdit = ( e) => {
    // e.preventDefault();
    delete itemToEdit.id
    console.log(itemToEdit);
    axiosWithAuth()
      .put(`/api/ads/user/${userid}/update/${item.id}`, itemToEdit)
      .then(res => {
        setDashboard(
          dashboard.map(item => (item.id === res.data.id ? res.data : item))
        );
        console.log('response log', res, itemToEdit);
      })
      .catch(error => {
        console.log('Error', error);
    });
      
  }; 

  const deleteItem = item => {
    const userid = localStorage.getItem("USERID");
    console.log("start delete");
    axiosWithAuth()
      .delete(`/api/ads/user/${userid}/delete/${item.id}`)
      .then(res => {
        console.log("delete item fired");
        window.location.reload();
        // setDashboard(dashboard.filter(item => item.id !== res.data));
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

      
    return(
        <div className='item-card'>
             <img className='card-image' alt="" src={img_url}/>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>${price}/per day</p>
                <p>{item_condition}</p>
                <div className="button-row">
        <div onClick={() => deleteItem(item) + console.log("delete", item)}>
          <i class="fas fa-trash-alt"></i>
          </div>
        <div
          onClick={() => editItem(item) + console.log("edit", item, itemToEdit)}
        >
          <i class="fas fa-edit"></i>
        </div>
      </div>
      <Modali.Modal {...exampleModal}>
        {editing && (
          <form onSubmit={saveEdit}>
              title:
            <input
              onChange={editItemHandler}
              name='title'
              value={itemToEdit.title}
            />
            description:
            <input
              onChange={editItemHandler}
              name='description'
              value={itemToEdit.description}
            />
            Image URL:
            <input
              onChange={editItemHandler}
              name='img_url'
              value={itemToEdit.img_url}
            />
            <div className="button-row">
              <button type="submit">save</button>
            </div>
          </form>
        )}
      </Modali.Modal>
    </div>
  );
};

export default DashCard;