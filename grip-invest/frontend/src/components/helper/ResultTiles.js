import React from 'react';
import PropTypes from 'prop-types';


const ResultTiles = ({name, value}) => {
    return (
        <div className="result__tiles">
            <p>{name}</p>
            <h2 dangerouslySetInnerHTML={{__html: value}}></h2>
        </div>
    );
};


ResultTiles.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any
};


export default ResultTiles;
