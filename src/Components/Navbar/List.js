/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom';

export default function List({Links}){
    
    return(
        <header
            // style={{
            //     position: 'fixed',
            //     zIndex: '2'
            // }}
        >
        <nav style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            backgroundColor: "red",
            padding: '0',
        }}>
            <img
					src='https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg'
                    alt='logo'
                    style={{
                        padding: '0 0.8em',
                        margin: '1em 0.5em',
                        width: '70px',
                    }}
			/>
            
            {
                Links.map(
                    (link, index)=>{
                        return <Link key={index} to={link.route}
                                css={css`
                                    &:hover{
                                        background-color: darkred
                                    }
                                    margin: 0 0;
                                    height: 100%;
                                    padding: 1em;
                                `}
                                
                                >
                                    {link.name}
                                </Link>
                    }
                )
            }

            
            
            
        </nav>
        </header>
    )
}