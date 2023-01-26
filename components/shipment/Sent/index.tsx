//libraries
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { ClipLoader, PulseLoader } from 'react-spinners'
import ReactCodeInput from 'react-code-input'

//components (UIkit)
import BottomSheet from '../../common/bottomSheet/BottomSheet'

//components
import ShipmentDetailsCard from '../../common/ShipmentDetailsCard'
import ShipmentTimeAndDetails from '../../common/ShipmentTimeAndDetails'

//types
import { SentInterface } from './SentType'

//icons
import Phone_icon from '../../common/icons/Phone_icon'
import Pointer_icon from '../../common/icons/Pointer_icon'
import Confirm_icon from '../../common/icons/Confirm_icon'
import Location_icon from '../../common/icons/Location_icon'
import Distance_icon from '../../common/icons/Distance_icon'

//RTK api
import {
  usePutMarkAsDeliveredMutation,
  usePostTrackingCodeResendMutation,
} from '../../../service/dashboard/dashboardApi'

//dynamic import map
const SimpleMap = dynamic(() => import('../../common/NeshanMap'), {
  ssr: false,
})

function Sent({ getListForCarrier }) {
  //states
  const [verifyCode, setVerifyCode] = useState('')
  const [showBottomSheetStatus, setShowBottomSheetStatus] = useState(false)
  const [shipmentDetails, setShipmentDetails] = useState<SentInterface>(null)
  const [putMarkAsDeliveredErrorStatus, setPutMarkAsDeliveredErrorStatus] =
    useState(false)
  const [putMarkAsDeliveredSuccessStatus, setPutMarkAsDeliveredSuccessStatus] =
    useState(false)
  const [showBottomSheetCodeStatus, setShowBottomSheetCodeStatus] =
    useState(false)
  const [putMarkAsDelivered, putMarkAsDeliveredResponse] =
    usePutMarkAsDeliveredMutation()
  const [shipmentDetailsMapStatus, setShipmentDetailsMapStatus] =
    useState(false)
  const [postTrackingCodeResend, postTrackingCodeResendResponse] =
    usePostTrackingCodeResendMutation()

  return (
    <section className="w-full h-full flex flex-col items-center mt-[16px] gap-[8px]">
      {getListForCarrier?.data.map((item: SentInterface) => (
        <div
          key={item.id}
          className="w-full text-[#505050] flex flex-col items-center p-[16px] border border-dashed rounded-[8px] gap-[16px]"
        >
          <ShipmentDetailsCard item={item} />
          <div className="w-full flex flex-row items-center gap-[16px]">
            <button
              onClick={() => {
                setVerifyCode('')
                document.body.style.overflow = 'hidden'
                setShipmentDetails(item)
                setShowBottomSheetStatus(true)
              }}
              className="w-full h-[48px] bg-[#0064BF] rounded-[8px] text-[18px] font-semibold text-white"
            >
              مشاهده
            </button>
            <button
              onClick={() => {
                setShipmentDetails(item)
                setShipmentDetailsMapStatus(true)
              }}
              className="w-full h-[48px] bg-[#0064BF] rounded-[8px] text-[18px] font-semibold text-white"
            >
              نقشه
            </button>
          </div>
        </div>
      ))}
      <BottomSheet
        height={90}
        per
        status={showBottomSheetStatus}
        handleClose={() => {
          document.body.style.overflow = 'unset'
          setShipmentDetails(null)
          setShowBottomSheetStatus(false)
        }}
      >
        <div className="w-full h-full overflow-auto flex flex-col items-center relative pb-[90px]">
          <div className="w-[60px] rounded-[10px] h-[6px] bg-[#CECECE] mt-[10px]" />

          <div className="w-10/12 flex flex-col items-center py-[20px] gap-[4px] ">
            <ShipmentTimeAndDetails shipmentDetails={shipmentDetails} />
          </div>

          <div className="w-10/12 text-[#505050] flex flex-row items-center justify-between bg-[#F2F9FF] py-[16px] text-[16px] px-[10px] font-semibold rounded-[8px]">
            <span>{shipmentDetails?.recepientFullName}</span>
            <a
              href={`tel:${shipmentDetails?.recepientCellphone}`}
              className="w-[40px] h-[40px] rounded-[8px] bg-[#0064BF] flex justify-center items-center"
            >
              <Phone_icon />
            </a>
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
          <div className="w-full bg-white fixed bottom-4 flex flex-col items-center gap-[16px]">
            <button
              onClick={() => {
                setShowBottomSheetCodeStatus(true)
                // document.body.style.overflow = 'unset'
                // setShipmentDetails(null)
                // setShowBottomSheetStatus(false)
              }}
              className="w-10/12 h-[48px] bg-[#0064BF] rounded-[8px] text-[18px] font-semibold text-white"
            >
              تایید تحویل
            </button>
            <button
              onClick={() => {
                document.body.style.overflow = 'unset'
                setShipmentDetails(null)
                setShowBottomSheetStatus(false)
              }}
              className=" w-10/12 h-[48px] bg-[#A4A4A4]  rounded-[8px] text-[18px] font-semibold text-white"
            >
              بازگشت
            </button>
          </div>
        </div>
        <BottomSheet
          height={90}
          per
          status={showBottomSheetCodeStatus}
          handleClose={() => {
            setVerifyCode('')
            setPutMarkAsDeliveredErrorStatus(false)
            setPutMarkAsDeliveredSuccessStatus(false)
            setShowBottomSheetCodeStatus(false)
          }}
        >
          <div className="w-full h-full overflow-auto flex flex-col items-center relative ">
            <div className="w-full h-full overflow-auto flex flex-col items-center relative">
              <div className="w-[60px] rounded-[10px] h-[6px] bg-[#CECECE] mt-[10px]"></div>

              <div className="w-10/12 flex flex-col items-center py-[20px] gap-[4px] ">
                <div className="w-10/12 flex flex-row items-center justify-between">
                  <span className=" text-[18px] font-bold">
                    {shipmentDetails?.customBasketNumber
                      ? shipmentDetails?.customBasketNumber
                      : '---'}
                  </span>
                  <div>
                    <button
                      disabled={postTrackingCodeResendResponse?.isLoading}
                      onClick={() => {
                        postTrackingCodeResend({
                          shipmentId: shipmentDetails?.id,
                        })
                          .unwrap()
                          .then(() => {
                            toast.success(`کد ارسال شد`, {
                              style: {
                                backgroundColor: '#1CB65D',
                                color: '#f5f5f5',
                                alignContent: 'center',
                              },
                              closeButton: false,
                              icon: '',
                              position: 'top-center',
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            })
                          })
                          .catch(() => {
                            toast.error(`  خطای سیستمی`, {
                              style: {
                                backgroundColor: '#E10A0A',
                                color: '#f5f5f5',
                                alignContent: 'center',
                              },
                              closeButton: false,
                              icon: '',
                              position: 'top-center',
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            })
                          })
                      }}
                      className="text-[14px] font-semibold text-[#0085FF]"
                    >
                      {postTrackingCodeResendResponse?.isLoading ? (
                        <PulseLoader color="#888888" size={10} />
                      ) : (
                        <span> ارسال مجدد کد</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-10/12 text-[#505050] flex flex-row items-center justify-center  py-[16px] text-[16px] px-[10px] font-semibold rounded-[8px]">
                <span>{shipmentDetails?.recepientFullName}</span>
              </div>
              <div className="w-10/12 flex justify-center text-[#505050]">
                کد تحویل کالا را وارد کنید
              </div>
              <div
                dir="ltr"
                className={`mt-[19px] !font-mainFa delay-1000 ${
                  showBottomSheetCodeStatus ? 'block' : 'hidden'
                }`}
              >
                <ReactCodeInput
                  value={verifyCode}
                  type="number"
                  fields={5}
                  name=""
                  inputMode="numeric"
                  disabled={putMarkAsDeliveredSuccessStatus}
                  onChange={(e) => {
                    setPutMarkAsDeliveredErrorStatus(false)
                    if (String(e).length == 5 && e) {
                      putMarkAsDelivered({
                        shipmentId: shipmentDetails?.id,
                        trackingCode: e,
                      })
                        .unwrap()
                        .then(() => {
                          setPutMarkAsDeliveredErrorStatus(false)
                          setPutMarkAsDeliveredSuccessStatus(true)
                        })
                        .catch(() => {
                          setPutMarkAsDeliveredErrorStatus(true)
                        })
                    }
                    setVerifyCode(e)
                  }}
                />
              </div>
              {/* api error  */}
              {putMarkAsDeliveredErrorStatus && (
                <div className="w-10/12 text-[#DD3730] text-[12px] text-center">
                  کد وارد شده صحیح نمی‌باشد. مجددا تلاش کنید
                </div>
              )}
              {/* api success  */}
              {putMarkAsDeliveredSuccessStatus && (
                <div className="w-10/12 flex flex-col items-center">
                  <span className="scale-75 mt-[20px]">
                    <Confirm_icon />
                  </span>
                  <div className="text-[18px] font-semibold text-[#1CB65D]">
                    با موفقیت ثبت شد
                  </div>
                  <div className="text-[#505050] mt-[4px]">
                    لطفا بسته را به مشتری تحویل دهید
                  </div>
                </div>
              )}
            </div>
            <div className="w-full bg-white  flex flex-col items-center gap-[16px]  mb-[30px]">
              {/* api success remove */}
              {!putMarkAsDeliveredSuccessStatus && (
                <button
                  disabled={putMarkAsDeliveredResponse?.isLoading}
                  onClick={() => {
                    if (verifyCode) {
                      putMarkAsDelivered({
                        shipmentId: shipmentDetails?.id,
                        trackingCode: verifyCode,
                      })
                        .unwrap()
                        .then(() => {
                          setPutMarkAsDeliveredSuccessStatus(true)
                          setPutMarkAsDeliveredErrorStatus(false)
                        })
                        .catch(() => {
                          setPutMarkAsDeliveredErrorStatus(true)
                        })
                    }
                  }}
                  className="w-10/12 h-[48px] bg-[#0064BF] rounded-[8px] text-[18px] font-semibold text-white flex justify-center items-center"
                >
                  {putMarkAsDeliveredResponse?.isLoading ? (
                    <ClipLoader color="#ffffff" size={25} />
                  ) : (
                    'تایید کد'
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  setVerifyCode('')
                  setPutMarkAsDeliveredErrorStatus(false)
                  setPutMarkAsDeliveredSuccessStatus(false)
                  setShowBottomSheetCodeStatus(false)
                }}
                className=" w-10/12 h-[48px] bg-[#A4A4A4] rounded-[8px] text-[18px] font-semibold text-white"
              >
                بازگشت
              </button>
            </div>
          </div>
        </BottomSheet>
      </BottomSheet>

      {shipmentDetailsMapStatus && (
        <div className="w-full min-h-screen fixed top-0 left-0 flex justify-center">
          <SimpleMap
            basketLocation={shipmentDetails?.customBasketNumber}
            nameLocation={shipmentDetails?.deliveryLocationTitle}
            deliveryAddressLatitude={shipmentDetails?.deliveryAddressLatitude}
            deliveryAddressLongitude={shipmentDetails?.deliveryAddressLongitude}
          />
          {/* <a
            className="w-[100px] h-[50px] bg-red-200"
            href="intent:#Intent;action=nshn:47.6,-122.3;end"
          >
            Link to my stuff
          </a> */}
          <button
            onClick={() => {
              // 'intent://nshn:47.6,-122.3/#Intent;scheme=neshan'
              // const url = 'intent://nshn:47.6,-122.3/#Intent;scheme=neshan'
              // window.location.replace(url)
              setShipmentDetailsMapStatus(false)
            }}
            className=" fixed bottom-10 w-10/12 h-[48px] bg-[#A4A4A4] rounded-[8px] text-[18px] font-semibold text-white z-[9999999]"
          >
            بازگشت
          </button>
        </div>
      )}
    </section>
  )
}

export default Sent
