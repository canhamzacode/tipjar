"use client"
import React, { ReactNode, useEffect } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { useAppKitAccount } from '@reown/appkit/react'
import { useUser } from '@/context/userContext'

interface IProps {
    children: ReactNode
}

const AppLayout = ({ children }: IProps) => {
  const { isConnected,address } = useAppKitAccount();
  const {fetchData, getSolBalance} = useUser();

  useEffect(()=> {
    if (address && isConnected) {
      fetchData(address);
      getSolBalance(address);
    }
  },[isConnected, address])

  return (
    <>
        <Navbar />
        <div className="bg-white min-h-screen">
            {children}
        </div>
        <Footer />
    </>
  )
}

export default AppLayout