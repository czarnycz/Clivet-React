import React, { useState } from 'react'

import Pet from "../../models/pet";
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from "../../services/authentication.service";


const AddPetPage = () => {
     
    const [pet, setPet] = useState(new Pet('', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubbmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

   

   
    const handleChange = (e) => {
        const {name, value} = e.target;

        setPet((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const handleRegister = (e) => {

        e.preventDefault();

        setSubbmitted(true);
        // if form is invalid -> return
        if (!pet.name || !pet.age  || !pet.weight) {
            return;
        }
        setLoading(true);
        AuthenticationService.addPet(pet).then(_ => {
            navigate('/home');
        }).catch(error => {
            if (error.response.status === 401)

            setLoading(false);
        })
    };

    return(
        <>
        <div className="background">

                <div className="p-3 custom-card">
                    <p className="card-title">Add Pet</p>
                    <p className="card-subtitle">All fields are required</p>

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }
                    <form onSubmit={(e) => handleRegister(e)}
                          noValidate
                          className={submitted ? 'was-validated' : ''}>

                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name"
                                   className="form-control form-input-custom form-input-custom"
                                   placeholder="Name"
                                   value={pet.name}
                                   onChange={(e) => handleChange(e)}
                                   required/>
                            <div className="invalid-feedback">Name is required</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input type="number" name="age" className="form-control form-input-custom"
                                   placeholder="Age"
                                   value={pet.age}
                                   onChange={(e) => handleChange(e)}
                                   required/>
                            <div className="invalid-feedback">Age is required</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Weight:</label>
                            <input type="number" name="weight" className="form-control form-input-custom"
                                   placeholder="Weight"
                                   value={pet.weight}
                                   onChange={(e) => handleChange(e)}
                                   required/>
                            <div className="invalid-feedback">Weight is required</div>
                        </div>

                        <button className="btn btn-dark w-100 mt-3" disabled={loading} type="submit">Add</button>
                    </form>

                    <Link to ="/home" className="card-subtitle pt-3" style={{color: '#2a2a2a', textDecoration: 'none'}}>
                        <b>Back</b>
                    </Link>
                </div>
            </div>
    </>
    )
}
export {AddPetPage};