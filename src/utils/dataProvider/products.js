import axios from "axios";

import api from "./base";

const host = process.env.REACT_APP_BACKEND_HOST;

export function getAllProducts(
  catId = "",
  { orderBy = "", sort = "", searchByName = "", limit = "10", page = "1" },
  controller
) {
  const params = { orderBy, sort, searchByName, limit, page };
  const url = `${host}/apiv1/products?category=${catId}`;

  return axios.get(url, { params, signal: controller.signal });
}

export function getProductbyId(productId, controller) {
  const url = `${host}/apiv1/products/${productId}`;

  return axios.get(url, {
    signal: controller.signal,
  });
}

export const createProductEntry = (
  { name = "", price = "", category_id = "", desc = "", image = "" },
  token,
  controller
) => {
  const bodyForm = new FormData();
  bodyForm.append("image", image);
  bodyForm.append("name", name);
  bodyForm.append("category_id", category_id);
  bodyForm.append("desc", desc);
  bodyForm.append("price", price);

  const body = {
    name,
    price,
    category_id,
    desc,
    image,
  };
  console.log(image);
  return api.post("/apiv1/products", bodyForm, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    signal: controller.signal,
  });
};

export const editProductEntry = (
  { name = "", price = "", category_id = "", desc = "", image = "" },
  productId,
  token,
  controller
) => {
  const bodyForm = new FormData();
  // Tambahkan gambar jika ada
  if (image instanceof File || image instanceof Blob) {
    bodyForm.append("image", image);
  } else if (image?.uri && image?.uri !== "") {
    bodyForm.append("image", {
      uri: image.uri,
      name: "image.jpg",
      type: "image/jpeg",
    });
  }

  // Tambahkan properti lainnya
  bodyForm.append("name", name);
  bodyForm.append("category_id", category_id);
  bodyForm.append("desc", desc);
  bodyForm.append("price", price);

  // Debug isi FormData
  for (let pair of bodyForm.entries()) {
    console.log(pair[0], pair[1]);
  }

  // Kirim data ke API
  return api.patch(`/apiv1/products/${productId}`, bodyForm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  });
};

export const deleteProductEntry = (productId, token, controller) => {
  return api.delete(`/apiv1/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal,
  });
};
