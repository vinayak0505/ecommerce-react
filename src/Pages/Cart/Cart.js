import React, { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseinit";
import { useUserValue } from "../../Logic/auth";

const Cart = () => {
  const userId = useUserValue().userId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId == null) return;
    const unsubscribe = onSnapshot(doc(db, "cart", userId), (doc) => {
      setData(() => doc.data() ?? []);
      setLoading(false);
    });
    return unsubscribe;
  }, [userId]);

  const total = () => {
    if (!userId || !data) return 0;
    var ans = 0;
    Object.values(data)?.forEach((p) => (ans += p.price * 100 * p.count));
    return ans;
  };

  const plusProduct = async (product) => {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data[product.id]) {
      product.count = data[product.id].count + 1;
    } else {
      product.count = 1;
    }
    console.log(product);
    data[product.id] = product;
    console.log(data);
    setDoc(docRef, data);
  };

  const minusProduct = async (product) => {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    product.count = data[product.id].count - 1;
    if (data[product.id].count === 1) {
      delete data[product.id];
    } else {
      data[product.id] = product;
    }
    console.log(data);
    setDoc(docRef, data);
  };

  const buy = async () => {
    if (loading || data?.values?.length === 0) return;
    setLoading(true);
    const cartRef = doc(db, "cart", userId);
    const boughtRef = doc(db, "bought", userId);
    const docSnap = await getDoc(boughtRef);
    const boughtData = docSnap.data()?.item;
    const item = boughtData ? [...boughtData, data] : [data];
    const promises = [setDoc(cartRef, {}), setDoc(boughtRef, { item })];
    await Promise.all(promises);
    setLoading(false);
  };

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

  const ShowProducts = () => {
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
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {Object.values(data).length} items
                          </h6>
                        </div>
                        <hr className="my-4" />
                        {Object.values(data)?.map((product) => (
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
                                <h6 className="text-muted">
                                  {product.category}
                                </h6>
                                <h6 className="text-black mb-0">
                                  {product.title}
                                </h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() => minusProduct(product)}
                                >
                                  <img
                                    src="/minus.png"
                                    style={{ height: 10 }}
                                    alt="minus"
                                  />
                                </button>
                                <button className="btn px-2">
                                  {product.count}
                                </button>
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() => plusProduct(product)}
                                >
                                  <img
                                    src="/plus.png"
                                    style={{ height: 10 }}
                                    alt="minus"
                                  />
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

                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link to={"/"} className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              Back to shop
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            items {Object.values(data).length}
                          </h5>
                          <h5>Rs {total()}</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <h5>Shipping</h5>
                          <h5>Rs 100</h5>
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>Rs {total() + 100}</h5>
                        </div>

                        <button
                          type="button"
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                          onClick={buy}
                        >
                          buy
                        </button>
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
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Cart;
