'use client'
import { Center, Column, Row } from '@/components/common/FlexObjects'
import { Box } from '@mui/material'
import { Header } from './UI/Header'
import {
  Blocks,
  Blocks1,
  Blocks2,
  Blocks3,
  Blocks4,
  Blocks5
} from './UI/Blocks'
import { BottomBar } from './UI/BottomBar'
import { useState } from 'react'

export default function TerminalTalon() {
  const [block, setBlock] = useState(0)
  const list = [
    <Blocks setBlock={setBlock}></Blocks>,
    <Blocks1 setBlock={setBlock}></Blocks1>,
    <Blocks2 setBlock={setBlock}></Blocks2>,
    <Blocks3 setBlock={setBlock}></Blocks3>,
    <Blocks4 setBlock={setBlock}></Blocks4>,
    <Blocks5 setBlock={setBlock}></Blocks5>
  ]
  return (
    <>
      {list[block]}
      <BottomBar block={block} setBlock={setBlock}></BottomBar>
    </>
  )
}
