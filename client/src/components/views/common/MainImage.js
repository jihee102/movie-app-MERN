import React from 'react';
import { Typography, Row } from 'antd';

const { Title } = Typography;

function MainImage(props) {
  return (
    <div
      className='movieMainImg'
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div>
        <div className='landing__textBox'>
          <Title style={{ color: 'white' }} level={2}>
            {props.title}
          </Title>
          <p className='landing__textP'>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
