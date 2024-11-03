import React from 'react';

function Skill({ source, alt, title}) {
    return (
        <img
            src={source}
            alt={alt}
            title={title}
            className='icon'
        />
    );
}

export default Skill;
