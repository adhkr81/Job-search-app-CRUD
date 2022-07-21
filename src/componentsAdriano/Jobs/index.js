import styles from "./styles.module.css"
import {useState, useEffect} from "react"
import axios from "axios"
import {useParams, Link} from "react-router-dom"
import { useContext } from "react";
import { Background } from "../../context/contextdark";



export function Jobs () {

    const {color} = useContext(Background)

    const {idCV} = useParams()
    console.log(idCV)

    const [form, setForm] = useState([
        { name: "", office: "", description: "", candidacies: [] },
      ])

      const [user, setUser] = useState({        
            
        name: "",
        about: "",
        other: "",

        debug: false,
        css: false,
        bootstrap: false,
        form: false,
        delete: false,
        mongo: false,
        github: false,
        humor: false,

        vagas: []}        
      )

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await axios.get("https://ironrest.herokuapp.com/linkedineliel")
                setForm(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchJobs()
    },[])  


    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`https://ironrest.herokuapp.com/linkedinadriano/${idCV}`)
                setUser(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    },[])  



   async function likeButton(currentJob) {

        const jobId = currentJob._id

        const clone = currentJob

        delete clone._id

        clone.candidacies = [...clone.candidacies, user]

        console.log(clone)


        await axios.put(`https://ironrest.herokuapp.com/linkedineliel/${jobId}`, clone)

   }



    return (
   


            <div className={color === "light" ? `container-fluid mt-4 dark` : `container-fluid mt-4 light`}>
                <div className="mb-5"><h2>JOB OFFERS</h2></div>


                {form.map((current) => {
                return (
                    <div className={color === "light" ? `container mb-5 dark1` : `container mb-5 light1`}>
                    <div className="row mb-3 p-4 align-items-center">
                        <div className="col-3"><strong>{current.name}</strong></div>
                        <div className="col-8">{current.office}</div>
                        <div className="col-1"><button onClick={() => {
            likeButton(current)
        }}  className={`btn btn-primary ${styles.buttonDel}`}>{'\u2665'}</button></div>
    
                        <div className="col-1"></div>
                        <div className="col-10 ">{current.description}</div>
                        <div className="col-1"></div>
                    </div>
    
                </div>
                )
            })
        }
        <Link to="/dashboard" className={`m-3 btn btn-primary ${styles.button}`}>BACK</Link>
        </div>
    )
}