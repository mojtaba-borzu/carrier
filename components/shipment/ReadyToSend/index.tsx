//libraries
import React, { useState } from 'react'

//components
import BottomSheet from '../../common/bottomSheet/BottomSheet'

//icons
import Pointer_icon from '../../common/icons/Pointer_icon'
import Location_icon from '../../common/icons/Location_icon'
import Distance_icon from '../../common/icons/Distance_icon'

//types
import { ReadyToSendInterface } from './readyToSendType'
import ShipmentDetailsCard from '../../common/ShipmentDetailsCard'
import ShipmentTimeAndDetails from '../../common/ShipmentTimeAndDetails'

function ReadyToSend({ getListForCarrier }) {
  const [showBottomSheetStatus, setShowBottomSheetStatus] = useState(false)
  const [shipmentDetails, setShipmentDetails] =
    useState<ReadyToSendInterface>(null)

  return (
    <section className="w-full h-full flex flex-col items-center mt-[16px] gap-[8px]">
      {getListForCarrier?.data.map((item: ReadyToSendInterface) => (
        <div
          key={item.id}
          className="w-full text-[#505050] flex flex-col items-center p-[16px] border border-dashed rounded-[8px] gap-[16px]"
        >
          <ShipmentDetailsCard item={item} />
          <button
            onClick={() => {
              document.body.style.overflow = 'hidden'
              setShipmentDetails(item)
              setShowBottomSheetStatus(true)
            }}
            className="w-full h-[48px] bg-[#0064BF] rounded-[8px] text-[18px] font-semibold text-white"
          >
            مشاهده
          </button>
        </div>
      ))}
      <BottomSheet
        height={80}
        per
        status={showBottomSheetStatus}
        handleClose={() => {
          document.body.style.overflow = 'unset'
          setShipmentDetails(null)
          setShowBottomSheetStatus(false)
        }}
      >
        <div className="w-full h-full overflow-auto flex flex-col items-center relative ">
          <div className="w-[60px] rounded-[10px] h-[6px] bg-[#CECECE] mt-[10px]"></div>

          <div className="w-10/12 flex flex-col items-center py-[20px] gap-[4px] border-b">
            <ShipmentTimeAndDetails shipmentDetails={shipmentDetails} />
          </div>
          <div className="w-10/12 flex flex-row items-center mt-[16px] gap-[16px] ">
            <div className="flex justify-center items-center">
              <div className="absolute w-[10px] h-[10px] bg-blue-500 rounded-full"></div>
              <Pointer_icon />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[18px] font-semibold text-[#505050]">
                {shipmentDetails?.pickUpLocationTitle}
              </span>
              <span className=" text-[#6B6B6B]">
                {shipmentDetails?.pickUpLocationAddress}
              </span>
            </div>
          </div>
          <div className="w-10/12 px-[10px]">
            <Distance_icon />
          </div>
          <div className="w-10/12 flex flex-row items-center mt-[16px] px-[5px] gap-[16px] pb-[80px]">
            <div className="flex justify-center items-center">
              <Location_icon />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[18px] font-semibold text-[#505050]">
                {shipmentDetails?.deliveryLocationTitle}
              </span>
              <span className=" text-[#6B6B6B]">
                {shipmentDetails?.deliveryLocationAddress}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              document.body.style.overflow = 'unset'
              setShipmentDetails(null)
              setShowBottomSheetStatus(false)
            }}
            className="fixed bottom-4 w-10/12 h-[48px] bg-[#A4A4A4]  rounded-[8px] text-[18px] font-semibold text-white"
          >
            بازگشت
          </button>
        </div>
      </BottomSheet>
    </section>
  )
}

export default ReadyToSend
