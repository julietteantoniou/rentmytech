import React from "react";
import Login from './Login.js'
import SignUp from './SignUp.js'
import AddItem from './AddItem.js'
import Dashboard from './Dashboard.js'
import ItemsList from './ItemsList'
import PrivateRoute from './PrivateRoute'
import { Link, Route, Switch } from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import styled from "styled-components";
import ItemPage from './ItemPage'
import { createBrowserHistory } from "history"

const Styles = styled.div`
  .navbar{
    background-color: #222;
    height: 7.5vh;
  }

  a, .navbar-brand, navbar-nav, .nav-link, .nav-item {
    color: #bbb;
    font-size: 1.4rem;
    font-weight: bold;

    &:hover {
      color: white;
    }
  }

  .nav-item {
    margin: auto 5px;
  }
`;



const Navigation = (props) => {

  const userid = localStorage.getItem("USERID");

    const logout = ()=>{
        localStorage.clear();
      
    }
    
    return(
  <Styles>
    <Navbar expand= "lg">
      <Link to='/itemslist'><Navbar.Brand >Rent My Tech</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!userid && (<>
            <Nav.Item><Link to="/login">Log In</Link></Nav.Item>
            <Nav.Item><Link to="/signup">Sign Up</Link></Nav.Item></>)}
          
          
          {/* <Nav.Item> <Link to="/additem">Post your Tech</Link></Nav.Item> */}
          {userid && (<><Nav.Item><Link to="/dashboard">Dashboard</Link></Nav.Item>
          <Link to='/'><Nav.Item onClick={logout}>Log Out</Nav.Item></Link>
          </>)}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      <Switch>
        <Route exact path='/' component={ItemsList}/>
         <Route exact path='/ItemsList' component={ItemsList} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/item/:id' 
             render={props => <ItemPage 
            {...props} />}/>
         <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/additem' component={AddItem} />
          {/* <PrivateRoute path='/itemdetail' component={ItemPage} /> */}
    </Switch> 
  </Styles>
)
    };



export default Navigation;   