import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css"
import { useContext } from "react";
import { Background } from "../../../context/contextdark";


export function Candidates() {

  
  const {color} = useContext(Background)

  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function AllCandidates() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/linkedineliel/${id}`
        );
        setData([...response.data.candidacies]);
      } catch (error) {
        console.log(error);
      }
    }
    AllCandidates();
  }, [id]);
  return (
    <div className={color === "light" ? `container-fluid mt-4 mb-5 dark` : `container-fluid mt-4 mb-5 dark light `}>
      <div className="mb-5"><h3>Candidates List</h3></div>
      {data.map((currentElement) => {
        return (
          <div className="mb-4">
            <h5>Name: {currentElement.name}</h5>
            <p>{currentElement.about} </p>
            <p>{currentElement.other}</p>
          </div>
        );
      })}
      <Link to="/ad-page" className={`btn btn-warning mt-5 ${styles.button2}`}>
        Back
      </Link>
    </div>
  );
}