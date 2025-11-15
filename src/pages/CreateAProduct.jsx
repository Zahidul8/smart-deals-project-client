import React from 'react';
import { FaPlusCircle } from 'react-icons/fa'; // Example react icon
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CreateProduct = () => {


  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const price_min = form.minPrice.value;
    const price_max = form.maxPrice.value;
    const email = form.email.value;
    const category = form.category.value;
    const created_at = new Date();
    const image = form.imageUrl.value;
    const location = form.location.value;
    const seller_image = form.sellerImageUrl.value;
    const seller_name = form.sellerName.value;
    const condition = form.condition.value;
    const usage = form.usageTime.value;
    const description = form.description.value;
    const seller_contact = form.sellerContact.value;

    const newProduct = {
      title,
      price_min,
      price_max,
      email,
      category,
      created_at,
      image,
      status: 'unsold',
      location,
      seller_image,
      seller_name,
      condition,
      usage,
      description,
      seller_contact
    }

    axiosSecure.post('/products', newProduct)
      .then(data => {
        console.log(data.data);
        if (data.data.insertedId) {
              Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Product created successfully",
            showConfirmButton: false,
            timer: 1500
          });
          e.target.reset();
          
        }

      })


  }



  return (
    <div className="flex justify-center items-center p-4 my-10 text-primary">
      <div className="card bg-white shadow-xl p-6 md:p-8 lg:p-10 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Create a Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              className="input input-bordered w-full"

              required
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

          {/* Min Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Min Price You want to Sale ($)</span>
            </label>
            <input
              type="number"
              name="minPrice"
              placeholder="e.g. 18.5"
              className="input input-bordered w-full"

              step="0.01"
              required
            />
          </div>

          {/* Max Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Max Price You want to Sale ($)</span>
            </label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Optional (default = Min Price)"
              className="input input-bordered w-full"

              step="0.01"
            />
          </div>

          {/* Product Condition */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Condition</span>
            </label>
            <div className="flex space-x-4">
              <div className="form-control">
                <label className="label cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name="condition"
                    value="Brand New"
                    className="radio checked:bg-purple-500"
                  // checked={product.condition === 'Brand New'}
                  // onChange={handleChange}
                  />
                  <span className="label-text">Brand New</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name="condition"
                    value="Used"
                    className="radio checked:bg-purple-500"
                  // checked={product.condition === 'Used'}
                  // onChange={handleChange}
                  />
                  <span className="label-text">Used</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Usage time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Usage time</span>
            </label>
            <input
              type="text"
              name="usageTime"
              placeholder="e.g. 1 year 3 month"
              className="input input-bordered w-full"

            />
          </div>

          {/* Product Image URL */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Your Product Image URL</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://..."
              className="input input-bordered w-full"

              required
            />
          </div>

          {/* Seller Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Seller Name</span>
            </label>
            <input
              type="text"
              name="sellerName"
              placeholder="e.g. Artisan Roasters"
              className="input input-bordered w-full"

              required
            />
          </div>

          {/* Seller Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Seller Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              placeholder="e.g. leli31955@nrjord.com"
              className="input input-bordered w-full"

              required
            />
          </div>

          {/* Seller Contact */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Seller Contact</span>
            </label>
            <input
              type="number"
              name="sellerContact"
              placeholder="e.g. +1-555-1234"
              className="input input-bordered w-full"

            />
          </div>

          {/* Seller Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Seller Image URL</span>
            </label>
            <input
              type="url"
              name="sellerImageUrl"
              placeholder="https://..."
              className="input input-bordered w-full"

            />
          </div>

          {/* Location */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="City, Country"
              className="input input-bordered w-full"

              required
            />
          </div>

          {/* Simple Description */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Simple Description about your Product</span>
            </label>
            <textarea
              name="description"
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough......"
              className="textarea textarea-bordered h-24 w-full"

            ></textarea>
          </div>

          {/* Create Product Button */}
          <div className="md:col-span-2 mt-6">
            <button type="submit" className="btn  w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:bg-purple-700 border-none text-white">
              <FaPlusCircle className="mr-2" /> Create A Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;