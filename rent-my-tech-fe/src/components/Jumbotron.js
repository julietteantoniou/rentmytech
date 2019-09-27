import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import TechLayout from '../PicsDefaults/TechLayout.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${TechLayout}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        {/* this was meant for add an image behind the login box for styling */}
      </Container>
    </Jumbo>
  </Styles>
)