import React, { useEffect, useMemo, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
// import _ from "lodash";
import { connect } from "react-redux";

import loadingImage from "../../assets/images/loading.svg";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import {
  getTransactions,
  setTransactionDone,
} from "../../utils/dataProvider/transaction";
import useDocumentTitle from "../../utils/documentTitle";
import { getEmailUsername, n_f } from "../../utils/helpers";

const ManageOrder = (props) => {
  const carouselRef = useRef(null);
  const [focusedCard, setFocusedCard] = useState(0);
  const [order, setOrder] = useState([]);
  const [done, setDone] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  // useDocumentTitle("Manage Order");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth;
      const focusedCardIndex = Math.round(scrollPosition / cardWidth);
      setFocusedCard(focusedCardIndex);
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  const scrollLeft = () => {
    const cardWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollLeft -= cardWidth;
  };

  const scrollRight = () => {
    const cardWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollLeft += cardWidth;
  };
  const controller = useMemo(() => new AbortController(), []);
  const fetch = () => {
    setLoading(true);
    getTransactions({ page: 1 }, props.userInfo.token, controller)
      .then((result) => {
        setOrder(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetch();
  }, []);
  const disabled = doneLoading;
  const doneHandler = () => {
    if (!done) return setDone(true);
    setDoneLoading(true);
    setDone(false);
    setTransactionDone(order[focusedCard].id, props.userInfo.token, controller)
      .then((result) => {
        toast.success("Status pesanan berhasil diubah");
        setDoneLoading(false);
        fetch();
      })
      .catch((err) => {
        setDoneLoading(false);
        if (axios.isCancel(err)) return;
        toast.error("Waduh gagal nih!!");
      });
  };
  const closeDoneModal = () => setDone(false);
  return (
    <>
      <Modal isOpen={done} onClose={closeDoneModal}>
        <div className="text-center">
          {/* Pesan Konfirmasi */}
          <p className="text-lg font-medium mb-6">
            Pesanannya sudah selesai dibuat?
          </p>

          {/* Tombol Yes dan No */}
          <div className="flex justify-center gap-4">
            <button onClick={doneHandler} className="btn btn-primary">
              Ya
            </button>
            <button onClick={closeDoneModal} className="btn btn-error">
              Tidak
            </button>
          </div>
        </div>
      </Modal>

      <Header />
      {loading ? (
        <>
          <main className="py-7 flex flex-col gap-5 items-center justify-center bg-[#ddd]">
            <img src={loadingImage} alt="Loading..." />
            <p className="text-center">Tunggu sebentar yaa...</p>
          </main>
        </>
      ) : (
        <main className="bg-cart bg-cover bg-center">
          <div className="global-px  space-y-3 py-10">
            <section className="text-white lg:text-3xl text-2xl font-extrabold drop-shadow-lg text-center md:text-left max-w-sm">
              Daftar pesanan yang menunggu
            </section>
            <section className="flex flex-col md:flex-row lg:gap-16 gap-10">
              <aside className="flex-1 flex">
                <section className="flex bg-white rounded-lg p-2 lg:p-7 flex-col w-full relative">
                  <button
                    disabled={focusedCard === 0}
                    className="carousel-control absolute bg-tertiary text-white flex items-center justify-center rounded-full w-8 h-8 top-4 left-4 hover:bg-primary-focus disabled:btn-disabled"
                    onClick={scrollLeft}
                  >
                    &lt;
                  </button>
                  <button
                    disabled={focusedCard === order.length - 1}
                    className="carousel-control absolute bg-tertiary text-white flex items-center justify-center rounded-full w-8 h-8 top-4 right-4 hover:bg-primary-focus disabled:btn-disabled"
                    onClick={scrollRight}
                  >
                    &gt;
                  </button>
                  <div
                    className=" carousel rounded-box max-w-md lg:max-w-lg"
                    //   onScroll={handleScroll}
                    ref={carouselRef}
                  >
                    {order.map((item, key) => (
                      <div className="carousel-item w-full" key={key}>
                        <section className="flex flex-col items-center w-full py-6 px-4 bg-white rounded-lg shadow-md">
                          <div className="w-full text-center mb-6">
                            <p className="text-tertiary font-bold text-2xl md:text-3xl">
                              Pesanan
                            </p>
                            <p className="text-gray-600">
                              untuk{" "}
                              {item.receiver_name ||
                                getEmailUsername(item.receiver_email)}
                            </p>
                          </div>

                          <section className="flex flex-col w-full max-h-96 overflow-y-auto gap-6">
                            {item.products.map((product, key) => (
                              <div
                                className="flex flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm border"
                                key={key}
                              >
                                {/* Gambar Produk */}
                                <aside className="flex-shrink-0">
                                  <div className="avatar">
                                    <div className="w-20 md:w-24 rounded-lg overflow-hidden">
                                      <img
                                        src={
                                          product.product_img ||
                                          productPlaceholder
                                        }
                                        alt={product.product_name}
                                        className="object-cover"
                                      />
                                    </div>
                                  </div>
                                </aside>

                                {/* Detail Produk */}
                                <aside className="flex-1">
                                  <p className="font-semibold text-lg text-gray-800">
                                    {product.product_name}
                                  </p>
                                  <p className="text-gray-500 text-sm">
                                    Jumlah: x{product.qty}
                                  </p>
                                </aside>

                                {/* Harga Produk */}
                                <aside className="text-right">
                                  <p className="font-semibold text-lg text-gray-800">
                                    IDR {n_f(product.subtotal)}
                                  </p>
                                </aside>
                              </div>
                            ))}
                          </section>

                          <div className="w-full border-t my-6"></div>

                          {/* Total Harga */}
                          <section className="flex flex-col w-full">
                            <div className="flex justify-between items-center uppercase font-bold text-xl">
                              <p className="text-gray-800">Total</p>
                              <p className="text-tertiary">
                                IDR {n_f(item.grand_total)}
                              </p>
                            </div>
                          </section>
                        </section>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
              <aside className="flex-1 flex flex-col gap-5">
                <section className="text-white text-xl lg:text-2xl font-extrabold drop-shadow-lg text-center md:text-left relative items-center">
                  <button
                    //   onClick={editMode ? saveEditInfo : toggleEdit}
                    className="absolute text-lg right-0 bottom-0 top-1 hover:underline"
                  >
                    {/* {editMode ? "save" : "edit"} */}
                  </button>
                </section>
                <section className="bg-white rounded-lg p-6 lg:p-8 shadow-md space-y-4">
                  {/* Header Pesanan */}
                  <div className="text-center">
                    <p className="text-xl lg:text-2xl font-bold text-tertiary">
                      Detail Pemesan
                    </p>
                    <p className="text-gray-500 text-sm">
                      Informasi pesanan pelanggan
                    </p>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Informasi Pemesan */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 font-medium">
                        Dipesan oleh :
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {order[focusedCard]?.delivery_address ||
                          "Tidak diketahui"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 font-medium">Nomor Meja :</p>
                      <p className="text-gray-800 font-semibold">
                        {order[focusedCard]?.notes || "Tidak ada"}
                      </p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Catatan */}
                  <div className="text-sm text-gray-500">
                    <p>Pastikan informasi ini benar sebelum pesanan dibuat.</p>
                  </div>
                </section>
                <button
                  disabled={disabled}
                  onClick={doneHandler}
                  className={`
                ${doneLoading && "loading"} 
                btn btn-block btn-primary text-white py-4 font-bold rounded-lg disabled:bg-opacity-100`}
                >
                  Pesanan Selesai!!!
                </button>
              </aside>
            </section>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);
