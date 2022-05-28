import React, {useEffect, useState, useRef} from 'react'
import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow ,useMediaQuery, useTheme ,Divider} from '@mui/material';
import axios from 'axios';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './Navbar'

export default function Movie() {

    const userId = sessionStorage.getItem("id");
    const role = sessionStorage.getItem("role");

    const [searchTerm,setSearchTerm]= useState('')
    const inputSearch=useRef();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    let movieCount= 0;

    const [values,setValues]=useState([]);
    const [single,setSingle]=useState({
        userId:'',
        name:'',
        cast: '',
        description:'',
        showTime:'',
        showDate:'',
        showTheatre:''
    });

    const [addValues,setAddValues]=useState({
        userId:'',
        name:'',
        cast:'',
        description:'',
        showTime:'',
        showDate:'',
        showTheatre:''
    });

    const handleUpdateChange=(event)=>{
        setSingle({...single,
            [event.target.name]:event.target.value,
        })
    }

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
        if(value.name !== '' && value.description !== '' && value.cast !== '' && value.showDate !== '' && value.showTime !== '' && value.showTheatre !== ''){
            axios.put(`http://localhost:8290/movie/update-movie/${value._id}`,value).then(res=>{
                axios.get(`http://localhost:8290/movie/get-movie/${userId}`).then(res=>{
                    setValues(res.data);
                    handleEditClose();
                    toast.success("Movie Data has been updated",{
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
        }   
    }
    const addData = ()=>{
        if(addValues.name !== '' && addValues.description !== '' && addValues.cast !== '' && addValues.showDate !== '' && addValues.showTime !== '' && addValues.showTheatre !== ''){
            axios.post('http://localhost:8290/movie/add-movie/',addValues).then(res=>{
                axios.get(`http://localhost:8290/movie/get-movie/${userId}`).then(res=>{
                    setValues(res.data);
                    handleAddClose();
                    toast.success("Movie Data has been added",{
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
        }
    }
    useEffect(()=>{
        if(role === 'Movie Admin'){
            axios.get(`http://localhost:8290/movie/get-movie/${userId}`).then(res=>{
                setValues(res.data);
            })
        }else{
            axios.get('http://localhost:8290/movie/get-movie').then(res=>{
                setValues(res.data);
            })
        }
    },[])

    if(role!=="Customer"){
        return(
        <>
            <Navbar/>
            <br/>
            <ToastContainer/>
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
                                        axios.delete(`http://localhost:8290/movie/delete-movie/${values._id}`).then(res=>{
                                            axios.get(`http://localhost:8290/movie/get-movie/${userId}`).then(res=>{
                                                setValues(res.data);
                                            })
                                        })
                                        }
                                    }>Delete</button>
                                    <button type="button" class="btn btn-link btn-sm btn-rounded" onClick={()=>{
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
                        Are You Sure to Update Movie Details?
                    <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <div class="form-group">
                                <label for="moviename">
                                    <h6>Movie Name</h6>
                                </label>
                                <div class="input-group"> 
                                <input type="text" name="name" value={single.name} onChange={handleUpdateChange} id='moviename' required class="form-control "/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="moviedescription">
                                    <h6>Movie Description</h6>
                                </label>
                                <div class="input-group"> 
                                    <input type="text" value={single.description} id='moviedescription'onChange={handleUpdateChange} name="description" class="form-control " required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="moviecast">
                                    <h6>Cast</h6>
                                </label>
                                <div class="input-group"> 
                                    <input type="text" name="cast" value={single.cast} onChange={handleUpdateChange}  id='moviecast' required class="form-control "/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="date">
                                    <h6>Show Date</h6>
                                </label>
                                <div class="input-group">
                                    <input type="text" value={single.showDate} id='date' onChange={handleUpdateChange} name="showDate" class="form-control " required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="time">
                                    <h6>Show Time</h6>
                                </label>
                                <div class="input-group">
                                    <input type="text" value={single.showTime} onChange={handleUpdateChange} id='time' name="showTime" class="form-control " required/>
                                </div>
                            </div>
                            </form>
                    </DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='submit' onClick={()=>{
                                    updateData(single)
                            }} value='Yes, update it!'/>
                            <input type='reset' onClick={handleEditClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
            <Grow in={isAdd} {...(isAdd ? { timeout: 500 } : {})}>
                <Dialog open={isAdd} onClose={handleAddClose} keepMounted maxWidth={'md'} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        Are You Sure to Add Movie Details?
                    <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <div class="form-group">
                                <label for="moviename">
                                    <h6>Movie Name</h6>
                                </label>
                                <div class="input-group"> 
                                    <input type="text" name="name" placeholder="Enter Movie Name" value={addValues.name} onChange={handleChange} id='moviename' required class="form-control "/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="moviedescription">
                                    <h6>Movie Description</h6>
                                </label>
                                <div class="input-group">
                                    <input type="text" placeholder="Enter Movie Description" value={addValues.description} id='moviedescription' onChange={handleChange}  name="description" class="form-control " required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="moviecast">
                                    <h6>Cast</h6>
                                </label>
                                <div class="input-group"> 
                                    <input type="text" name="cast" placeholder="Enter Movie Cast (Eg:[Vijay,Pooja Hedge]"  value={addValues.cast} onChange={handleChange}  id='moviecast' required class="form-control "/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="date">
                                    <h6>Show Date</h6>
                                </label>
                                <div class="input-group">
                                    <input type="text" placeholder="Enter Show Date" value={addValues.showDate} id='date' onChange={handleChange} name="showDate" class="form-control " required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="time">
                                    <h6>Show Time</h6>
                                </label>
                                <div class="input-group">
                                    <input type="text" placeholder="Enter Show Time" value={addValues.showTime} onChange={handleChange} id='time' name="showTime" class="form-control " required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="theatre">
                                    <h6>Show Theatre</h6>
                                </label>
                                <div class="input-group">
                                    <input type="text" placeholder="Enter Show Theatre" value={addValues.showTheatre} onChange={handleChange}  id='theatre' name="showTheatre" class="form-control " required/>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='submit' onClick={()=>{
                                    addData() 
                            }} value='Yes, update it!'/>
                            <input type='reset' onClick={handleAddClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
        </> 
        )
    }else{
        return (
            <>
                <Navbar/>
                <br/>
                <h3 className='text-center'>Movie Details</h3>
                <br/>
                <div className="row d-flex justify-content-center h-100">
                <div className="card align-items-center shadow-5-strong">
                    <div className='d-flex w-50 p-2'>
                        <div className="input-group mb-4">
                            <i className='fa-solid fa-magnifying-glass input-group-text d-flex'/>
                            <input type='text' id='search' ref={inputSearch} placeholder='Search by Movie Name/Theatre' className="form-control" onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                            <i className='fa fa-times input-group-text d-flex' onClick={()=>{
                                        inputSearch.current.focus();
                                        inputSearch.current.value='';
                                        setSearchTerm('')}}/>
                        </div>
                    </div>
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
                            values ? values.filter((val)=>{
                                if(searchTerm ==='') return val
                                else if(val.showTheatre.toLowerCase().includes(searchTerm.toLowerCase()) || val.name.toLowerCase().includes(searchTerm.toLowerCase()) ) return val
                            }).map(values=> (
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
                                                movieUserId:values.userId,
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
}
