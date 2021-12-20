import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout =({children}) =>{
    return(
        <>
        <div>
            <Header title='Setel Test'/>
        </div>
        <main>{children}</main>
        <div><Footer/></div>
        </>
    )
}

export default Layout;