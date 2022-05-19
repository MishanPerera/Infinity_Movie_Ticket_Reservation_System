import React, {useEffect, useState} from 'react'
import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow} from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar'

export default function Cart() {
    const userId = sessionStorage.getItem("id");
    let cartCount= 0;
    const amount = 1000;
    const [values,setValues]=useState([]);

    const [single,setSingle]= useState({})

    const [isEdit,setIsEdit]=useState(false);
    const handleEditOpen=()=> setIsEdit(true)
    const handleEditClose=()=> setIsEdit(false)

    const postData =()=>{
        console.log(single)
        axios.post('http://localhost:8290/reservation/add-reservation',{
            userId: userId, 
			movieId: single.movieId,
			name: single.name, 
			showDate: single.showDate,
			showTime: single.showTime, 
			showTheatre: single.showTheatre
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:8290/cart/get-cart/${userId}`).then(res=>{
            setValues(res.data);
        })
    },[])
    return (
        <>
            <Navbar/>
            <br/>
            <h3 className='text-center'>Cart Details</h3>
            <br/>
            <div className="row d-flex justify-content-center h-100">
            <div className="card align-items-center shadow-5-strong">
                <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Reserve Date</th>
                        <th>Theatre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values ? values.map(values=> (
                            <tr key={values._id}>
                                <td>{++cartCount}</td>
                                <td>{values.name}</td>
                                <td>{values.showDate}</td>
                                <td>{values.showTime}</td>
                                <td>{values.showTheatre}</td>
                                <td>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                        axios.delete(`http://localhost:8003/delete-cart/${values._id}`).then(res=>{
                                            
                                        })
                                        }
                                    }>Remove</button>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                            setSingle(values);
                                            handleEditOpen();
                                    }
                                    }>Add</button>
                                </td>
                            </tr>
                        )
                        ):null
                    }
                </tbody>
                </table>
            </div>
            </div>
            {/* Edit Feedback Function Dailog Box*/}
                <Grow in={isEdit} {...(isEdit ? { timeout: 500 } : {})}>
                    <Dialog open={isEdit} onClose={handleEditClose} keepMounted>
                        <DialogTitle>Payment Page</DialogTitle>
                        <DialogContent>
                            <div class="container py-5 h-100 w-100">
        <div class="col-lg-6 mx-auto w-100">
            <div class="card p-md-5 mx-md-4">
                <div class="card-header">
                    <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                        {/* <!-- Credit card form tabs --> */}
                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-credit" role="tab"
                                                aria-controls="pills-login" aria-selected="true">Credit Card</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-mobile" role="tab"
                                    aria-controls="pills-register" aria-selected="false">Mobile</a>
                            </li>
                        </ul>
                    </div> 
                    {/* <!-- End --> */}
                    {/* <!-- Credit card form content --> */}
                    <div class="tab-content">
                        {/* <!-- credit card info--> */}
                        <div id="pills-credit" class="tab-pane fade show active">
                            <form>
                                <div class="form-group"> <label for="username">
                                    <h6>Card Owner</h6>
                                    </label> <input type="text" name="username" id='username' placeholder="Card Owner Name" required class="form-control "/> </div>
                                <div class="form-group"> <label for="cardNumber">
                                        <h6>Card number</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" id='cardNumber' name="cardNumber" placeholder="Valid card number" class="form-control " required/>
                                    </div>
                                </div>
                                <div class="form-group"> <label for="amount">
                                        <h6>Amount</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" id='amount' value={amount} readOnly name="amount" class="form-control " required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group"> <label><span class="hidden-xs">
                                                    <h6>Expiration Date</h6>
                                                </span></label>
                                            <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required/> <input type="number" placeholder="YY" name="" class="form-control" required/> </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group mb-4">
                                        <label data-toggle="tooltip" title="Three digit CVV code on the back of your card">
                                            <h6>CVV</h6>
                                        </label><input type="text" required class="form-control"/></div>
                                    </div>
                                </div>
                                <div class="card-footer"><button type="submit" class="subscribe btn btn-primary btn-block shadow-sm"  onClick={()=>{
                                    postData();
                                    handleEditClose();
                                }}>Confirm Payment</button></div>
                            </form>
                    </div> 
                    {/* <!-- End --> */}
                    {/* <!-- Mobile Phone info --> */}
                    <div id="pills-mobile" class="tab-pane fade">
                        <form>
                        <label className="form-label d-block" htmlFor="registerUsername">Mobile Number</label>
                        <div className="input-group mb-4">
                            <i className='fa-solid fa-mobile input-group-text d-flex'/>
                            <input type="text" placeholder='Enter Username' id="registerUsername" name='username' className="form-control"/>
                        </div>
                        <label className="form-label d-block" htmlFor="registerUsername">Pin Number</label>
                        <div className="input-group mb-4">
                            <i className='fa-solid fa-arrow-down-1-9 input-group-text d-flex'/>
                            <input type="text" placeholder='Enter Username' id="registerUsername" name='username' className="form-control"/>
                        </div>
                        <label className="form-label d-block" htmlFor="registerUsername">Amount</label>
                        <div className="input-group mb-4">
                            <i className='fa-solid fa-money-bill input-group-text d-flex'/>
                            <input type="text" placeholder='Enter Username' value={amount} readOnly id="registerUsername" name='username' className="form-control"/>
                        </div>
                        <div class="card-footer"><button type="submit" class="subscribe btn btn-primary btn-block shadow-sm" 
                        onClick={()=>{
                                    postData();
                                    handleEditClose();
                                }}>Confirm Payment</button></div>
                        </form>
                    </div>
                     {/* <!-- End --> */}
                </div>
            </div>
        </div>
    </div>
    </div>
                        </DialogContent>
                    </Dialog>
                </Grow>
        </>
    )
}
