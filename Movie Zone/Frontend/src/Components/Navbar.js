import React from 'react'
import {Box, Avatar, AppBar, Toolbar, IconButton, Typography, Button, Container} from '@mui/material'
import logo from '../Assets/logo.jpg'

export default function Navbar() {
    const role = sessionStorage.getItem("role");
    const handleLogout=()=>{
        sessionStorage.clear();
        setInterval(()=> window.location.pathname = "/",1000);
    }

    if(role === "System Admin"){
        return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar sx={{display: 'flex', alignItems:'center', backgroundColor: 'gray'}}>
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content'}}>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <Avatar
                    alt="Logo"
                    src={logo}
                    sx={{ width: 36, height: 36 }}
                />
                </IconButton>
                <Typography variant="h5" noWrap component="a" href="/home" sx={{ flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Movie Zone
                </Typography>
            </Container>
            <Container>
                <Typography variant="body1" noWrap component="a" href="/home" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Home
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/user" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                User
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/reservation" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Reservation
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/about" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                About
                </Typography>
            </Container>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
        </AppBar>
    </Box>
        )
    }
    else if(role === 'Movie Admin'){
        return(
            <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar sx={{display: 'flex', alignItems:'center', backgroundColor: 'gray'}}>
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content'}}>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <Avatar
                    alt="Logo"
                    src={logo}
                    sx={{ width: 36, height: 36 }}
                />
                </IconButton>
                <Typography variant="h5" noWrap component="a" href="/home" sx={{ flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Movie Zone
                </Typography>
            </Container>
            <Container>
                <Typography variant="body1" noWrap component="a" href="/home" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Home
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/movie" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Movie
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/reservation" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Reservation
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/about" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                About
                </Typography>
            </Container>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
        </AppBar>
    </Box>
        )
    }
    else{
    return (
    //   <!-- Navbar -->
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar sx={{display: 'flex', alignItems:'center', backgroundColor: 'gray'}}>
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content'}}>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <Avatar
                    alt="Logo"
                    src={logo}
                    sx={{ width: 36, height: 36 }}
                />
                </IconButton>
                <Typography variant="h5" noWrap component="a" href="/home" sx={{ flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Movie Zone
                </Typography>
            </Container>
            <Container>
                <Typography variant="body1" noWrap component="a" href="/home" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Home
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/movie" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Movie
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/cart" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Cart
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/reservation" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                Reservation
                </Typography>
                <Typography variant="body1" noWrap component="a" href="/about" sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                About
                </Typography>
            </Container>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
        </AppBar>
    </Box>
    );
}
}
