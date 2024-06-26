import React, { useState, useEffect, useRef } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebaseinit";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducer/authReducer";
import { toast } from "react-toastify";

/**
 * Home.js
 *
 * This file contains the Home component, which represents the homepage of the application.
 * It fetches data from an API, displays the data in a UI, and allows users to interact with the data.
 *
 * The Home component includes the following functions and features:
 * - Fetches data from the "https://fakestoreapi.com/products/" API endpoint.
 * - Uses React hooks to manage state and data.
 * - Displays a loading UI while the data is being fetched.
 * - Renders the fetched data in a responsive grid layout.
 * - Allows users to add products to a cart by clicking on a "Add to Cart" button.
 * - Redirects users to the login page if they are not authenticated.
 *
 * Usage:
 * Import this file and use the Home component in the desired location of your application.
 * Ensure that the necessary dependencies, such as React Router and Redux, are properly set up.
 *
 * Example:
 * import Home from './Home';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Home />
 *     </div>
 *   );
 * }
 *
 * export default App;
 */
const Home = () => {
  const userId = useSelector(authSelector).userId;
  // data or values form the api
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  // data or values form the api after appling filter
  const [filter, setFilter] = useState(data);
  // loading state till the data is loaded
  const [loading, setLoading] = useState(true);
  // mounted to check if the ui i on the screen or not
  const mounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId == null) return;
    const unsubscribe = onSnapshot(doc(db, "cart", userId), (doc) => {
      setUserData(() => doc.data() ?? []);
    });
    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    // fetch data from api
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (mounted.current) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        mounted.current = false;
      };
    };

    getProducts();
  }, []);

  // add product to firebase
  const addProduct = async (product) => {
    if (userId == null) {
      navigate("/login");
      return;
    }
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() ?? {};
    if (data && data[product.id]) {
      product.count = data[product.id].count + 1;
    } else {
      product.count = 1;
    }
    data[product.id] = product;
    setDoc(docRef, data);
    toast.success("Product added to cart");
  };

  // loading ui
  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  // filter data on pressing the catogaory
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  // show prodct ui to display button and product that is fetched
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">
                    Rs {product.price * 100}
                  </li>
                  <button
                    className="button"
                    onClick={() => addProduct(product)}
                  >

                    {(userData[product.id]?.count) ? (userData[product.id]?.count + " in cart") : "Add to Cart"}
                  </button>
                </ul>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-1 py-1">
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Home;
