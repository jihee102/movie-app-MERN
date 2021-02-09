import React from 'react';
import { Col } from 'antd';

function GridCard(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <a href={`/movie/${props.movieId}`}>
            <img className='grid_img' src={props.image} alt='img' />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <img
            className='grid_img'
            src={props.image}
            alt={props.characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCard;
