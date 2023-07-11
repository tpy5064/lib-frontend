import React from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = () => {
  const usernameField = useRef();
  const passwordField = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();

  const authenticateLogin = async () => {
    const username = usernameField.current.value;
    const password = passwordField.current.value;
    console.log(username, password);
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        console.error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.log("Bad response: ", data);
        errorRef.current.style.opacity = "1";
      } else {
        localStorage.setItem("library-token", data.token);
        navigate("/booklist");
      }
    } catch (err) {
      console.error("Something bad happened: \n", err);
    }
  };

  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center bg-dark-main">
      <div className="w-[480px] h-[600px] bg-dark-secondary border-y-4 border-light-main flex flex-col justify-start items-start p-10 shadow-2xl rounded-lg">
        <h1 className=" text-white text-4xl ">用户登录</h1>
        <p className=" text-xl mt-10 ">用户名:</p>
        <input
          type="text"
          className=" bg-dark-main rounded-md w-full h-16 mt-6 border border-transparent placeholder:text-2xl p-3 hover:border hover:border-light-main 
         text-2xl focus:border-light-main  outline-none transition-all duration-300"
          placeholder="请输入..."
          ref={usernameField}
        />
        <p className=" text-xl mt-5 ">密码:</p>
        <input
          type="password"
          className=" bg-dark-main rounded-md w-full h-16 mt-6 border border-transparent placeholder:text-2xl p-3 hover:border hover:border-light-main 
         text-2xl focus:border-light-main  outline-none transition-all duration-300"
          placeholder="请输入..."
          ref={passwordField}
          onKeyDown={(e) => {
            if (e.key === "Enter") authenticateLogin();
          }}
        />
        <p
          className=" text-[#ff0000] mt-2 opacity-0 select-none"
          ref={errorRef}
        >
          账号或密码错误！
        </p>
        <button
          className=" w-48  h-14 bg-light-main text-white mt-12 self-center text-xl rounded-md shadow-lg hover:text-dark-main
          hover:bg-white hover:scale-105 hover:-translate-y-1 transition-all duration-200"
          onClick={authenticateLogin}
        >
          登录
        </button>
        <Link to="/register" className=" self-center mt-4 border-b border-b-transparent hover:border-b-light-main transition-all duration-300">
          新用户注册
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
