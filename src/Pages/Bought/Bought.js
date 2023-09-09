import React, { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseinit";
import { useUserValue } from "../../Logic/auth";

const Bought = () => {
  const userId = useUserValue().userId;
  // bought data loading in firebase
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId == null) return;
    const unsubscribe = onSnapshot(doc(db, "bought", userId), (doc) => {
      const value = doc.data()?.item;
      setData(() => value);
      setLoading(false);
    });
    return unsubscribe;
  }, [userId]);

  const total = (data) => {
    if (userId == null) return 0;
    var ans = 0;
    Object.values(data).forEach((p) => (ans += p.price * 100 * p.count));
    return ans;
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-1 text-center">
          <Skeleton height={100} />
        </div>
        <div className="col-12 py-1 text-center">
          <Skeleton height={100} />
        </div>
        <div className="col-12 py-1 text-center">
          <Skeleton height={100} />
        </div>
        <div className="col-12 py-1 text-center">
          <Skeleton height={100} />
        </div>
        <div className="col-12 py-1 text-center">
          <Skeleton height={100} />
        </div>
      </>
    );
  };

  const ShowProducts = ({ i, data }) => {
    return (
      <div className="h-100 h-custom" style={{ "background-color": "#d2c9ff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ "border-radius": "15px" }}
              >
                <div className="card-body p-0">
                  <div className="">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          Bill No - {i}
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {Object.values(data).length} items
                        </h6>
                      </div>
                      <hr className="my-4" />
                      {Object.values(data).map((product) => (
                        <>
                          <div className="row mb-4 d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={product.image}
                                className="img-fluid rounded-3"
                                alt={product.title}
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{product.category}</h6>
                              <h6 className="text-black mb-0">
                                {product.title}
                              </h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button className="btn px-2">
                                {product.count}
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">
                                Rs {product.price * 100 * product.count}
                              </h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a href="#!" className="text-muted">
                                <i className="fas fa-times"></i>
                              </a>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </>
                      ))}

                      <div className="d-flex justify-content-between mb-4">
                        <h5>Shipping</h5>
                        <h5>Rs 100</h5>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>Rs {total(data) + 100}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Products = () => (
    <>
      {data &&
        data.map((product, i) => {
          return <ShowProducts i={i + 1} data={product} />;
        })}
    </>
  );
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row justify-content-center">
          {loading ? <Loading /> : <Products />}
        </div>
      </div>
    </>
  );
};

export default Bought;
