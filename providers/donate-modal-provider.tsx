'use client'

import Modal from '@/components/Modal'
import { useDonateModel } from '@/hooks/use-donate-model'
import React from 'react'




const DonateModel = () => {

  const { open } = useDonateModel()
  
  return (
    <Modal open={open} title='Donate' description='Donate to this fundraiser' >
      This is donate model
    </Modal>
  )
}

export default DonateModel