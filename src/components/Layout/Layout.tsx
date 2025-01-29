"use client"
import React, { ReactNode, useEffect } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { useAppKitAccount } from '@reown/appkit/react'
import { useUser } from '@/context/userContext'
import { ToastContainer } from 'react-toastify'

interface IProps {
    children: ReactNode
}

const AppLayout = ({ children }: IProps) => {
  const { isConnected, address, status } = useAppKitAccount();
  const {fetchData, getSolBalance, fetchAllTransactions, resetState} = useUser();

  useEffect(() => {
    const fetchAllData = async () => {
      if (address && isConnected) {
        try {
          await Promise.all([
            fetchData(address),
            getSolBalance(address),
            fetchAllTransactions(address),
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      if (status === "disconnected"){
        resetState();
      }
    };
  
    fetchAllData();
  }, [isConnected, address]);


  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="bg-white min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default AppLayout