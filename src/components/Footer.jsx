import React, { Component } from "react";

import { Link } from "react-router-dom";

import fbLogo from "../assets/icons/facebook.svg";
import igLogo from "../assets/icons/instagram.svg";
import twLogo from "../assets/icons/twitter.svg";
import logo from "../assets/kopiboss72.png";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-[#F8F8F8] text-[#4f5665]">
        <div className="global-px">
          <div className="py-5  md:py-20"></div>
          <div className="flex flex-col-reverse gap-12 md:flex-row">
            <div className="flex flex-col gap-4 md:flex-[2_2_0%]">
              <Link to="/">
                <div className="font-bold flex flex-row gap-2">
                  <img src={logo} alt="logo" width="100px" />{" "}
                  <h1 className="text-xl py-9">Kopi Boss 72</h1>
                </div>
              </Link>
              <div className="md:w-96">
                Kopi Boss 72, tempat nongkrong asyik <br />
                yang menyajikan berbagai hidangan lezat, <br />
                terutama kopi dengan kualitas terbaik.
              </div>
            </div>
            <nav className="flex flex-row gap-10 md:flex-2 mt-7">
              <div className="flex-1 flex flex-col gap-5">
                <div className="grid-item">
                  <h4 className="font-bold">Kontak Kami</h4>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      kopiboss72.chy@gmail.com
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jl. Wijaya Kusuma II No.21, RW.3, <br />
                      Ujung Menteng, Kec. Cakung, <br />
                      Kota Bks, Jawa Barat 17132
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      0895-7041-44441
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <div className="grid-item">
                  <h4 className="font-bold">Sosial Media</h4>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid-item">
                    Ikuti sosmed kami untuk info menarik!!!
                  </div>
                  <div className="flex flex-row gap-5">
                    <a
                      href="#"
                      className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                    >
                      <img src={fbLogo} alt="" />
                    </a>
                    <a
                      href="#"
                      className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                    >
                      <img src={igLogo} alt="" />
                    </a>
                    <a
                      href="#"
                      className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                    >
                      <img src={twLogo} alt="" width="120%" className="w-16" />
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="mt-10 text-center text-sm text-gray-500">
            <hr className="mb-5" />
            &copy; 2024 Kopi Boss 72. All rights reserved.
          </div>
          <div className="py-3"></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
