/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import images from '../../assets/images/person-with-a-coffee.webp';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useDocumentTitle from '../../utils/documentTitle';
import GetAllProducts from './GetAllProducts';

const promos = [
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Lorem ipsum",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

function Products(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [ddMenu, setDdmenu] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.keyword);

  const toggleDdmenu = () => {
    setDdmenu(!ddMenu);
  };

  useDocumentTitle(props.title);
  return (
    <>
      <Header />

      <main className="flex flex-col md:flex-row px-10 lg:px-22">
        <section className="flex-1 flex flex-col items-center gap-5 py-5 md:border-r-2 border-solid md:pr-6">
          <h2 className="font-bold text-2xl">Promo Today</h2>
          <p className="text-center">
            Coupons will be updated every weeks.
            <br />
            Check them out!
          </p>
          <div className="flex flex-col justify-center gap-5">
            {promos.map((promo, idx) => (
              <div
                className="flex flex-row items-center bg-slate-300  rounded-xl gap-2 px-4 py-3"
                key={idx}
              >
                <div className="flex-1 flex justify-center">
                  <img src={images} alt="" width="75px" />
                </div>
                <div className="flex-[2_2_0%]">
                  <p className="font-bold">{promo.name}</p>
                  <p className="text-sm">{promo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex-[2_2_0%] flex flex-col md:pl-16 py-5">
          <nav className="list-none flex flex-row md:justify-between justify-evenly flex-wrap gap-5 mb-10 ">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="/products"
                end
              >
                Favorite & Promo
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/1"
              >
                Coffee
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/2"
              >
                Non Coffee
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/3"
              >
                Foods
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-tertiary border-b-2 border-tertiary pb-1 drop-shadow-lg"
                    : "" +
                      " hover:drop-shadow-lg hover:border-b-2 border-tertiary pb-1"
                }
                to="category/4"
              >
                Add-on
              </NavLink>
            </li>
            <li className="relative">
              <button onClick={toggleDdmenu}>▼</button>
              <div
                className={
                  (ddMenu ? "opacity-0 z-0 " : " z-[5]") +
                  " absolute w-72 shadow border-1 border-gray-200 bg-white rounded-md right-0 p-5 top-10 text-primary duration-200 transition-opacity"
                }
              >
                <section className="flex flex-col">
                  <aside className="flex-1 flex flex-col">
                    <label
                      htmlFor="searchProduct"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="searchProduct"
                      id="searchProduct"
                      className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </aside>
                  <aside className="flex-1">
                    <label
                      htmlFor="orderBy"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Order by
                    </label>
                    <select
                      id="orderBy"
                      className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose a order</option>
                      <option value="p_asc">Price (ASC)</option>
                      <option value="p_asc">Price (DESC)</option>
                      <option value="id_asc">ID (ASC)</option>
                      <option value="id_desc">ID (DESC)</option>
                      <option value="cat_asc">Category (ASC)</option>
                      <option value="cat_desc">Category (DESC)</option>
                    </select>
                  </aside>
                </section>
              </div>
            </li>
          </nav>
          <Routes path="/products/*">
            <Route
              index
              element={
                <GetAllProducts
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              }
            ></Route>
            <Route
              path="category/:catId"
              element={
                <GetAllProducts
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              }
            />
          </Routes>

          <section className="my-6 text-tertiary">
            *the price has been cutted by discount appears
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Products;
