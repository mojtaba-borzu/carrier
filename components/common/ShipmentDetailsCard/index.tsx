import React from 'react'

// TODO ADDRESS -- BASKET_ID -- DELIVERY_TIME
function ShipmentDetailsCard({ item }) {
  return (
    <>
      <div className="w-full  flex flex-row items-center justify-between">
        <span className=" font-bold">
          {item.customBasketNumber ? item.customBasketNumber : '---'}
        </span>
        <span className=" font-bold">
          {item.deliveryTimeSlot ? item.deliveryTimeSlot : '---'}
        </span>
      </div>
      <div className="w-full line-clamp-1">{item.deliveryAddress}</div>
    </>
  )
}

export default ShipmentDetailsCard
