import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";

import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import loadingImage from "../../assets/images/loading.svg";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import { cartActions } from "../../redux/slices/cart.slice";
import {
  checkCode,
  createTransaction,
} from "../../utils/dataProvider/transaction";
import useDocumentTitle from "../../utils/documentTitle";
import { n_f } from "../../utils/helpers";

function Cart({ cartItems }) {
  const userInfo = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // const [cart, setCart] = useState([]);
  const cartRedux = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.profile);
  const [remove, setRemove] = useState({
    product_id: "",
    size_id: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = cartRedux.list;
  const [result, setResult] = useState("");

  const [form, setForm] = useState({
    payment: "",
    delivery_address: "",
    notes: "",
    phone_number: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = async () => {
    try {
      if (!cart.length) {
        setMessage("Keranjang kosong, tambahkan produk terlebih dahulu.");
        return;
      }

      const productId = cart[0].product_id;

      console.log("Menggunakan promo untuk product_id:", productId);

      const response = await axios.get(
        `http://localhost:3000/apiv1/promo/check?code=${promoCode}&productId=${productId}`
      );

      console.log("API Response:", response.data);

      // Validasi berhasil, panggil checkPromo untuk diskon
      if (response.status === 200) {
        setDiscount(response.data.data.discount);
        setForm({
          ...form,
          promo_id: response.data.data.id,
        });

        toast.success("Promo code berhasil digunakan");
      }
    } catch (error) {
      console.log("API Error:", error.response?.data);
      toast.error(error.response.data.msg);
    }
  };

  function onChangeForm(e) {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    if (profile.isFulfilled) {
      setForm({
        ...form,
        phone_number: profile.data?.phone_number,
        delivery_address: profile.data?.display_name,
      });
    }
  }, [profile]);

  const Loading = (props) => {
    return (
      <section className="min-h-[80vh] flex items-center justify-center flex-col">
        <div>
          <img src={loadingImage} alt="" />
        </div>
      </section>
    );
  };

  const toggleEdit = () => setEditMode(!editMode);
  const saveEditInfo = () => {
    toggleEdit();
  };

  const disabled = form.delivery_address === "" || form.notes === "";
  const controller = useMemo(() => new AbortController());
  const payHandler = () => {
    if (disabled) return;
    if (userInfo.token === "") {
      toast.error("Eits, login dulu baru bayar");
      navigate("/auth/login");
      return;
    }
    if (editMode) return toast.error("Ada yang belum disimpen tuh");
    if (cart.length < 1) return toast.error("Keranjang kamu masih kosong nih");
    setIsLoading(true);
    console.log({
      payment_id: form.payment,
      promo_id: form?.promo_id || 0,
      delivery_id: 1,
      address: form.delivery_address,
      notes: form.notes,
    });

    createTransaction(
      {
        payment_id: form?.payment || 1,
        promo_id: form?.promo_id || 0,
        delivery_id: 1,
        address: form.delivery_address,
        notes: form.notes,
      },
      cart,
      userInfo.token,
      controller
    )
      .then(() => {
        toast.success("Pesanan berhasil dibuat");
        dispatch(cartActions.resetCart());
        navigate("/history");
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error ocurred, please check your internet connection");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkPromo = () => {
    setIsLoading(true);
    checkCode(promoCode, productId, userInfo.token, controller)
      .then((data) => {
        const res = data?.data?.data;

        setDiscount(res.discounted_price);
        setForm({
          ...form,
          promo_id: res.id,
        });

        toast.success("Promo code berhasil digunakan");
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error ocurred, please check your internet connection");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeRemoveModal = () => {
    setRemove({ product_id: "", size_id: "" });
  };
  return (
    <>
      <Modal
        isOpen={remove.product_id !== "" && remove.size_id !== ""}
        onClose={() => setRemove({ product_id: "", size_id: "" })}
        className="flex flex-col gap-y-5"
      >
        Yakin ingin hapus produk ini dari keranjang?
        <div className="mx-auto space-x-3">
          <button
            onClick={() => {
              dispatch(
                cartActions.removeFromCart({
                  product_id: remove.product_id,
                  size_id: remove.size_id,
                })
              );
              setRemove({ product_id: "", size_id: "" });
            }}
            className="btn btn-primary text-white"
          >
            Ya
          </button>
          <div onClick={closeRemoveModal} className="btn btn-error">
            Tidak
          </div>
        </div>
      </Modal>
      <Header />

      <main className="bg-cart bg-cover bg-center">
        <div className="global-px  space-y-3 py-10">
          <section className="text-white lg:text-3xl text-2xl font-extrabold drop-shadow-lg text-center md:text-left">
            Checkout pesanan kamu!
          </section>
          <section className="flex flex-col md:flex-row lg:gap-16 gap-10">
            <aside className="flex-1 flex">
              <section className="flex bg-white rounded-lg p-5 lg:p-7 flex-col w-full">
                <div className="w-full my-4 lg:my-6">
                  <p className="text-tertiary font-bold text-xl lg:text-3xl text-center">
                    Total Pesanan
                  </p>
                </div>
                <section className="flex w-full flex-col gap-4 my-4">
                  {cart.map((list, idx) => {
                    let sizeName;
                    switch (list.size_id) {
                      case 2:
                        sizeName = "Large";
                        break;
                      case 3:
                        sizeName = "Xtra Large";
                        break;

                      default:
                        sizeName = "Regular";
                        break;
                    }
                    return (
                      <div
                        className="flex flex-row gap-2 lg:gap-5 w-full lg:text-lg items-center relative"
                        key={idx}
                      >
                        <aside className="flex-1">
                          <img
                            src={
                              isEmpty(list.img) ? productPlaceholder : list.img
                            }
                            alt={list.name}
                            className="aspect-square h-auto object-cover rounded-xl"
                          />
                        </aside>
                        <aside className="flex-[2_2_0%]">
                          <p className="font-semibold">{list.name}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                if (list.qty - 1 < 1)
                                  return setRemove({
                                    product_id: list.product_id,
                                    size_id: list.size_id,
                                  });
                                dispatch(
                                  cartActions.decrementQty({
                                    product_id: list.product_id,
                                    size_id: list.size_id,
                                  })
                                );
                              }}
                              className="rounded-full bg-tertiary text-white font-bold w-6 h-6 items-center justify-center duration-200 hover:bg-primary-focus"
                            >
                              -
                            </button>
                            <p>x {list.qty}</p>
                            <button
                              onClick={() =>
                                dispatch(
                                  cartActions.incrementQty({
                                    product_id: list.product_id,
                                    size_id: list.size_id,
                                  })
                                )
                              }
                              className="rounded-full bg-tertiary text-white font-bold w-6 h-6 items-center justify-center duration-200 hover:bg-primary-focus"
                            >
                              +
                            </button>
                          </div>
                        </aside>
                        <aside className="flex-1">
                          <p className="text-right">
                            IDR {n_f(Number(list.price) * Number(list.qty))}
                          </p>
                        </aside>
                        <button
                          onClick={() =>
                            setRemove({
                              product_id: list.product_id,
                              size_id: list.size_id,
                            })
                          }
                          className="absolute top-2 right-2 rounded-full h-6 w-6 bg-tertiary text-white font-bold text-xs text-center flex"
                        >
                          <p className="m-auto">X</p>
                        </button>
                      </div>
                    );
                  })}
                </section>
                <hr />
                <section className="flex flex-col w-full my-4">
                  <div className="flex flex-row uppercase lg:text-lg">
                    <p className="flex-[2_2_0%]">Subtotal</p>
                    <p className="flex-1 lg:flex-none text-right">
                      IDR{" "}
                      {n_f(
                        cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
                      )}
                    </p>
                  </div>
                  <div className="flex flex-row uppercase lg:text-lg">
                    {/* <p className="flex-[2_2_0%]">Tax & Fees</p>
                    <p className="flex-1 lg:flex-none text-right">IDR 20.000</p> */}
                  </div>
                  <div className="flex flex-row uppercase lg:text-lg">
                    {/* <p className="flex-[2_2_0%]">Shipping</p>
                    <p className="flex-1 lg:flex-none text-right">IDR 10.000</p> */}
                  </div>
                  <div className="flex flex-row items-center uppercase lg:text-lg mb-4 mt-4">
                    <label htmlFor="promoCode" className="flex-[2_2_0%]">
                      Promo Code
                    </label>
                    <input
                      type="text"
                      id="promoCode"
                      name="promoCode"
                      value={promoCode}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Masukkan kode promo"
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-white py-2 px-4 mt-4 rounded-lg focus:outline-none font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      applyPromo();
                    }}
                  >
                    Gunakan Kode Promo
                  </button>
                  <div className="flex flex-row uppercase  lg:text-xl font-bold my-10">
                    <p className="flex-[2_2_0%]">Total</p>
                    <p className="flex-initial lg:flex-none">
                      IDR{" "}
                      {n_f(
                        parseInt(
                          cart.reduce(
                            (acc, cur) => acc + cur.price * cur.qty,
                            0
                          ) *
                            (1 - discount / 100)
                        )
                      )}
                    </p>
                  </div>
                </section>
              </section>
            </aside>
            <aside className="w-full max-w-lg flex flex-col gap-5">
              <section className="text-white text-xl lg:text-2xl font-extrabold drop-shadow-lg text-center relative">
                Detail Pemesan
              </section>
              <section className="bg-white rounded-xl p-5 lg:p-7 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-tertiary">
                    Nama Pemesan
                  </label>
                  <input
                    value={form.delivery_address}
                    onChange={onChangeForm}
                    className="outline-none border border-gray-300 rounded-lg p-2 w-full"
                    name="delivery_address"
                    placeholder="Isi dengan nama kamu yaa..."
                    required
                  />
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-tertiary">Nomor Meja</label>
                  <input
                    value={form.notes}
                    onChange={onChangeForm}
                    className="outline-none border border-gray-300 rounded-lg p-2 w-full"
                    name="notes"
                    placeholder="Harap isi nomor meja kamu..."
                    required
                  />
                </div>
              </section>
              <button
                disabled={disabled}
                onClick={payHandler}
                className={`btn btn-block btn-primary text-white py-4 font-bold rounded-lg ${
                  isLoading ? "loading" : ""
                } disabled:bg-opacity-100`}
              >
                Pesan Sekarang
              </button>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
