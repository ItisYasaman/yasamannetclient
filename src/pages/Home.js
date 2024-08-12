// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import ya from "../img/ya.png";
import "./Home.css";

const Home = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [manualPosts, setManualPosts] = useState([]); // State for manual posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts"
        );
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLatestPosts(sortedPosts.slice(0, 5));
        setManualPosts(sortedPosts.filter((post) => post.addToManual)); // Filter manual posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row second_container">
          <div className="col-md-9 about_auther">
            <div className="author-container">
              <img src={ya} alt="Author" className="author-picture" />
              <div class="drop"></div>
              <div class="drop drop_2"></div>
            </div>

            <div className="about-container">
              <h2>درباره نویسنده</h2>
              <p className="pre-type">
                {` 
یاسمن چوبه، دارای کارشناسی ارشد علوم اجتماعی، نویسنده و مدیر پروژه، با تجربه‌ای غنی و پیش‌زمینه‌ای متنوع در حوزه نویسندگی و پروژه‌های چندرسانه‌ای، به ویژه در بخش حقوق بشر است. یاسمن آثار داستا‌نی و  آموزشی در بخش اقلیت جنسی و جنسیتی را در پرونده کاری خود دارد و همچنین به مسائل اجتماعی می‌پردازد و در نهایت، دیگر آثار داستانی او در ژانر فانتزی نوشته شده‌اند. خلاقیت و یافتن پیوندهای زندگی واقعی و تمثیل‌های داستانی نقطه اوج کار اوست که به شیوایی در آثار او نمایان است.

علاوه بر نویسندگی، یاسمن به عکاسی دیجیتال و فیلمبرداری نیز علاقه‌مند است و تصمیم گرفته است که در مسیر طراحی چندرسانه‌ای گام بردارد. تجربه گسترده کاری او در سازمان‌های مردم نهاد حقوق بشری، به او بینشی نوآورانه در ایجاد پروژه‌های خلاقانه‌ و تاثیرگذار داده است.`}
              </p>
            </div>
          </div>
        </div>
        <div className="posts-container">
          <div
            id="postsCarousel"
            className="carousel slide carousel_width"
            data-ride="carousel"
            data-interval="4000"
          >
            <h6 className="text-center h6_title"> </h6>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card card_a">
                  <div className="card-body card-body_b">
                    <h5 className="card-title">!...به زودی</h5>
                    <p className="card-text"> </p>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#postsCarousel"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only"></span>
            </a>
            <a
              className="carousel-control-next"
              href="#postsCarousel"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only"></span>
            </a>
          </div>

          {/* High lights Section */}
          <div className="manual-posts">
            <ul className="manual-post_ul">
              <h6>پست‌های ویژه</h6>
              {manualPosts.length > 0 ? (
                manualPosts.map((post) => (
                  <li
                    key={post._id}
                    className="manual-post_li"
                    onClick={() =>
                      (window.location.href = `/posts/${post._id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {post.title}
                  </li>
                ))
              ) : (
                <li className="manual-post_li">
                  No highlighted posts available
                </li>
              )}
            </ul>
          </div>

          <div className="container_books-menu">
            <h6 className="text-center h6_title h6_title-lastposts">
              آخرین مطالب
            </h6>
            <div className="books-menu">
              <div className="card-deck">
                {latestPosts.map((post) => (
                  <div className="card" key={post._id}>
                    <div className="card-body card-body_a">
                      <h5 className="card-title card-title_last">
                        {post.title}
                      </h5>
                      <Link
                        to={`/posts/${post._id}`}
                        className="btn read_it-btn"
                      >
                        بخوانید
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
