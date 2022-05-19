import React, {useEffect, useState} from 'react'
import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow ,useMediaQuery, useTheme ,Divider} from '@mui/material';
import axios from 'axios';

import Navbar from './Navbar'

export default function Movie() {
    const userId = sessionStorage.getItem("id");
    const role = sessionStorage.getItem("role");

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    let movieCount= 0;
    const [values,setValues]=useState([]);
    const [single,setSingle]=useState({});
    const [id,setId]=useState('')

    const [addValues,setAddValues]=useState({
        userId:'',
        name:'',
        cast:'',
        description:'',
        showTime:'',
        showDate:'',
        showTheatre:''
    });

    const handleChange=(event)=>{
        setAddValues({...addValues,
            [event.target.name]:event.target.value,
        })
    }
    const [isEdit,setIsEdit]=useState(false);
    const handleEditOpen=()=> setIsEdit(true)
    const handleEditClose=()=> setIsEdit(false)

    const [isAdd,setIsAdd]=useState(false);
    const handleAddOpen=()=> setIsAdd(true)
    const handleAddClose=()=> setIsAdd(false)

    const updateData = (value)=>{
        axios.put(`http://localhost:8001/update-movie/${id}`,value).then(res=>{
            
        })   
    }
    const addData = ()=>{
        axios.post('http://localhost:8001/add-movie/',addValues).then(res=>{
            
        })   
    }
    useEffect(()=>{
        axios.get('http://localhost:8290/movie/get-movie').then(res=>{
            setValues(res.data);
        })
    },[])
    if(role!=="Customer"){
        return(
        <>
            <Navbar/>
            <br/>
            <h3 className='text-center'>Movie Details</h3>
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
                                        axios.delete(`http://localhost:8001/delete-movie/${values._id}`).then(res=>{
                                            
                                        })
                                        }
                                    }>Delete</button>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
                                        setId(values._id)
                                        setSingle(values);
                                        handleEditOpen()
                                    }}>Edit</button>
                                </td>
                            </tr>
                        )
                        ):null
                    }
                </tbody>
                </table>
                <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={
                    ()=>{
                        setAddValues({userId: userId});
                        handleAddOpen()
                    }
                }>Add</button>
            </div>
            </div>
            <Grow in={isEdit} {...(isEdit ? { timeout: 500 } : {})}>
                <Dialog open={isEdit} onClose={handleEditClose} keepMounted maxWidth={'md'} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        Are You Sure to Update the Movie Details?
                        <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <div class="form-group"> <label for="username">
                                    <h6>Name</h6>
                                    </label> <input type="text" name="username" value={single.name} onChange={(e)=> setSingle({name:e.target.value})} id='username' placeholder="Card Owner Name" required class="form-control "/> </div>
                                <div class="form-group"> <label for="cardNumber">
                                        <h6>Description</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" value={single.description} id='cardNumber'onChange={(e)=> setSingle({description:e.target.value})} name="cardNumber" placeholder="Valid card number" class="form-control " required/>
                                    </div>
                                </div>
                                <div class="form-group"> <label for="amount">
                                        <h6>Show Date</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" value={single.showDate} id='amount' onChange={(e)=> setSingle({showDate:e.target.value})} name="amount" class="form-control " required/>
                                    </div>
                                </div>
                                <div class="form-group"> <label for="amount">
                                        <h6>Show Time</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" value={single.showTime} onChange={(e)=> setSingle({showTime:e.target.value})} id='amount' name="amount" class="form-control " required/>
                                    </div>
                                </div>
                            </form>
                    </DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='submit' onClick={()=>{
                                    updateData(single)
                                    handleEditClose()  
                            }} value='Yes, update it!'/>
                            <input type='reset' onClick={handleEditClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
            <Grow in={isAdd} {...(isAdd ? { timeout: 500 } : {})}>
                <Dialog open={isAdd} onClose={handleAddClose} keepMounted maxWidth={'md'} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        Are You Sure to Add the Movie Details?
                        <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <form>
                                <div class="form-group"> <label for="username">
                                    <h6>Name</h6>
                                    </label> <input type="text" name="name" value={addValues.name} onChange={handleChange} id='username' placeholder="Card Owner Name" required class="form-control "/> </div>
                                <div class="form-group"> <label for="cardNumber">
                                        <h6>Description</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" value={addValues.description} id='cardNumber' onChange={handleChange}  name="description" placeholder="Valid card number" class="form-control " required/>
                                    </div>
                                </div>
                                <div class="form-group"> <label for="username">
                                    <h6>Cast</h6>
                                    </label> <input type="text" name="cast" value={addValues.cast} onChange={handleChange}  id='username' placeholder="Card Owner Name" required class="form-control "/> </div>
                                <div class="form-group"> <label for="amount">
                                        <h6>Show Date</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" value={addValues.showDate} id='amount' onChange={handleChange} name="showDate" class="form-control " required/>
                                    </div>
                                </div>
                                <div class="form-group"> <label for="amount">
                                        <h6>Show Time</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" value={addValues.showTime} onChange={handleChange} id='amount' name="showTime" class="form-control " required/>
                                    </div>
                                </div>
                                <div class="form-group"> <label for="amount">
                                        <h6>Show Theatre</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" value={single.showTheatre} onChange={handleChange}  id='amount' name="showTheatre" class="form-control " required/>
                                    </div>
                                </div>
                            </form>
                    </DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='submit' onClick={()=>{
                                    addData()
                                    handleAddClose()  
                            }} value='Yes, update it!'/>
                            <input type='reset' onClick={handleAddClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
        </> 
        )
    }
    return (
        <>
            <Navbar/>
            <br/>
            <h3 className='text-center'>Movie Details</h3>
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
                                        axios.post('http://localhost:8290/cart/add-cart',{
                                            userId: userId,
                                            movieId:values._id,
                                            name: values.name,
                                            showDate: values.showDate,
                                            showTime:values.showTime,
                                            showTheatre:values.showTheatre}
                                        ).then(res=>{
                                            console.log(res.data);
                                        })
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
        </>
    )
}
