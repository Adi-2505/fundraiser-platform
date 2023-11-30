'use client'
import React from 'react'

import Link from 'next/link'

import Modal from '@/components/Modal'

import { Button } from '@/components/ui/button'

import { useLoginModalStore } from '@/hooks/use-login-modal'


const LoginModal = () => {

  const { open, onClose } = useLoginModalStore()

  return (
    <Modal
      title="Login"
      description="Login to your account to comment to this fundraiser."
      open={open}
      onClose={onClose}
    >
      <Link href={'/auth'}>
        <Button className='w-full'>Login</Button>
      </Link>
    </Modal>
  )
}

export default LoginModal