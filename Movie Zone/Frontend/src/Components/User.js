import React, {useEffect, useState} from 'react'
import axios from 'axios';

import Navbar from './Navbar'

export default function User() {
    const userId = sessionStorage.getItem("id");
    let movieCount= 0;
    const [values,setValues]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/user').then(res=>{
            setValues(res.data);
        })
    },[])
    return (
        <>
            <Navbar/>
            <br/>
            <h3 className='text-center'>User Details</h3>
            <br/>
            <div className="row d-flex justify-content-center h-100">
            <div className="card align-items-center shadow-5-strong">
                <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values ? values.map(values=> (
                            <tr key={values._id}>
                                <td>{++movieCount}</td>
                                <td>{values.name}</td>
                                <td>{values.email}</td>
                                <td>{values.role}</td>
                                <td>{values.register_date}</td>
                            </tr>
                        )
                        ):null
                    }
                </tbody>
                </table>
            </div>
            </div>
        </>
    )
}
