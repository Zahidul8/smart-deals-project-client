import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
    

        <div className='bg-[#E9E9E9]'>
            <header>
                <Navbar></Navbar>
            </header>

            <main className='max-w-11/12 mx-auto min-h-[calc(100vh-277px)] '>
            <Outlet></Outlet>
            </main>

        <footer>
            <Footer></Footer>
        </footer>
        </div>
       
    );
};

export default RootLayout;