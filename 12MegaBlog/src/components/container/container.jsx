import React from 'react'

function container({ children }) {
    return(
        <div className='w-fill max-w-7xl mx-auto px-4'>
            {children}
        </div>
    )
}

export default container