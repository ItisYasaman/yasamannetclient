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
        setManualPosts(sortedPosts.filter(post => post.addToManual)); // Filter manual posts
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
              <h2>درباره نویسنده📎</h2>
              <p className="pre-type">
                {` 
یاسمن چوبه، نویسنده و مترجم است. او دارای مدرک کارشناسی ارشد در رشته زبان و ادبیات انگلیسی است. او علاقه زیادی به نوشتن داستان دارد و تاکنون چندین داستان کوتاه و مقاله در زمینه‌های مختلف منتشر کرده است. او همچنین به ترجمه کتب ادبی انگلیسی به فارسی علاقه‌مند است و تاکنون چندین کتاب را به فارسی ترجمه کرده است. او از سال ۱۳۹۷ به عنوان مترجم و نویسنده فعالیت می‌کند و در حال حاضر به عنوان مترجم و نویسنده مستقل فعالیت می‌کند. او از زبان انگلیسی، فرانسه و اسپانیایی ترجمه می‌کند. او در حال حاضر در تهران زندگی می‌کند.`}
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
            <h6 className="text-center h6_title">
              <i class="fa-solid fa-basket-shopping"></i>
            </h6>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card card_a">
                  <div className="card-body card-body_b">
                    <h5 className="card-title">Post 1</h5>
                    <p className="card-text"> </p>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card card_a">
                  <div className="card-body card-body_b">
                    <h5 className="card-title">Post 2</h5>
                    <p className="card-text">
                      بلا بلا بلا بلا بلا بلا بلا بلا بلا بلا بلا بلا بلا بلا
                      بلا بلا بلا بلا بلا بلا بلا بلا بلا بلا
                    </p>
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
              <h6>High lights</h6>
              {manualPosts.length > 0 ? (
                manualPosts.map((post) => (
                  <li key={post._id} className="manual-post_li">
                    <a href={`/posts/${post._id}`}>{post.title}</a>
                  </li>
                ))
              ) : (
                <li className="manual-post_li">No highlighted posts available</li>
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
