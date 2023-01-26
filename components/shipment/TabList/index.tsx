//libraries
import Image from 'next/image'

//types
import { TabListInterface } from './tabListType'

//functions
import { ChangeGetSummaryInfoApi } from './tabListFunction'

function TabList({
  selectedTab,
  getSummaryInfo,
  setSelectedTab,
  heroBoxDetails,
}: TabListInterface) {
  return (
    <div className="w-full flex flex-row items-center justify-around mt-[40px] overflow-hidden">
      {getSummaryInfo?.data &&
        ChangeGetSummaryInfoApi(getSummaryInfo?.data, heroBoxDetails).map(
          (item) => (
            <div
              onClick={() => {
                setSelectedTab(item.id)
              }}
              style={{ backgroundColor: `${item.color}` }}
              className={`w-[92px]  rounded-[16px] p-[8px] gap-[8px] flex flex-col items-center cursor-pointer  ${
                selectedTab != item.id && 'mix-blend-luminosity'
              }`}
            >
              <div className="w-[48px] h-[48px] relative">
                <Image
                  className="aspect-square"
                  fill
                  src={`/images/${item.image}`}
                  alt={item.image}
                />
              </div>

              <span className="text-[14px] text-[#505050]">
                {item.persianLabel}
              </span>
              <span className="text-[16px] text-[#505050]">{item.count}</span>
            </div>
          )
        )}
    </div>
  )
}

export default TabList
