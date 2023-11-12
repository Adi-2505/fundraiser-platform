'use client'
import React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

interface ModalProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  open?: boolean;
}



const Modal = (
  {
    title,
    description,
    children,
    open,
  }: ModalProps,) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>Modal Description</DialogDescription>
        </DialogHeader>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal