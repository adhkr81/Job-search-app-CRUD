import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import { useContext } from "react";
import { Background } from "../../context/contextdark";

import styles from "./styles.module.css"



export function Dashboard () {

    const {color} = useContext(Background)

    const [form, setForm] = useState([{
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

        vagas: []

        // image: {}

    }])


    useEffect(() => {
        async function FetchCV() {
            try { 
                const response = await axios.get(`https://ironrest.herokuapp.com/linkedinadriano/`)
                setForm(response.data)

            } catch (err) {
                console.log(err)
            }
        }
        FetchCV()
    }, [])


    function handleDelete(e) {

        const id = e._id

        async function FetchDelete() {
            try { 
                await axios.delete(`https://ironrest.herokuapp.com/linkedinadriano/${id}`)
                console.log("apaga")

            } catch (err) {
                console.log(err)
            }
        }
        FetchDelete()
    }



    return (
        <div className={color === "light" ? `container-fluid mt-4 dark dark1` : `container-fluid mt-4 light light1`}>
            <div><h2>DASHBOARD</h2></div>

            <div className="row justify-content-center">
                
                <div className="col-3"><Link to="/formCV" className={`btn btn-primary ${styles.button}`} >CREATE PROFILE</Link></div>
                <div className="col-3"></div>
                <div className="col-3"></div>

                {form.map((current) => {
                    
                    return  <div className={color === "light" ? `card-group col-sm-6 col-md-5 m-2 formCarddark` : `card-group col-sm-6 col-md-5 m-2 formCardlight`} key={current.about}>
                            
                            <div className="card">
                                {/* <img src="..." className="card-img-top" alt="..."/> */}
                                <div className={color === "light" ? " dark1 card-body" : " light1 card-body"}>
                                <h5 className="card-title">{current.name}</h5>
                                <div className="card-text d-flex justify-content-center">
                                    <div><Link to={`/EditFormCV/${current._id}`}className={`btn btn-primary btn-sm ${styles.button}`} >EDIT</Link></div>
                                    <div><Link to={`/Jobs/${current._id}`} className={`btn btn-primary btn-sm ${styles.button}`} >JOBS</Link></div>
                                    <div><button onClick={(() => {
                                                    handleDelete(current)
                                              })} to="/formCV" className={`btn btn-primary btn-sm ${styles.buttonDel}`} >DELETE</button></div>
                                </div>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            
                            
                            </div>
                    })}

            </div>

        </div>




    )
}