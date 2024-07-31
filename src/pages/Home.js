import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ya from "../img/ya.png";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row second_container">
          <div className="col-md-2">
            <div className="author-container">
            <img
              src={ya}
              alt="Author"
              className="author-picture"
            />
              <div class="drop"></div>
              <div class="drop drop_2"></div>
            </div>
          </div>
          <div className="col-md-9 about_auther">
            <h2>درباره نویسنده📎</h2>
            <p className="pre-type">
{` 
یاسمن چوبه، نویسنده و مترجم است. او دارای مدرک کارشناسی ارشد در رشته زبان و ادبیات انگلیسی است. او علاقه زیادی به نوشتن داستان دارد و تاکنون چندین داستان کوتاه و مقاله در زمینه‌های مختلف منتشر کرده است. او همچنین به ترجمه کتب ادبی انگلیسی به فارسی علاقه‌مند است و تاکنون چندین کتاب را به فارسی ترجمه کرده است. او از سال ۱۳۹۷ به عنوان مترجم و نویسنده فعالیت می‌کند و در حال حاضر به عنوان مترجم و نویسنده مستقل فعالیت می‌کند. او از زبان انگلیسی، فرانسه و اسپانیایی ترجمه می‌کند. او در حال حاضر در تهران زندگی می‌کند.`}
            </p>
          </div>
        </div>

        <div
          id="postsCarousel"
          className="carousel slide carousel_width"
          data-ride="carousel"
          data-interval="5000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="card card_a">
                <div className="card-body card-body_b">
                  <h5 className="card-title">Post 1</h5>
                  <p className="card-text">
                    This is a brief description of the first post.
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="card card_a">
                <div className="card-body card-body_b">
                  <h5 className="card-title">Post 2</h5>
                  <p className="card-text">
                    This is a brief description of the second post.
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="card card_a">
                <div className="card-body card-body_b">
                  <h5 className="card-title">Post 3</h5>
                  <p className="card-text">
                    This is a brief description of the third post.
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
            <span className="sr-only">Previous</span>
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
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div className="books-menu">
          <div className="card-deck">
            <div className="card">
              <div className="card-body card-body_a">
                <h5 className="card-title">Latest 1</h5>
                <button
                  onClick={() => alert("Read it 1")}
                  className="btn btn-primary"
                >
                  Read it
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-body card-body_a">
                <h5 className="card-title">Latest 2</h5>
                <button
                  onClick={() => alert("Read it 2")}
                  className="btn btn-primary"
                >
                  Read it
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-body card-body_a">
                <h5 className="card-title">Latest 3</h5>
                <button
                  onClick={() => alert("Read it 3")}
                  className="btn btn-primary"
                >
                  Read it
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-body card-body_a">
                <h5 className="card-title">Latest 4</h5>
                <button
                  onClick={() => alert("Read it 4")}
                  className="btn btn-primary"
                >
                  Read it
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-body card-body_a">
                <h5 className="card-title">Latest 5</h5>
                <button
                  onClick={() => alert("Read it 5")}
                  className="btn btn-primary"
                >
                  Read it
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
