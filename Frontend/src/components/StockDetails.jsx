import React from 'react'
import { useParams } from 'react-router-dom'

const StockDetails = () => {
    const { stock } = useParams()

    console.log(stock)

  return (
    <>
      StockDetails
      <div>



      </div>
      

    </>
  )
}

export default StockDetails
