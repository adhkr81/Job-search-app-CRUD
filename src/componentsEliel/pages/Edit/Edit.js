import styles from "../Create/styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Background } from "../../../context/contextdark";

export function Edit() {

  const {color} = useContext(Background)

  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    office: "",
    description: "",
    candidacies: [],
  });

  useEffect(() => {
    async function Vacancy() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/linkedineliel/${id}`
        );
        setForm({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }

    Vacancy();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      await axios.put(
        `https://ironrest.herokuapp.com/linkedineliel/${id}`,
        clone
      );
    } catch (error) {
      console.log(error);
    }
    navigate("/ad-page");
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/linkedineliel/${id}`)

      
    } catch (error) {
      console.log(error);
    }
    navigate("/ad-page");
  }

  return (
    <div
      className={color === "light" ? `container-fluid mt-4 mb-5 dark` : `container-fluid mt-4 mb-5 dark light `}>
      <form>
        <div className="mb-4">
          <label htmlFor="name-input" className="form-label">
            <h5>Company Name: </h5>
          </label>
          <input
            id={styles.nameInput}
            onChange={handleChange}
            type="text"
            name="name"
            className="form-control mb-4"
            value={form.name}
          />
          <label htmlFor="office-input" className="form-label">
            <h5>Position: </h5>
          </label>
          <input
            id={styles.nameInput}
            onChange={handleChange}
            type="text"
            name="office"
            className="form-control mb-4"
            value={form.office}
          />
          <label htmlFor="about-input" className="form-label">
            <h5>About: </h5>
          </label>
          <textarea
            id="about-input"
            onChange={handleChange}
            type="text"
            name="description"
            className="form-control mb-4"
            value={form.description}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className={`btn btn-primary ${styles.button}`}
          >
            Save
          </button>

          <Link to="/ad-page" className={`btn btn-primary m-3 ${styles.button}`}>
            Back
          </Link>

          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>

        </div>
      </form>
    </div>
  );
}
