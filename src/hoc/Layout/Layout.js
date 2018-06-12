import React from 'react'

import NavBar from '../../Component/navBar/navBar'

const Layout = ( props ) => {
    return (
        <React.Fragment>
            <NavBar />
            {props.children}
        </React.Fragment>
    )
}

export default Layout