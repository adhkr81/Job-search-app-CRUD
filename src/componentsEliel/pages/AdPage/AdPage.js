import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useContext } from "react";
import { Background } from "../../../context/contextdark";


export function AdPage() {


  const {color} = useContext(Background)


  const [data, setData] = useState([
    { name: "", office: "", description: "", candidacies: [] },
  ]);


  useEffect(() => {
    async function Vancacys() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/linkedineliel"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    Vancacys();
  }, []);


  return (
    <div className={color === "light" ? `container-fluid mt-4 mb-5 dark` : `container-fluid mt-4 mb-5 dark light `}>
      <div className="m-2">
        <h2>DASHBOARD</h2>
      </div>

      <div className="row">
        <div className="col-3 mb-5">
          <Link to="/create" className={`btn btn-primary ${styles.button}`}>
            Create Job
          </Link>
        </div>
        <div className="col-3 mb-5"></div>
        <div className="col-3 mb-5"></div>

        {data.map((current) => {
          return (
<>            
            <div className={color === "light" ? `container mb-5 dark1` : `container mb-5 light1`} key={current._id}>
            <div className="row mb-3 p-4 align-items-center">
                <div className="col-3"><strong>{current.name}</strong></div>
                <div className="col-7">{current.office}</div>
                <div className="col-1"><Link to={`/edit/${current._id}`} className={`btn btn-primary ${styles.button}`}>
                  Edit 
                </Link></div>
                <div className="col-10 ">{current.description}</div>
                <div className="col-1"><Link to={`/candidates/${current._id}`} className={`btn btn-primary ${styles.button}`}>
                  Details
                </Link></div>



            </div>

        </div>






            </>

          );
        })}
      </div>
    </div>
  );
}

// hi