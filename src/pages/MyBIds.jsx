import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyBIds = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [bidsData, setBidsData] = useState([]);




    useEffect(() => {
        axiosSecure.get(`/productsBids?email=${user.email}`)
            .then(data => {
                console.log(data.data);
                setBidsData(data.data);

            })

    }, [user,axiosSecure])

    const handleRemoveBids = (id) => {
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
                axiosSecure.delete(`/productsBids/${id}`)
                    .then(data => {
                        console.log(data.data);
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                            
                            const remainingBids = bidsData.filter(bids => bids._id !== id)
                            setBidsData(remainingBids)
                            
                        }


                    })

            }
        });


    }
    return (
        <div>
            <h2 className='text-4xl font-semibold text-primary text-center py-6'>My Bids: <span className='text-secondary '>{bidsData.length}</span></h2>
            <div className="overflow-x-auto w-full border border-dashed border-gray-300 rounded-lg p-2">
                <table className="table w-full">
                    {/* Table Header (<thead>) */}
                    <thead>
                        <tr>
                            <th className="font-medium text-gray-500">SL No.</th>
                            <th className="font-medium text-gray-500">Product</th>
                            <th className="font-medium text-gray-500">Seller</th>
                            <th className="font-medium text-gray-500">Bid Price</th>
                            <th className="font-medium text-gray-500">Status</th>
                            <th className="font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body (<tbody>) containing one static row */}
                    <tbody>
                        {
                            bidsData.map((data, index) => <tr key={data._id} className="hover:bg-base-100/50">
                                {/* SL No. */}
                                <td className="text-gray-700 font-light">{index + 1}</td>

                                {/* Product */}
                                <td>
                                    <div className="flex items-center space-x-3">
                                        {/* Placeholder for Product Image */}
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 bg-gray-200 rounded-md">
                                                {/* Image goes here */}
                                                <img src={data.image} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{data.title}</div>
                                            <div className="text-sm text-gray-500 opacity-80">${data.price_min}-{data.price_max}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Seller */}
                                <td>
                                    <div className="flex items-center space-x-3">
                                        {/* Placeholder for Seller Avatar */}
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full bg-gray-200">
                                                {/* Avatar goes here */}
                                                <img src={data.seller_image} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{data.seller_name}</div>
                                            <div className="text-sm text-gray-500 opacity-80">crafts.by.{data.seller_email}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Bid Price */}
                                <td className="text-gray-700 font-medium">${data.bid_price}</td>

                                {/* Status */}
                                <td>
                                    {/* DaisyUI 'badge-warning' for the 'Pending' status */}
                                    <span className="badge badge-warning text-white font-normal">
                                        Pending
                                    </span>
                                </td>

                                {/* Actions */}
                                <th>
                                    {/* DaisyUI 'btn-outline btn-error' for the 'Remove Bid' button */}
                                    <button onClick={() => handleRemoveBids(data._id)} className="btn btn-sm btn-outline btn-error normal-case">
                                        Remove Bid
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBIds;