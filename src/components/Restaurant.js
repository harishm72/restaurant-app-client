import React from 'react';

const Restaurant = (props) =>{
    let {rest} = props
        return <div className="featured">
             <img className="featured-img"  src={rest.featured_image} onError={(e)=>{e.target.onerror = null; e.target.src="./fallback.jpeg"}}alt=""></img>
             <div className="rest-info">
                <p>{rest.name}</p>
                <p>{rest.location.city}</p>
             </div>
        </div>
}
export default Restaurant;