//labraries
import React from 'react'

//interface
import { BottomSheetTypes } from './bottomSheetTypes'

function BottomSheet({
  children,
  handleClose,
  height,
  status = true,
  per,
}: BottomSheetTypes) {
  return (
    <div
      className={`fixed bottom-0 left-0  z-20 flex h-full w-full  select-none items-end  justify-center
      duration-500  ${!status && 'translate-y-full'}`}
    >
      <div
        onClick={handleClose}
        className={`fixed top-0 z-30 h-screen ${
          status
            ? 'bg-[#000000] opacity-40 delay-500 duration-200'
            : 'bg-white opacity-10 '
        } w-full `}
      />
      <div
        style={{ height: `${height}${per ? '%' : 'px'}` }}
        className="relative z-30 flex w-full justify-center bg-white"
      >
        {children}
      </div>
    </div>
  )
}

export default BottomSheet
