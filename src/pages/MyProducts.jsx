import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [refectch, setRefetch] = useState(false);
    const modalRef = useRef();
    const [id, setId] = useState('');

    console.log(user);


    useEffect(() => {
        axiosSecure.get(`/products?email=${user.email}`)
            .then(data => {
                setProducts(data.data);

            })
    }, [user, refectch,axiosSecure])


    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                    .then(data => {
                        console.log(data.data);
                        if (data.data.deletedCount) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            const remainingProducts = products.filter(product => product._id !== id)
                            setProducts(remainingProducts);
                            
                        }

                    })

            }
        });


    }



    const handleUpdate = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const category = e.target.category.value;
        const price_min = e.target.price_min.value;
        const price_max = e.target.price_max.value;
        const status = e.target.status.value;

        const updateProduct = { title, category, price_min, price_max, status };
        axiosSecure.patch(`/products/${id}`, updateProduct)
            .then(data => {
                console.log(data.data);
                if (data.data.matchedCount) {
                    modalRef.current.close();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "product updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setRefetch(!refectch);
                    e.target.reset();

                }

            })

    }

    return (
        <div>
            <h2 className='text-4xl font-semibold text-primary text-center py-6'>My Products: <span className='text-secondary '>{products.length}</span></h2>

<div className="overflow-x-auto w-full">


            <table className="w-full border border-gray-200 rounded-xl">
                <thead className="bg-gray-50 text-gray-700">
                    <tr>
                        <th className="py-3 px-4 text-left">SL No</th>
                        <th className="py-3 px-4 text-left">Image</th>
                        <th className="py-3 px-4 text-left">Product Name</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-left">Price</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
            
                    
                

                {
                    products.map((product, index) => <tbody key={product._id} className='text-primary'>
                        <tr className="border-b">
                            <td className="py-3 px-4">{index + 1}</td>

                            <td className="py-3 px-4 rounded-md">
                                <div className="w-20 h-20 bg-gray-300 rounded-md">
                                    <figure >
                                        <img className='object-cover rounded-md ' src={product.image} alt="" />
                                    </figure>
                                </div>
                            </td>

                            <td className="py-3 px-4">{product.title}</td>
                            <td className="py-3 px-4">{product.category}</td>
                            <td className="py-3 px-4">$ {product.price_min}-{product.price_max}</td>

                            <td className="py-3 px-4">
                                <span className="px-3 py-1 rounded-full bg-yellow-400 text-white text-sm">
                                    {product.status}
                                </span>
                            </td>

                            <td className="py-10 px-4 flex items-center gap-2">
                                <button onClick={() => {
                                    modalRef.current.showModal();
                                    setId(product._id)
                                }} className="px-3 cursor-pointer py-1 text-sm border border-purple-400 text-purple-600 rounded">
                                    Edit
                                </button>

                                <button onClick={() => handleDeleteProduct(product._id)} className="px-3 cursor-pointer py-1 text-sm border border-red-400 text-red-500 rounded">
                                    Delete
                                </button>

                                <button className="px-3 cursor-pointer py-1 text-sm border border-green-400 text-green-600 rounded">
                                    Make Sold
                                </button>
                            </td>
                        </tr>
                    </tbody>)
                }

            </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleUpdate} className="space-y-5 p-6 bg-white rounded-xl shadow-md text-primary">

                        {/* Product Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Product Name</span>
                            </label>
                            <input
                                type="text"
                                name='title'
                                placeholder="Enter product name"
                                className="input input-bordered w-full rounded-md"
                            />
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select
                                name="category"
                                className="select select-bordered w-full"

                                required
                            >
                                <option value="" disabled>Select a Category</option>
                                <option>Electronics</option>
                                <option>Musical Instruments</option>
                                <option>Home Decor</option>
                                <option>Sports Equipment</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>

                        {/*min Price */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Price</span>
                            </label>
                            <input
                                type="number"
                                name='price_min'
                                placeholder="Enter min price"
                                className="input input-bordered w-full rounded-md"
                            />
                        </div>
                        {/* price max  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Price</span>
                            </label>
                            <input
                                type="number"
                                name='price_max'
                                placeholder="Enter max price"
                                className="input input-bordered w-full rounded-md"
                            />
                        </div>

                        {/* Status */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Status</span>
                            </label>
                            <select name="status" className="select select-bordered w-full rounded-md">
                                <option value='Pending'>Pending</option>
                                <option value='On sale'>On Sale</option>
                                <option value='Sold'>Sold</option>
                            </select>
                        </div>

                        {/* Edit / Save Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow hover:opacity-90 transition"
                        >
                            Update Product
                        </button>

                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyProducts; 