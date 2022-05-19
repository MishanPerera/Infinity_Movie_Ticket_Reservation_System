import React, {useEffect, useState} from 'react'
import {HashLoader} from "react-spinners";
import {Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import customer from './Assets/Customer.jpg';
import movieAdmin from './Assets/Movie Admin.jpg';
import systemAdmin from './Assets/Admin.jpg';

export default function RoleSelector() {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },1000);
    },[]);

    return (
    <div className="App">
        {loading ? 
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography gutterBottom variant="h3" component="div" align='center'>Movie Zone</Typography>
            <Typography variant="h4" color="text.secondary" align='center'>Online Reservation Platform</Typography>
            <br/>
            <br/>
            <Container maxWidth="sm" justifyContent="center" align='center'>
                <HashLoader loading={loading}/>
            </Container>
        </Box>:<Paper elevation={24}>
            <Grid item xs={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center'}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, mt: 3 }}>
            <Box
            sx={{
                p: 2,
                bgcolor: 'beige',
                gap: 2,
                flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1},
                display:'flex',
                flexDirection:'row',
                justifyContent:'center'
            }}
            >
            <Paper elevation={16} >
                <Card sx={{ maxWidth: 345}}>
                        <CardMedia
                        component="img"
                        height="150"
                        image= {systemAdmin}
                        alt="System Admin"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            System Admin
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='justify'>
                            No one is more cherished in this world than someone who lightens the burden of another. 
                            Set impossible challenges, then catch up with them.
                        </Typography>
                        </CardContent>
                        <div className='_btn'>
                            <Link to={'/login/System Admin'}>
                                <button>Go<i className='fas fa-arrow-circle-right'/></button>
                            </Link>
                        </div>
                </Card>
            </Paper>
            <Paper elevation={16} >
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                        component="img"
                        height="150"
                        image={movieAdmin}
                        alt="Movie Admin"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Movie Admin
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='justify'>
                            A good leader is a person who takes a little more than his share of the blame and a little less than his share of the credit.
                        </Typography>
                        </CardContent>
                        <div className='_btn'>
                            <Link to={'/login/Movie Admin'}>
                                <button>Go<i className='fas fa-arrow-circle-right'/></button>
                            </Link>
                        </div>
                </Card>
            </Paper>
            <Paper elevation={16} >
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                        component="img"
                        height="150"
                        image={customer}
                        alt="Customer"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Customer
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='justify'>
                            Ability is what you’re capable of doing. Motivation determines what you do. Attitude determines how well you do it.
                        </Typography>
                        </CardContent>
                        <div className='_btn'>
                            <Link to={'/login/Customer'}>
                                <button>Go<i className='fas fa-arrow-circle-right'/></button>
                            </Link>
                        </div>
                </Card>
            </Paper>
            </Box>
        </Grid>
        </Paper>}
    </div>
    )
}
