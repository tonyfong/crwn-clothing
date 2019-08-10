import React from 'react';
import './menu-item.style.scss';

const MenuItem = ({title, subtitle, imageUrl, size}) => (
    <div 
        className={`${size} menu-item`}>
        <div 
            className='background-image'
            style={{
            backgroundImage: `url(${imageUrl})`
        }}>
        </div>
        <div className="content"> 

            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOW NOW</span>
        </div>
    </div>

);

export default MenuItem;