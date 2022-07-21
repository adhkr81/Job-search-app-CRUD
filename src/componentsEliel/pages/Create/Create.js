import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Background } from "../../../context/contextdark";

export function Create() {

  const {color} = useContext(Background)

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    office: "",
    description: "",
    candidacies: [],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("https://ironrest.herokuapp.com/linkedineliel", form);
    } catch (err) {
      console.log(err);
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
          <Link to="/ad-page" className="btn btn-warning m-3">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
