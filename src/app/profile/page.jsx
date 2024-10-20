'use client'
import { Box } from '@mui/material'
import { Header } from '../page'
import { Column } from '@/components/common/FlexObjects'
import { ProfileBlock } from './UI/ProfileBlock'

export default function ProfilePage() {
  return (
    <Column>
      <Header></Header>
      <ProfileBlock></ProfileBlock>
    </Column>
  )
}
