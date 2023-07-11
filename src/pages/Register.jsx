import React from 'react'

const Register = () => {
  return (
    <div className=' bg-dark-main w-screen h-screen flex justify-center items-center '>
      <div className=" w-screen h-screen flex flex-col justify-center items-center bg-dark-main">
      <div className="w-[480px] h-[600px] bg-dark-secondary border-y-4 border-light-main flex flex-col justify-start items-start p-10 shadow-2xl rounded-lg">
        <h1 className=" text-white text-4xl ">注册</h1>
        <p className=" text-xl mt-10 ">用户名:</p>
        <input
          type="text"
          className=" bg-dark-main rounded-md w-full h-16 mt-6 border border-transparent placeholder:text-2xl p-3 hover:border hover:border-light-main 
         text-2xl focus:border-light-main  outline-none transition-all duration-300"
          placeholder="请输入..."
        />
        <p className=" text-xl mt-5 ">密码:</p>
        <input
          type="password"
          className=" bg-dark-main rounded-md w-full h-16 mt-6 border border-transparent placeholder:text-2xl p-3 hover:border hover:border-light-main 
         text-2xl focus:border-light-main  outline-none transition-all duration-300"
          placeholder="请输入..."
        />
        <p className=" text-[#ff0000] mt-2 opacity-0 select-none">账号或密码错误！</p>
        <button
          className=" w-48  h-14 bg-light-main text-white mt-12 self-center text-xl rounded-md shadow-lg hover:text-dark-main
          hover:bg-white hover:scale-105 hover:-translate-y-1 transition-all duration-200"
        >
          注册
        </button>
      </div>
    </div>
    </div>
  )
}

export default Register