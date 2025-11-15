import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Link, useLoaderData } from 'react-router';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const productsData = useLoaderData();
 
    
    return (
        <div>
        <div className="relative overflow-hidden bg-gradient-to-r from-[#FFE6FD] via-[#F6FBFA] to-[#E0F8F5] py-24 text-center space-y-8">
            <h1 className='text-5xl font-bold text-primary'>Deal Your <span className='text-secondary'>Products</span> <br />
                In A <span className='text-secondary'>Smart</span> Way !</h1>
            <p className='text-primary'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
            <div>
                <div className="flex justify-center items-center">
                    <input className="input join-item" placeholder="search For Products, Categoriees..." />
                    <button className="btn  join-item btn-gradient "><IoSearchOutline /></button>
                </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <Link to='/allProducts' className='btn btn-gradient'>Watch All Products</Link>
                <Link to='/createAProduct' className='btn border border-secondary hover:bg-secondary hover:text-white bg-transparent'>Post an Product</Link>
            </div>
        </div>

        {/* Recent products  */}
        <section>
            <h2 className='text-4xl font-semibold text-primary text-center py-6'>Recent <span className='text-secondary '>Products</span></h2>

        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                productsData.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
            }
        </div>
        </section>
        </div>
    );
};

export default Home;