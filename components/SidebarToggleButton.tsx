'use client'

import React, { useEffect } from 'react'

import { Menu, X } from "lucide-react";

import { useSidebarStore } from '@/hooks/use-sidebar'


const SidebarToggleButton = () => {

  const { open, onOpen } = useSidebarStore();

  const toogleSidebar = () => {
    onOpen();
  }

 

  return (
    <div onClick={toogleSidebar}>
      {open ? <X /> : <Menu />}
    </div>
  )
}

export default SidebarToggleButton