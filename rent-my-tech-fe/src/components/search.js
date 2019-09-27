import React, { useState } from 'react';

const [searchTerm, setSearchTerm] = useState('');

const Search = () => {

    const searchHandler = e => {
        setSearchTerm({[e.target.name]: e.target.value})
    }

    const submitSearch = e => {
        itemList.filter()
    }

    return(
        <form onSumbit = {submitSearch}>
            <input type= 'text' placeholder='search for tech'/>
            <button type= 'submit'>Search</button>
        </form>
    )
}