'use client'
import React, { useEffect, useState } from 'react'
import Login from '../components/forms/login'
import Container from '../components/containers/container'
import { isAuthenticated } from '../utils/authenticated'

export default function Page() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setAuthenticated(isAuthenticated());
        setLoading(false);
      }, []);
      
    if (authenticated) return `already logged in`
    return (
    <>
        {!loading && !authenticated && (
                    <Container>
                    <Login/>
        
                </Container>
        )}
    </>
  )
}