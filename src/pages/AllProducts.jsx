import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const allProducts = useLoaderData();
    console.log(allProducts);

    return (
        <div>
            <h2 className='text-4xl font-semibold text-primary text-center py-6'>All <span className='text-secondary '>Products</span></h2>
            <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {
                    allProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProducts;    