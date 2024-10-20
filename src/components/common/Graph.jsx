'use client'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function CustomGraph({ options, series, type, width, height }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      {(typeof window !== 'undefined') & isClient && (
        <Chart
          options={options}
          series={series}
          type={type}
          width={width ? width : 500}
          height={height ? height : 320}
        />
      )}
    </>
  )
}
