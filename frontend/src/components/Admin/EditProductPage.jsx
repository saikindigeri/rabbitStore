
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false); // Image uploading state

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      console.log("uploading")
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {"Content-Type": "multipart/form-data"},
        }
      );
      console.log("sai")
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      console.log(data.imageUrl);
      setUploading(false);
    } catch (error) {
      console.log("failed")
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting productData:", productData);
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="" className="font-semibold block mb-2">
            Product Name
          </label>
          <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="" className="font-semibold block mb-2">
            Description
          </label>
          <textarea
            rows={4}
            required
            className="w-full border border-gray-500 rounded-md p-2"
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="font-semibold block mb-2">
            Price
          </label>
          <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="font-semibold block mb-2">
            Count in Stock
          </label>
          <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="" className="font-semibold block mb-2">
            SKU
          </label>
          <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="font-semibold block mb-2">
            Sizes (comma-separated)
          </label>
          <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="text"
            name="sizes"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="font-semibold block mb-2">
            Colors (comma-separated)
          </label>
          <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="text"
            name="colors"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            required
          />
        </div>

  {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Upload Image
          </label>
          <input type="file" onChange={handleImageUpload} />
 {uploading && <p>Uploading image...</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rouned-md shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
