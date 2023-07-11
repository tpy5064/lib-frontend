import React from "react";
import { useState, useEffect } from "react";
import BookDetails from "../components/BookDetails";

const Booklist = () => {
  const now = new Date();
  const [time, setTime] = useState(now);
  const [percentageOfDay, setPercentageOfDay] = useState(
    (now - new Date(now.getFullYear(), now.getMonth(), now.getDate())) /
      86400000
  );
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({});
  const [originalBooks, setOriginalBooks] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [bookDetail, setBookDetail] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      setPercentageOfDay(
        (now - new Date(now.getFullYear(), now.getMonth(), now.getDate())) /
          86400000
      );
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/books", {
        method: "GET",
      });

      const data = await response.json();
      setBooks(data);
      setOriginalBooks(data);
      console.log(data);
    };

    fetchData();
  }, []);

  const toYMD = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const filterBooks = () => {
    return books.filter((book) =>
      Object.keys(filter).every((key) => book[key] === filter[key])
    );
  };

  const appendFilter = (e) => {
    if (filter.hasOwnProperty(e.target.name)) {
      let newFilter = filter;
      delete newFilter[`${e.target.name}`];
      setFilter(newFilter);
    } else {
      let newFilter = filter;
      newFilter[e.target.name] = 1;
    }

    if (Object.keys(filter).length === 0) {
      setBooks(originalBooks);
    } else {
      setBooks(filterBooks(books));
    }
  };

  const sortBooks = (e) => {
    if (e.target.value === "default") {
      setBooks(originalBooks);
      return;
    } else {
      const newOrder = books;
      setBooks(
        newOrder.sort((a, b) => {
          return new Date(a[e.target.value]) - new Date(b[e.target.value]);
        })
      );
    }
  };

  const searchBooks = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setBooks(
        originalBooks.filter((book) => {
          return book.name.includes(e.target.value);
        })
      );
    } else {
      setBooks(originalBooks);
    }
  };

  const closePopup = () => {
    setShowDetail(false);
  };

  const openPopup = () => {
    setBookDetail({
      title: "Lorem Ipsum",
      author: "John Smith",
      publisher: "ABC Publishings",
      cover: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at ipsum eu erat finibus faucibus. Etiam vel velit sit amet risus gravida tincidunt maximus aliquam ex. Phasellus fringilla auctor mauris, sollicitudin sodales nulla condimentum ac. Nam tempor gravida sapien et tristique. Morbi euismod ex lorem, at condimentum erat bibendum vitae.",
    });
    setShowDetail(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-start p-12 bg-dark-main">
      {showDetail ? (
        <BookDetails
          title={bookDetail.title}
          author={bookDetail.author}
          publisher={bookDetail.publisher}
          cover={bookDetail.civer}
          details={bookDetail.details}
          handleClose={closePopup}
        />
      ) : (
        ""
      )}
      <div className="w-full h-max flex">
        <h1 className="text-5xl text-white">图书列表</h1>
        <div className=" w-max h-max ml-auto flex flex-col justify-center items-start">
          <h1 className="text-5xl text-white w-full">
            {time.toLocaleTimeString()} {time.toLocaleDateString()}
          </h1>
          <div
            style={{ width: `${Math.ceil(percentageOfDay * 100)}%` }}
            className="h-2 bg-light-main self-start"
          ></div>
        </div>
      </div>
      <div className="w-full h-max flex">
        <div className="flex flex-row w-2/5 h-20 bg-opaque ml-auto mt-8 justify-between gap-3 items-center p-5 rounded-md ">
          <div className="flex w-max h-max justify-center">
            <input
              type="checkbox"
              name="is_overdue"
              onChange={(e) => appendFilter(e)}
            />
            <label htmlFor="due" className="ml-2">
              已逾期
            </label>
            <input
              type="checkbox"
              name="is_lent"
              className="ml-4"
              onChange={(e) => appendFilter(e)}
            />
            <label htmlFor="due" className="ml-2">
              已借出
            </label>
          </div>
          <select
            name="filters"
            className="h-12 flex-grow bg-opaque-dark rounded-md p-1 border border-transparent
            hover:border-light-main focus:border-light-main transition-all duration-300 outline-none"
            onChange={(e) => sortBooks(e)}
          >
            <option value="placeholder" disabled selected>
              排序...
            </option>
            <option value="default">默认</option>
            <option value="lendout_time">借出日期</option>
            <option value="return_time">归还日期</option>
          </select>
          <div className="flex flex-frow h-max">
            <input
              type="text"
              placeholder="搜索书名..."
              className="h-12 ml-auto bg-opaque-dark border border-transparent outline-none pl-1 rounded-md
            hover:border-light-main focus:border-light-main transition-all duration-300"
              onChange={(e) => searchBooks(e)}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-4/5 flex flex-col justify-start items-start mt-8 flex-grow">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="h-14 bg-opaque">
              <th className=" border border-dark-secondary border-t-light-main ">
                书名
              </th>
              <th className=" border border-dark-secondary border-t-light-main">
                借出时间
              </th>
              <th className=" border border-dark-secondary border-t-light-main">
                归还时间
              </th>
              <th className=" border border-dark-secondary border-t-light-main">
                状态
              </th>
              <th className=" border border-dark-secondary border-t-light-main">
                是否逾期
              </th>
              <th className=" border border-dark-secondary border-t-light-main">
                员工照片
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className="h-14">
                <td className=" text-center border border-dark-secondary">
                  <button onClick={() => openPopup()}>{book.name}</button>
                </td>
                <td className=" text-center border border-dark-secondary">
                  {book.lendout_time ? (
                    <span>{toYMD(book.lendout_time)}</span>
                  ) : (
                    <span>无</span>
                  )}
                </td>
                <td className=" text-center border border-dark-secondary">
                  {book.return_time ? (
                    <span>{toYMD(book.return_time)}</span>
                  ) : (
                    <span>无</span>
                  )}
                </td>
                <td className=" text-center border border-dark-secondary">
                  {book.is_lent ? (
                    <span className=" text-[#ff0000]">已借出</span>
                  ) : (
                    <span className="text-[#00ff00]">已归还</span>
                  )}
                </td>
                <td className=" text-center border border-dark-secondary">
                  {book.is_overdue ? (
                    <span className="text-[#ff0000] ">已逾期</span>
                  ) : (
                    <span className="text-[#00ff00]">正常</span>
                  )}
                </td>
                <td className=" text-center border border-dark-secondary">
                  {book.lendee_photo_url}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booklist;
