import { Link } from "react-router-dom";
import { useContext } from "react";
import { Background } from "../../context/contextdark";
import styles from "./styles.module.css";
import cover from "../../images/cover2.png";

export function Home() {

  const {color, toggleBackground} = useContext(Background)


  // <div className={`container-fluid mt-4 `}>
  return (
    <div className={color === "light" ? `container-fluid mt-4 dark` : `container-fluid mt-4 light`}>

    <div className="d-flex justify-content-end">
      <div><button onClick={toggleBackground} className={`btn btn-dark btn-sm m-3 ${styles.button.dark}`}>{color === "light" ? `Light` : `Dark`}</button></div>
    </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <img src={cover} alt="cover" className="img-fluid" />
        </div>
        <div className="col-3"></div>

        <div className="col-3"></div>
        <div className="col-3 d-flex justify-content-center">
          <Link to="./dashboard" className={`btn btn-primary ${styles.button}`}>
            APLLY FOR JOBS
          </Link>
        </div>
        <div className="col-3 d-flex justify-content-center">
          <Link to="./ad-page" className={`btn btn-primary ${styles.button}`}>
            CREATE JOBS
          </Link>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
