import React from 'react'

function ShipmentTimeAndDetails({ shipmentDetails }) {
  return (
    <>
      <span className=" text-[18px] font-bold">
        {shipmentDetails?.customBasketNumber
          ? shipmentDetails?.customBasketNumber
          : '---'}
      </span>
      <span className="">
        {` `} بازه ارسال {`  `}
        {shipmentDetails?.deliveryTimeSlot
          ? shipmentDetails?.deliveryTimeSlot
          : '---'}
      </span>
    </>
  )
}

export default ShipmentTimeAndDetails
