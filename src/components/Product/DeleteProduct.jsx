import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProductEntry } from "../../utils/dataProvider/products";
import Modal from "../Modal";

function DeleteProduct({ isOpen, onClose, productId, userInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const navigate = useNavigate();
  const yesHandler = () => {
    if (isLoading) return;
    setIsLoading(true);
    deleteProductEntry(productId, userInfo.token, controller)
      .then(() => {
        navigate("/products", { replace: true });
        toast.success("Menu berhasil dihapus");
      })
      .catch(() => {
        toast.error("An error ocurred");
      })
      .finally(() => setIsLoading(false));
  };
  const closeHandler = () => {
    if (isLoading) return;
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <p className="font-medium text-center">Yakin mau hapus produk ini?</p>
      <p className="text-sm text-center text-error font-medium">
        Hati-hati ya! nggak bisa di-undo lagi lho!
      </p>
      <section className="flex justify-center items-center mt-5 gap-5">
        <button
          className={`${isLoading && "loading"} btn btn-error px-10`}
          onClick={yesHandler}
        >
          Ya
        </button>
        <button
          disabled={isLoading}
          className={`${isLoading && "btn-disabled"} btn px-10`}
          onClick={closeHandler}
        >
          Tidak
        </button>
      </section>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProduct);
