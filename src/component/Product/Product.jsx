import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/Cart/Cart";
import toast from "react-hot-toast";
import $ from "jquery";
import { wishlistContext } from "../../Context/Wishlist/Wishlist";
import axios from "axios";
import ArrowUp from "../ArrowUp/ArrowUp";
import { AuthenticationContext } from "../../Context/Authentication/Authentication";

const Product = () => {
  let { token, setToken } = useContext(AuthenticationContext);
  let { wishlistCounter } = useContext(wishlistContext);
  let navigate = useNavigate();
  let { numOfItems } = useContext(cartContext);

  let { addProductToWishlist, getUserWishlist, removeProductFromWishlist } =
    useContext(wishlistContext);
  let { addProductToCart } = useContext(cartContext);
  let [favList, setFavList] = useState(null);

  async function getfavList() {
    let { data } = await getUserWishlist();
    setFavList(data);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    getfavList();
  }, []);

  async function getAllProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data } = useQuery("allProduct", getAllProduct);

  async function addProduct(id) {
    let result = await addProductToCart(id);

    if (result.status === "success") {
      toast.success(result.message, {
        duration: 700,
        position: "top-right",
      });
    } else {
      toast.error("Error", {
        duration: 700,
        position: "top-right",
      });
    }
  }

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewType, setViewType] = useState('grid');

  const categories = [
    'ALL',
    'Electronics',
    "Women's Fashion",
    "Men's Fashion"
  ];

  useEffect(() => {
    if (data?.data?.data) {
      if (activeCategory === 'ALL') {
        setFilteredProducts(data.data.data);
      } else {
        setFilteredProducts(data.data.data.filter(product => product.category.name === activeCategory));
      }
    }
  }, [activeCategory, data]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            E-Motion
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse py-2" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {token ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link position-relative" to="/wishlist">
                      Wishlist
                      <i className="fa-solid fa-heart ms-1"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {wishlistCounter}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link position-relative" to="/cart">
                      Cart
                      <i className="fa-solid fa-cart-shopping ms-1"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {numOfItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-5 mt-5">
        <div id="webcrumbs" className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span>{filteredProducts.length}</span>
              <span>Products</span>
              <div className="flex space-x-1">
                <button className={`p-1 ${viewType === 'grid' ? 'bg-main text-white' : ''}`} onClick={() => setViewType('grid')}>
                  <i className="material-symbols-outlined">grid_view</i>
                </button>
                <button className={`p-1 ${viewType === 'list' ? 'bg-main text-white' : ''}`} onClick={() => setViewType('list')}>
                  <i className="material-symbols-outlined">view_list</i>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex category space-x-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-1 ${activeCategory === category ? 'bg-main text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <span className="cursor-pointer">Sort By</span>
                <span className="text-main">Newest First</span>
                <i className="material-symbols-outlined text-green-700">expand_more</i>
              </div>
            </div>
          </div>
        </div>

        <ArrowUp />
        <div className={`row g-3 mt-3 ${viewType === 'list' ? 'list-view' : ''}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((element, index) => (
              <div key={index} className={`col-md-3 p-2 product rounded-2 col-sm-4 ${viewType === 'list' ? 'col-12' : ''}`}>
                <Link to={`/details/${element._id}`} className="text-decoration-none text-black">
                  <img
                    src={element.imageCover}
                    alt={element.title}
                    className={`w-100 mb-2 ${viewType === 'list' ? 'list-image' : ''}`}
                  />
                  <h6 className="text-info-emphasis">
                    {element.category.name}
                  </h6>
                  <h5>{element.title.split(" ").slice(0, 2).join(" ")}</h5>
                  <h6 className="text-danger">Price {element.price} EGP</h6>
                </Link>
                {favList?.find((item) => item._id === element._id) ? (
                  <div className="d-flex align-items-center justify-content-between my-3">
                    <i
                      onClick={(e) => {
                        $(e.target).css({ color: "gray" });
                        removeProductFromWishlist(element._id);
                      }}
                      style={{ cursor: "pointer", color: "red" }}
                      className="fas fa-heart love"
                    ></i>
                    <span>
                      <i className="fas fa-star text-warning"></i>
                      {element.ratingsAverage}
                    </span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-between my-3">
                    <i
                      onClick={(e) => {
                        $(e.target).css({ color: "red" });
                        addProductToWishlist(element._id);
                      }}
                      style={{ cursor: "pointer", color: "gray" }}
                      className="fas fa-heart love"
                    ></i>
                    <span>
                      <i className="fas fa-star text-warning"></i>
                      {element.ratingsAverage}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => {
                    addProduct(element._id);
                  }}
                  className="btn bg-main text-white mb-2 w-100 p-1 fw-semibold"
                >
               Add To Cart
                </button>
              </div>
            ))
          ) : (
            <div className="d-flex align-items-center justify-content-center vh-100 fixed-top z-3 bg-white">
              <img
                src={require("../../images/loading2.gif")}
                style={{ width: "200px", height: "200px" }}
                alt="loading"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
