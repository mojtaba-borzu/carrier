//libraries
import { useState } from 'react'
import type { NextPage } from 'next'

//RTK api
import {
  useGetSummaryInfoQuery,
  useGetListForCarrierQuery,
} from '../service/dashboard/dashboardApi'

//components
import Sent from '../components/shipment/Sent'
import NavBar from '../components/shipment/NavBar'
import ListTab from '../components/shipment/TabList'
import Delivery from '../components/shipment/Delivery'
import ReadyToSend from '../components/shipment/ReadyToSend'

//RTK hooks
import { useAppSelector } from '../redux/hooks'

//RTK slice
import { selectAccessToken } from '../slices/commonSlice'

const heroBoxDetails = [
  {
    id: 2,
    label: 'readyToSendCount',
    persianLabel: 'آماده ارسال',
    count: 0,
    image: 'readytosend.png',
    color: '#FDF4DA',
  },
  {
    id: 3,
    label: 'sentCount',
    persianLabel: 'دریافت شده',
    count: 0,
    image: 'sent.png',
    color: '#DFF0FF',
  },
  {
    id: 4,
    label: 'deliveredCount',
    persianLabel: 'تحویل شده',
    count: 0,
    image: 'deliver.png',
    color: '#D0F8E1',
  },
]

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState(2)
  const accessToken = useAppSelector(selectAccessToken)

  const { data: getSummaryInfo, isSuccess } = useGetSummaryInfoQuery(
    undefined,
    {
      skip: !accessToken,
    }
  )
  const { data: getListForCarrier } = useGetListForCarrierQuery(
    { stateRef: selectedTab ? selectedTab : 2 },
    { skip: !accessToken, refetchOnMountOrArgChange: true }
  )

  return (
    <section
      dir="rtl"
      className="w-screen min-h-screen bg-white flex flex-col items-center  "
    >
      <article className="max-w-[768px] w-full min-h-screen bg-white flex flex-col items-center py-[30px] px-[16px]">
        <NavBar getSummaryInfo={getSummaryInfo} />
        <ListTab
          getSummaryInfo={getSummaryInfo}
          heroBoxDetails={heroBoxDetails}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {!getSummaryInfo?.data && (
          <div className="text-[18px] text-blue-500 font-semibold">
            کالایی برای ارسال وجود ندارد.
          </div>
        )}
        {selectedTab == 2 && (
          <ReadyToSend getListForCarrier={getListForCarrier} />
        )}
        {selectedTab == 3 && <Sent getListForCarrier={getListForCarrier} />}
        {selectedTab == 4 && <Delivery getListForCarrier={getListForCarrier} />}
      </article>
    </section>
  )
}

export default IndexPage
