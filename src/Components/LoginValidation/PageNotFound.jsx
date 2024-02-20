import React, { useEffect } from "react";
import style from "./LoginDataStyle.module.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <div className="container-fluid" id={style.forget2}>
        <div className="row">
          <div className="col-lg-12">
            <h1 className={style.pageHead}>Page Not Found</h1>
            <Link to="/">
              {" "}
              <div className="text-center">
                <button type="button" className={style.backBtn}>
                  Back
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;