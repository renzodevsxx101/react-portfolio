import React from 'react';

function Skill({ source, alt, title}) {
    return source ? (
        <img
            src={source}
            alt={alt}
            title={title}
            className='icon'
        />
    ) : (
        <div className='icon flex items-center justify-center text-sm font-semibold text-center px-2' title={title}>
            {title}
        </div>
    );
}

export default Skill;
