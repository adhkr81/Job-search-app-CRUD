import {useState, useEffect} from "react"
import {useParams, useNavigate, Link} from "react-router-dom"
import axios from "axios"
import styles from "./styles.module.css"
import { useContext } from "react";
import { Background } from "../../context/contextdark";


export function EditFormCV () {

    const {color} = useContext(Background)

    const navigate = useNavigate()

    const {idCV} = useParams()

    const [ form, setForm] = useState({        
            
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

        vagas: []})



    useEffect(() => {
        async function FetchCV() {
            try { 
            const response = await axios.get(`https://ironrest.herokuapp.com/linkedinadriano/${idCV}`)
            setForm(response.data)

            } catch (err) {
                console.log(err)
            }
        } 
        FetchCV()

    }, [idCV])


    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    function handleCheckbox(e) {

        e.target.checked === true? 
        setForm({...form, [e.target.name]: true}) : setForm({...form, [e.target.name]: false})     
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const clone = form

        try{  delete clone._id
              await axios.put(`https://ironrest.herokuapp.com/linkedinadriano/${idCV}`, clone)
              navigate("/dashboard")

        } catch(error) {
            console.log(error)
        }
    }
    

    return (


        <div className={color === "light" ? `container-fluid mt-4 mb-5 dark` : `container-fluid mt-4 mb-5 dark light `}>    
        <form>

            {/* <div className="mb-4">

                <label htmlFor="photo" className="form-label"><h5>Adicione sua foto</h5></label>
                <input id="photo" onChange={handleImage} type="file" className="form-control"/>

            </div> */}

            <div className="mb-4 container">
                <div className="mb-4"><h2>Edit Profile</h2></div>
                <label htmlFor="name-input" className="form-label"><h5>Name: </h5></label>
                <input id={styles.nameInput} onChange={handleChange} type="text" name="name"  className="form-control mb-4" value={form.name}/>

                <label htmlFor="about-input" className="form-label"><h5>About me: </h5></label>
                <textarea id="about-input" onChange={handleChange} type="text" name="about" className="form-control mb-4" value={form.about}/>
            </div>

            <div className="mb-4"><h2>Edit Skills</h2></div>


            <div className="form-check mb-4">
                <div>
                    <label htmlFor="debug-input" className="form-check-label">bom em debugar</label> 
                    <input type="checkbox" onChange={handleCheckbox} name="debug" className="form-check-input" id="debug-input" checked={form.debug} />
                </div>

                <div>
                    <label htmlFor="css-input" className="form-check-label">css na unha </label> 
                    <input id="css-input" onChange={handleCheckbox} type="checkbox" name="css" className="form-check-input"  checked={form.css}/>
                </div>

                <div>
                    <label htmlFor="bootstrap-input" className="form-check-label">decorou classes de bootstrap </label> 
                    <input id="bootstrap-input" onChange={handleCheckbox} type="checkbox" name="bootstrap" className="form-check-input"  checked={form.bootstrap}/>
                </div>

                <div>
                    <label htmlFor="form-input" className="form-check-label">bom de formulario </label> 
                    <input id="form-input" onChange={handleCheckbox} type="checkbox" name="form" className="form-check-input"  checked={form.form}/>
                </div>

                <div>
                    <label htmlFor="delete-input" className="form-check-label">sabe fazer o delete funcionar </label> 
                    <input id="delete-input" onChange={handleCheckbox} type="checkbox" name="delete" className="form-check-input"  checked={form.delete}/>
                </div>

                <div>
                    <label htmlFor="mongo-input" className="form-check-label">manja de MongoDB </label> 
                    <input id="mongo-input" onChange={handleCheckbox} type="checkbox" name="mongo" className="form-check-input"  checked={form.mongo}/>
                </div>

                <div>
                    <label htmlFor="github-input" className="form-check-label">bom de github </label> 
                    <input id="github-input" onChange={handleCheckbox} type="checkbox" name="github" className="form-check-input"  checked={form.github}/>
                </div>

                <div>
                    <label htmlFor="humor-input" className="form-check-label">senso de humor </label> 
                    <input id="humor-input" onChange={handleCheckbox} type="checkbox" name="humor" className="form-check-input"  checked={form.humor}/>
                </div>    
            </div>


            <div className="d-flex flex-column">
                
                <label htmlFor="other-input" className="form-label">More details: </label>
                <input id={styles.otherInput} onChange={handleChange} type="text" name="other" className="form-control mb-4" value={form.other}/> 
            </div>

            <button onClick={handleSubmit} className={`btn btn-primary ${styles.button}`}>SEND</button>
            <Link to="/dashboard" className={`m-3 btn btn-primary ${styles.button}`}>BACK</Link>
        </form>
    </div>
    )
    
}