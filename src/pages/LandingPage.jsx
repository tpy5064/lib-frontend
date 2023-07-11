import React from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className=" w-screen h-screen flex justify-center items-center flex-col bg-dark-main ">
      <h1 className=" text-white text-5xl mb-8">花旗图书管理系统</h1>
      <Link
        to="/user_login"
        className=" w-40 h-12 bg-light-main rounded-sm flex justify-center items-center hover:bg-white hover:text-dark-main hover:scale-105 transition-all duration-200 "
      >
        <span className="text-xl">用户登录</span>
      </Link>
      <Link
        to="/manager_login"
        className=" w-40 h-12 bg-light-main rounded-sm flex justify-center items-center hover:bg-white hover:text-dark-main hover:scale-105 transition-all duration-200 mt-5"
      >
        <span className="text-xl">管理员登录</span>
      </Link>
    </div>
  );
};

export default LandingPage;
