'use client'
import React, { useContext, useEffect, useState } from 'react'
import Login from '../components/forms/login'
import Container from '../components/containers/container'
import { BrowserRouter as Router  } from 'react-router-dom'
import { AuthContext } from '../components/context/authentication'

export default function Page() {
  const {authenticated, setAuthenticated} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(false);
      }, []);
      
    // if (authenticated) return `already logged in`
    return (
    <>
        {!loading && !authenticated && (
            <Container>
              <Router>
                <Login/>
              </Router>
            </Container>
        )}
    </>
  )
}