import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function AdPage() {
  const [data, setData] = useState([
    { name: "", office: "", description: "", candidacies: [] },
  ]);
  const [form, setForm] = useState([
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

  function handleChange(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className={`container-fluid mt-5 ${styles.formContainer}`}>
      <div className="m-2">
        <h2>DASHBOARD</h2>
      </div>

      <div className="row">
        <div className="col-3 mb-5">
          <Link to="/create" className={`btn btn-primary ${styles.button}`}>
            Anuncie
          </Link>
        </div>
        <div className="col-3 mb-5"></div>
        <div className="col-3 mb-5"></div>

        {data.map((current) => {
          return (
<>
            <div className={`container col-11 mb-5 ${styles.formCardJobs}`} key={current.name}>
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
