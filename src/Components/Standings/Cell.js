import React from 'react';

export default function Cell({element}){
    return (
        <td 
            style={{
                padding: '1.0em'
            }}
        >
            {element}
        </td>
    )
}