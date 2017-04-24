import React from 'react';
import { connect } from 'react-redux';

const Gallery = ({ route: { images } }) => (
    <div id="gallery">
        <h1 style={{marginLeft: '12px'}}>Gallery</h1>
        {images.map((imageName, index) => <img key={index} src={`./resources/images/gallery/${imageName}`} />)}
    </div>
);

export default connect(store => ({

}))(Gallery);
