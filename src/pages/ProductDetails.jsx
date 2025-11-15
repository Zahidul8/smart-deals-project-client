import React, { useEffect, useRef, useState } from 'react';
import { Link,  useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ProductDetails = () => {

  const {id} = useParams();
  const [productData,setProductData] =useState({});
  const [bidData, setBidData] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [refetch, setRefetch] = useState(false);

  const { _id:productId, title, price_min, price_max, email, category, created_at, image, status, location, seller_image, seller_name, condition, usage, description, seller_contact } = productData;


  useEffect(()=> {
    axiosSecure.get(`/products/${id}`)
    .then(data =>{
      setProductData(data.data)
    })
  },[axiosSecure, id])


  useEffect(() => {
      axiosSecure.get(`/productsBids/${productId}`)
    .then(data =>{
      setBidData(data.data)
    })
  },[axiosSecure,productId,refetch])

  console.log(bidData);
  

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const buyer_name = e.target.buyerName.value;
    const buyer_email = e.target.buyerEmail.value;
    const buyer_image = e.target.buyerImage.value;
    const bid_price = e.target.offerPrice.value;
    const buyer_contact = e.target.contactInfo.value;

    const newBid = {
      product: productId,
      title,
      price_min,
      price_max,
      image,
      seller_image,
      seller_name,
      seller_email: email,
      buyer_name,
      buyer_email,
      buyer_image,
      bid_price,
      buyer_contact,
      status
    };



    axiosSecure.post('/productsBids', newBid)
      .then(data => {

        if (data.data.duplicate) {
          modalRef.current.close();
          e.target.reset();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You already bid this product.",
          });
          return;
        }
        if (data.data.insertedId) {
          modalRef.current.close();
          e.target.reset();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Bid submitted successfully",
            showConfirmButton: false,
            timer: 1500
          });

          setRefetch(!refetch);

        }


      })

  }

  return (
    <div>
      <div className=" mx-auto py-10 px-4 flex flex-col lg:flex-row  gap-8">

        {/* LEFT — PRODUCT IMAGE */}
        <div className="col-span-1 lg:col-span-2 flex-1/2">
          <div className="w-full max-h-[450px] bg-white  rounded-xl p-4  flex justify-center items-center ">

            <img className='w-full max-w-[720px]  rounded-2xl max-h-[420px] object-cover' src={image} alt="" />

          </div>

          {/* Product Description */}
          <div className="mt-8 bg-white border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Product Description</h2>

            <div className="flex justify-between text-sm font-medium mb-4">
              <p className='text-primary'>Condition : <span className="font-normal">{condition}</span></p>
              <p className='text-primary'>Usage Time : <span className="font-normal">{usage}</span></p>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="space-y-6 text-primary flex-1/2">

          {/* Back Button */}
          <Link to='/allProducts' className="flex items-center gap-2 text-sm text-gray-600 hover:underline">
            ←  Back To Products
          </Link>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          {/* Category Tag */}
          <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            Art And Hobbies
          </span>

          {/* Price */}
          <div className="bg-white border rounded-xl p-5">
            <p className="text-green-600 font-bold text-2xl">${price_min} - {price_max}</p>
            <p className="text-gray-500 text-sm mt-1 text-primary">Price starts from</p>
          </div>

          {/* Product Details */}
          <div className="bg-white border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-3 text-primary">Product Details</h2>
            <p className="text-sm"><span className="font-medium">Product ID:</span> {productId}</p>
            <p className="text-sm"><span className="font-medium">Posted:</span> {created_at}</p>
          </div>

          {/* Seller Information */}
          <div className="bg-white border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Seller Information</h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full">
                <img src={seller_image} className=' w-10 h-10 object-cover rounded-full' alt="" />
              </div>
              <div>
                <h3 className="font-semibold">{seller_name}</h3>
                <p className="text-sm text-gray-600">crafts.by.{email}</p>
              </div>
            </div>

            <p className="text-sm"><span className="font-medium">Location:</span> {location}</p>
            <p className="text-sm"><span className="font-medium">Contact:</span> {seller_name}_{seller_contact}</p>

            <p className="text-sm mt-2 flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <span className="px-3 py-1 text-xs bg-yellow-400 text-white rounded-full">{status}</span>
            </p>
          </div>

          {/* Buy Button */}
          <button onClick={() => modalRef.current.showModal()} className="w-full py-4 rounded-xl text-white cursor-pointer font-semibold bg-gradient-to-r from-purple-500 to-indigo-500">
            I Want To Buy This Product
          </button>

        </div>

      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleBidSubmit} className="space-y-4 w-full">

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-primary">
              Give Seller Your Offered Price
            </h2>

            {/* Buyer Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-primary font-semibold">Buyer Name</label>
                <input
                  type="text"
                  name="buyerName"
                  required
                  placeholder="Your name"
                  className="input input-bordered w-full rounded-md"
                />
              </div>

              <div>
                <label className="text-primary font-semibold">Buyer Email</label>
                <input
                  type="email"
                  name="buyerEmail"
                  value={user.email}
                  readOnly
                  placeholder="Your Email"
                  className="input input-bordered w-full rounded-md"
                />
              </div>
            </div>

            {/* Buyer Image URL */}
            <div>
              <label className="text-primary font-semibold">Buyer Image URL</label>
              <input
                type="text"
                name="buyerImage"
                required
                placeholder="https://...your_img_url"
                className="input input-bordered w-full rounded-md"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-primary font-semibold">Place your Price</label>
              <input
                type="number"
                name="offerPrice"
                required
                placeholder="e.g. Artisan Roasters"
                className="input input-bordered w-full rounded-md"
              />
            </div>

            {/* Contact Info */}
            <div>
              <label className="text-primary font-semibold">Contact Info</label>
              <input
                type="text"
                name="contactInfo"
                required
                placeholder="e.g. +1-555-1234"
                className="input input-bordered w-full rounded-md"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white border-none"
            >
              Submit Bid
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


{/* product bid data  */}

<div>
  <h2 className='text-4xl font-semibold text-primary py-6'>
    Bids for this product: <span className='text-secondary'>{bidData.length}</span>
  </h2>

  <div className="text-primary max-w-11/12 mx-auto">

    {bidData.length > 0 && (
      <div className="overflow-x-auto w-full">   {/* ← Added for mobile responsiveness */}
        <table className="table">
          <thead className='text-primary'>
            <tr>
              <th className="w-12">St. No</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th className="w-40">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bidData.map((data, index) => (
              <tr key={data._id}>
                <td className="font-bold">{index + 1}</td>

                <td>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-gray-200"></div>
                    <div>
                      <div className="font-bold">
                        <Link to="/product/orange-juice" className="link link-hover text-base">{data.title}</Link>
                      </div>
                      <div className="text-sm opacity-50">${data.price_min} - {data.price_max}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-8 h-8 bg-gray-300"></div>
                    </div>
                    <div>
                      <div className="font-bold">{data.seller_name}</div>
                      <div className="text-sm opacity-50">crafts.by.{data.seller_email}</div>
                    </div>
                  </div>
                </td>

                <td className="font-bold">${data.bid_price}</td>

                <td>
                  <div className="flex space-x-2">
                    <button className="btn btn-success btn-xs text-white">Accept Offer</button>
                    <button className="btn btn-error btn-xs text-white">Reject Offer</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

  </div>
</div>



    </div>
  );
};

export default ProductDetails; 