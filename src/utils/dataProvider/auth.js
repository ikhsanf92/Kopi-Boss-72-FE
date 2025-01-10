import axios from "axios";

const host = process.env.REACT_APP_BACKEND_HOST;

export function login(email, password, rememberMe, controller) {
  const body = { email, password, rememberMe };
  const url = `${host}/apiv1/auth/login`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}

export async function register(email, password, phone_number, controller) {
  const body = { email, password, phone_number };
  const url = `${host}/apiv1/auth/register`;

  console.log(body, url, controller.signal);

  const rest = axios.post(url, body);

  console.log(rest, "ini restpong");

  return rest;
}

export function forgotPass(email, controller) {
  const body = { email };
  const url = `${host}/apiv1/auth/forgotPass`;

  return axios.post(url, body, {
    signal: controller.signal,
  });
}

export function verifyResetPass(verify, code, controller) {
  const url = `${host}/apiv1/auth/resetPass?verify=${verify}&code=${code}`;

  return axios.get(url, {
    signal: controller.signal,
  });
}

export function resetPass(verify, code, password, controller) {
  const url = `${host}/apiv1/auth/resetPass?verify=${verify}&code=${code}`;

  return axios.patch(
    url,
    { newPassword: password },
    {
      signal: controller.signal,
    }
  );
}

export function logoutUser(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `${host}/apiv1/auth/logout`;
  return axios.delete(url, config);
}
