import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css"


export function Candidates() {
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
  }, []);
  return (
    <div className={`col-md-8 col-sm-12 col-lg-8 container mt-5 mb-5 ${styles.formContainer}`}>
      <div className="mb-5"><h3>Lista de Candidatos</h3></div>
      {data.map((currentElement) => {
        return (
          <div className="mb-4">
            <h5>Nome: {currentElement.name}</h5>
            <p>{currentElement.about} </p>
            <p>{currentElement.other}</p>
          </div>
        );
      })}
      <Link to="/ad-page" className={`btn btn-warning mt-5 ${styles.button2}`}>
        VOLTAR
      </Link>
    </div>
  );
}