import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import loadingImage from "../../assets/images/loading.svg";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import {
  getTransactionDetail,
  getTransactionHistory,
} from "../../utils/dataProvider/transaction";
import useDocumentTitle from "../../utils/documentTitle";
import { formatDateTime, n_f } from "../../utils/helpers";

function History() {
  const authInfo = useSelector((state) => state.userInfo);
  const controller = useMemo(() => new AbortController(), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [isLoading, setIsLoading] = useState(true);
  const [listMeta, setListMeta] = useState({
    totalData: "0",
    perPage: 6,
    currentPage: 1,
    totalPage: 1,
    prev: null,
    next: null,
  });
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState("");
  const initialValue = {
    isLoading: true,
    isError: false,
    id: 0,
    receiver_email: "",
    receiver_name: "",
    delivery_address: "",
    notes: "",
    status_id: 0,
    status_name: "",
    transaction_time: "",
    promo_id: "",
    payment_id: 0,
    payment_name: "",
    payment_fee: 0,
    delivery_name: "",
    delivery_fee: 0,
    grand_total: 0,
    products: [],
  };
  const [dataDetail, setDataDetail] = useState({
    ...initialValue,
  });
  // useDocumentTitle("History");
  const detailController = useMemo(() => new AbortController(), [detail]);

  const fetchDetail = async () => {
    if (detail === "") return;
    try {
      const result = await getTransactionDetail(
        detail,
        authInfo.token,
        detailController
      );
      setDataDetail({ isLoading: false, ...result.data.data[0] });
    } catch (error) {
      if (axios.isCancel(error)) return;
      setDataDetail({ ...detail, isLoading: false, isError: true });
      console.log(error);
    }
  };

  useEffect(() => {
    if (detail === "") return;
    fetchDetail();
    return () => {
      detailController.abort();
      setDataDetail({ ...initialValue });
    };
  }, [detail]);

  useEffect(() => {
    if (page && (page < 1 || isNaN(page))) {
      setSearchParams({ page: 1 });
      return;
    }
    window.scrollTo(0, 0);

    setIsLoading(true);
    getTransactionHistory({ page: page || 1 }, authInfo.token, controller)
      .then((result) => {
        setList(result.data.data);
        setIsLoading(false);
        setListMeta(result.data.meta);
      })
      .catch(() => {
        setIsLoading(false);
        setList([]);
      });
  }, [page]);

  return (
    <>
      <Header />
      <Modal
        isOpen={detail !== ""}
        onClose={() => setDetail("")}
        className={"w-max max-w-md  md:max-w-none"}
      >
        {dataDetail.isLoading ? (
          <img src={loadingImage} alt="loading..." className="m-2 w-8 h-8" />
        ) : (
          <section className="flex flex-col-reverse md:flex-row gap-5 md:w-[80vw] duration-200 border p-4 rounded-lg shadow-lg">
            <aside className="flex-[2_2_0%] space-y-3 border-b pb-4">
              <p className="font-semibold text-lg mb-5">Menu yang Dipesan</p>
              <div className="flex flex-col h-72 overflow-y-scroll pr-2">
                {dataDetail.products.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col text-sm md:text-base gap-2 border-b pb-2 mb-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 rounded-xl">
                          <img
                            src={
                              item.product_img
                                ? item.product_img
                                : productPlaceholder
                            }
                            alt="Product"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500 text-xs uppercase">Menu</p>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-gray-500 text-xs">x{item.qty}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-gray-500 text-xs uppercase">
                        Harga
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">IDR {n_f(item.subtotal)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            <aside className="flex-1 flex flex-col gap-1 text-sm">
              <p className="font-bold text-lg mb-2">Detail Pesanan</p>
              <div className="flex justify-between py-1 border-b">
                <p className="font-semibold">Total Harga</p>
                <p className="font-medium">IDR {n_f(dataDetail.grand_total)}</p>
              </div>
              <div className="flex justify-between py-1 border-b">
                <p className="font-semibold">Status</p>
                <p>{dataDetail.status_name}</p>
              </div>
              <div className="flex justify-between py-1 border-b">
                <p className="font-semibold">Waktu Pesan</p>
                <p>{formatDateTime(dataDetail.transaction_time)}</p>
              </div>
              <div className="flex justify-between py-1 border-b">
                <p className="font-semibold">Nama Pemesan</p>
                <p>{dataDetail.delivery_address || "no address"}</p>
              </div>
              <div className="flex justify-between py-1">
                <p className="font-semibold">Nomor Meja</p>
                <p>{dataDetail.notes || "no notes"}</p>
              </div>
            </aside>
          </section>
        )}
      </Modal>
      <main className="bg-history bg-cover bg-center py-6 md:py-12 lg:py-20 text-white">
        <section className="global-px">
          <div className="flex flex-col items-center p-3">
            <h2 className="text-3xl drop-shadow-[0px_10px_10px_rgba(0,0,0,0.6)] font-extrabold mb-5 text-center">
              Yuk, cek menu keren yang udah kamu checkout!
            </h2>
            <p>Pilih menunya, biar bisa lihat detailnya!</p>
          </div>
          {/* <nav className="flex flex-row justify-end gap-4">
            <li className="list-none cursor-pointer select-none" id="selectAll">
              <p className="underline font-bold">Select All</p>
            </li>
            <li
              className="list-none cursor-pointer select-none"
              id="deleteSelected"
            >
              <p className="underline font-bold">Delete</p>
            </li>
          </nav> */}
          {!isLoading ? (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black py-7">
                {list.map((item, key) => (
                  <div
                    className="history-card  flex flex-row px-4 py-5 bg-white hover:bg-gray-200 cursor-pointer duration-200 rounded-2xl gap-5 relative group"
                    onClick={() => setDetail(item.id)}
                    key={key}
                  >
                    <div className="">
                      <img
                        src={
                          item.products[0].product_img
                            ? item.products[0].product_img
                            : productPlaceholder
                        }
                        alt=""
                        width="100px"
                        className="rounded-full  aspect-square object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center w-auto">
                      <div className="font-extrabold text-lg relative w-full">
                        {item.products[0].product_name}
                        {item.products.length > 1 && (
                          <p className="absolute text-sm font-medium top-1 right-0 bg-white duration-200 group-hover:bg-gray-200">
                            + {item.products.length - 1} more
                          </p>
                        )}
                      </div>
                      <p className="text-tertiary">
                        IDR {n_f(item.grand_total)}
                      </p>
                      <p className="text-tertiary">{item.status_name}</p>
                    </div>
                    {/* <input
                  type="checkbox"
                  className="checkbox-history absolute bottom-4 right-4 delete-checkbox border-secondary bg-secondary rounded h-5 w-5"
                /> */}
                  </div>
                ))}
              </section>
              <section className="flex justify-center">
                <div className="join">
                  {listMeta.prev && (
                    <button
                      onClick={() => {
                        setSearchParams({
                          page: Number(listMeta.currentPage) - 1,
                        });
                      }}
                      className="join-item btn btn-primary text-white"
                    >
                      «
                    </button>
                  )}
                  <button className="join-item btn btn-primary text-white">
                    Page {listMeta.currentPage}
                  </button>
                  {listMeta.next && (
                    <button
                      onClick={() => {
                        setSearchParams({
                          page: Number(listMeta.currentPage) + 1,
                        });
                      }}
                      className="join-item btn btn-primary text-white"
                    >
                      »
                    </button>
                  )}
                </div>
              </section>
            </>
          ) : (
            <section className="flex justify-center items-center py-7">
              <img src={loadingImage} className="invert" />
            </section>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default History;
