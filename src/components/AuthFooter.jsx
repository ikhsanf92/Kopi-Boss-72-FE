import React from "react";

import { Link } from "react-router-dom";

import fbLogo from "../assets/icons/facebook.svg";
import igLogo from "../assets/icons/instagram.svg";
import twLogo from "../assets/icons/twitter.svg";
import logo from "../assets/kopiboss72.png";

const AuthFooter = () => {
  return (
    <>
      {/* <footer className="bg-[#F8F8F8] text-[#4f5665]">
        <div className="global-px lg:px-16">
          <div className="py-5  md:py-10"></div>
          <div className="flex flex-col-reverse gap-12 md:flex-row">
            <div className="flex flex-col gap-4 md:max-w-[50%]">
              <Link to="/">
                <div className="font-bold flex flex-row gap-2">
                  <img src={logo} alt="logo" width="100px" />{" "}
                  <h1 className="text-xl text-black py-9">Kopi Boss 72</h1>
                </div>
              </Link>
              <div className="">
                Kopi Boss 72, tempat nongkrong asyik yang menyajikan berbagai
                hidangan lezat, terutama kopi dengan kualitas terbaik.
              </div>
              <div className="flex flex-row gap-5">
                <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                  aria-label="Facebook"
                >
                  <img src={fbLogo} alt="" />
                </a>
                <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                  aria-label="Instagram"
                >
                  <img src={igLogo} alt="" />
                </a>
                <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                  aria-label="Twitter"
                >
                  <img src={twLogo} alt="" width="120%" className="w-16" />
                </a>
              </div>
              <div className="copyright">(c) 2024 Kopi Boss 72</div>
            </div>
            <nav className="flex flex-row lg:flex-col gap-10 md:flex-1">
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
                      email
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
              <div className="flex-1 flex flex-col gap-2">
                <div className="grid-item">
                  <p className="font-bold">Engage</p>
                </div>
                <div className="flex flex-col gap-2  lg:flex-row lg:gap-x-10 lg:gap-y-4 flex-wrap w-full text-base">
                  <div className="grid-item flex-1 min-w-[5rem]">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Coffee Shop?
                    </a>
                  </div>
                  <div className="grid-item flex-1 min-w-[5rem]">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      FAQ
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      About Us
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </div>
                  <div className="grid-item flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Terms of Services
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="py-5"></div>
        </div>
      </footer> */}
    </>
  );
};

export default AuthFooter;
