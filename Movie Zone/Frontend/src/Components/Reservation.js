import React, {useEffect, useState} from 'react'
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './Navbar'

export default function Reservation() {
    const userId = sessionStorage.getItem("id");
    const role = sessionStorage.getItem("role");

    let movieCount= 0;
    const [values,setValues]=useState([]);

    useEffect(()=>{
        if(role === 'Movie Admin'){
            axios.get(`http://localhost:8290/reservation/get-adminreservation/${userId}`).then(res=>{
                setValues(res.data);
            })
        }else if(role === 'System Admin'){
            axios.get('http://localhost:8290/reservation/get-reservation/').then(res=>{
                setValues(res.data);
            })
        }else{
            axios.get(`http://localhost:8290/reservation/get-reservation/${userId}`).then(res=>{
                setValues(res.data);
            })
        }
    },[])
    if(role !== 'Customer'){
        return(
            <>
            <Navbar/>
            <br/>
            <h3 className='text-center'>Reservation Details</h3>
            <br/>
            <div className="row d-flex justify-content-center h-100">
            <div className="card align-items-center shadow-5-strong">
                <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Show Date</th>
                        <th>Time</th>
                        <th>Theatre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values ? values.map(values=> (
                            <tr key={values._id}>
                                <td>{++movieCount}</td>
                                <td>{values.name}</td>
                                <td>{values.showDate}</td>
                                <td>{values.showTime}</td>
                                <td>{values.showTheatre}</td>
                                <td>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                        axios.delete(`http://localhost:8290/reservation/delete-reservation/${values._id}`).then(res=>{
                                            if(role === 'Movie Admin'){
                                                axios.get(`http://localhost:8290/reservation/get-adminreservation/${userId}`).then(res=>{
                                                    setValues(res.data);
                                                })
                                            }else{
                                                axios.get('http://localhost:8290/reservation/get-reservation/').then(res=>{
                                                    setValues(res.data);
                                                })
                                            }
                                        })
                                    }}>Cancel</button>
                                </td>
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
    return (
        <>
            <Navbar/>
            <br/>
            <ToastContainer/>
            <h3 className='text-center'>Reservation Details</h3>
            <br/>
            <div className="row d-flex justify-content-center h-100">
            <div className="card align-items-center shadow-5-strong">
                <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Cast</th>
                        <th>Description</th>
                        <th>Show Date</th>
                        <th>Time</th>
                        <th>Theatre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values ? values.map(values=> (
                            <tr key={values._id}>
                                <td>{++movieCount}</td>
                                <td>{values.name}</td>
                                <td>{
                                        values.cast ? values.cast.map(values=>(
                                            <>{values}<br/></>
                                        )): null
                                    }</td>
                                <td>{values.description}</td>
                                <td>{values.showDate}</td>
                                <td>{values.showTime}</td>
                                <td>{values.showTheatre}</td>
                                <td>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                        window.location.pathname = "/qr/"+values._id;
                                    }}>Go</button>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                        axios.delete(`http://localhost:8290/reservation/delete-reservation/${values._id}`).then(res=>{
                                            axios.get(`http://localhost:8290/reservation/get-reservation/${userId}`).then(res=>{
                                                setValues(res.data);
                                                toast.success("Cash will be reimbursed",{
                                                    position: "top-center",
                                                    autoClose: 1000,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: false,
                                                    progress: undefined,
                                            })
                                            })
                                        })
                                    }}>Delete</button>
                                </td>
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
