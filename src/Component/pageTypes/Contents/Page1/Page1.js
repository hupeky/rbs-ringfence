import React from 'react'

const page1 = ( props ) => {
    console.log( props )
    return (
        <React.Fragment>
            <div> Page 1</div>
            <button onClick={() => props.click(2)}>Go to page two</button>
        </React.Fragment>
    )
}

export default page1