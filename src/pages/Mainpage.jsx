import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

// assets icons
import checkCircle from "../assets/icons/check-circle.svg";
import checkIcon from "../assets/icons/check.svg";
import loveIcon from "../assets/icons/love.svg";
import placeIcon from "../assets/icons/place.svg";
import starIcon from "../assets/icons/star.svg";
import staffIcon from "../assets/icons/user.svg";
import mapImage from "../assets/images/global.svg";
import amazonLogo from "../assets/images/partners/amazon.svg";
import discordLogo from "../assets/images/partners/discord.svg";
import netflixLogo from "../assets/images/partners/netflix.svg";
import redditLogo from "../assets/images/partners/reddit.svg";
import spotifyLogo from "../assets/images/partners/spotify.svg";
import phProfile from "../assets/images/placeholder-profile.jpg";
import productImage1 from "../assets/images/product-1.webp";
// assets images
import provideImage from "../assets/images/kopi3.png";
// components
import Footer from "../components/Footer";
import Header from "../components/Header";

class Mainpage extends Component {
  state = {
    provide: [
      "Biji kopi premium, rasa tak tertandingi",
      "Makanan sehat dan kekinian yang enak dinikmati kapan saja ",
      "Tempat cozy dengan segala yang kamu butuhin buat ngopi santai",
      "Pelayanan ramah dan cepat, bikin kamu betah berlama-lama",
    ],
    reviews: [
      {
        name: "Christiano Ronaldo",
        text: "Gokil sih, betah banget seharian di sini. Wi-fi ngebut, kopi sama makanannya juara banget",
      },
      {
        name: "Billie Eilish",
        text: "Gue suka banget tempat ini, hari gue langsung auto mendingan cuma gara-gara Hazelnut Latte-nya mereka. Mantap!",
      },
      {
        name: "Raditya Dika",
        text: "Beda banget sih sama selera gue biasanya. Gue tuh nggak pernah suka kopi, tapi kopi mereka juara banget!",
      },
    ],
  };
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <section className="bg-main bg-cover bg-center py-20 text-white font-bold">
            <div className="global-px">
              <div className="flex flex-col gap-6 w-[75%] lg:w-[50%] text-sm">
                <h2 className="text-4xl font-bold">
                  Seduhan Kopi Boss <br />
                  untuk Anda
                </h2>
                <p>
                  Rasakan sensasi ngopi yang berbeda di Kopi Boss 72. <br />
                  Kopi pilihan kami diproses dengan teknik terbaik <br />
                  untuk memberikan cita rasa yang kuat dan berkualitas. <br />
                  Ngopi like a boss!
                </p>
                <div className="mt-5">
                  <Link
                    className="bg-secondary px-6 py-4 text-[#6A4029] rounded-xl"
                    to={"/products/"}
                  >
                    Pesan Sekarang
                  </Link>
                </div>
              </div>
              <section className="relative bg-white mt-20 mb-[-9rem] rounded-xl shadow-xl text-quartenary flex flex-row py-5 justify-center items-center text-center md:text-left">
                <aside className="flex-1 border-r-2 py-2 md:py-6 flex flex-col md:flex-row justify-center gap-3 md:gap-8 items-center">
                  <div>
                    <div className="bg-secondary rounded-full p-2 w-10 aspect-square flex justify-center items-center">
                      <img src={staffIcon} alt="" />
                    </div>
                  </div>
                  <div>
                    <p className="text-md lg:text-xl">5+</p>
                    <p className="font-normal text-primary">Coffee</p>
                  </div>
                </aside>
                <aside className="flex-1 border-r-2 py-2 md:py-6 flex flex-col md:flex-row justify-center gap-3 md:gap-8 items-center">
                  <div className="bg-secondary rounded-full p-2 w-10 aspect-square flex justify-center items-center">
                    <img src={loveIcon} alt="" />
                  </div>
                  <div>
                    <p className="text-md lg:text-xl">10+</p>
                    <p className="font-normal text-primary">Non-Coffee</p>
                  </div>
                </aside>
                <aside className="flex-1 py-2 md:py-6 flex flex-col md:flex-row justify-center gap-3 md:gap-8 items-center">
                  <div className="bg-secondary rounded-full p-2 w-10 aspect-square flex justify-center items-center">
                    <img src={placeIcon} alt="" />
                  </div>
                  <div>
                    <p className="text-md lg:text-xl">15+</p>
                    <p className="font-normal text-primary">Food & Snacks</p>
                  </div>
                </aside>
              </section>
            </div>
          </section>
          <div className="mb-8 md:mb-20"></div>
          <section className="flex flex-col lg:flex-row global-px py-20 lg:gap-32">
            <div className="flex-1 img">
              <img src={provideImage} alt="" width="100%" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-5">
              <h2 className="text-quartenary font-semibold text-[26px]">
                Kami Menyajikan Kopi Berkualitas dan Makanan Kekinian
              </h2>
              <p className="text-[#4F5665]">
                Nikmati beragam menu otentik yang siap bikin harimu makin asik
                dengan cita rasa khas!
              </p>
              <ul className="flex flex-col max-w-md space-y-1 text-[#4F5665] list-inside gap-4">
                {this.state.provide.map((text, idx) => (
                  <li className="flex items-center gap-4" key={idx}>
                    <img src={checkCircle} alt="" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="global-px py-8 md:py-20">
            <div className="flex flex-col items-center mb-8 md:mb-20">
              <h2 className="text-4xl text-quartenary font-semibold mb-5 text-center">
                Penasaran dengan Kopi Boss 72?
              </h2>
              <p className="text-base text-gray-700 text-center">
                Yuk kunjungi toko kami di lokasi di bawah ini
              </p>
            </div>
            <div className="mt-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5708804917085!2d106.96938647398964!3d-6.18813439379942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698ba450558ca3%3A0x8d2f59648dcae6f6!2sKopi%20Boss%2072!5e0!3m2!1sid!2sid!4v1732688369059!5m2!1sid!2sid"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
                style={{ borderRadius: "8px", maxWidth: "100vw" }}
              ></iframe>
            </div>
          </section>
          <section className="global-px py-8 md:py-20">
            <div className="flex flex-col items-center mb-8 md:mb-20 text-center">
              <h2 className="text-3xl md:text-[35px] text-quartenary font-semibold mb-5">
                Cerita Tentang Kita
              </h2>
              <p className="text-[1rem] text-center max-w-[555px] text-primary">
                Inilah cerita seru dari pelanggan kami yang puas dan senang
                berkunjung ke sini.
              </p>
            </div>
            <div className="overflow-auto flex flex-row gap-5 flex-wrap lg:flex-nowrap ">
              {this.state.reviews.map((review, idx) => {
                return (
                  <div
                    className="w-[400px] border-gray-300 hover:border-tertiary border-2 duration-200 rounded-xl p-7 space-y-4 hover:shadow-2xl mx-auto"
                    key={idx}
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <img
                        src={phProfile}
                        alt=""
                        className="w-14 aspect-square object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-quartenary text-lg">
                          {review.name}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        4.5 <img src={starIcon} alt="" />
                      </div>
                    </div>
                    <p className="text-quartenary">“{review.text}</p>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="global-px z-10 relative w-full mb-6 md:mb-[-6rem]">
            <div className="shadow-primary rounded-xl flex flex-col md:flex-row py-10 md:py-14 px-8 md:px-16 bg-white text-center md:text-left">
              <aside className="flex-1 space-y-4 mb-5 md:mb-0">
                <p className="text-2xl font-bold">
                  Yuk cek promo menarik kita sekarang!
                </p>
                <p className="text-primary">
                  Nikmati berbagai promo untuk produk produk pilihan kami
                </p>
              </aside>
              <aside className="hidden lg:block lg:flex-1"></aside>
              <aside className="flex-1 flex flex-col justify-center">
                <Link
                  to="/products"
                  className="ml-auto w-[100%] md:w-[75%] bg-secondary rounded-xl py-4 text-tertiary font-bold text-center"
                >
                  Cek Promo
                </Link>
              </aside>
            </div>
          </section>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default Mainpage;
