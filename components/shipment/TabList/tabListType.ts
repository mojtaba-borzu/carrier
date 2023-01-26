export interface TabListInterface {
  getSummaryInfo: {
    data: {
      fullName: string
      readyToSendCount: number
      sentCount: number
      deliveredCount: number
    }
  }
  selectedTab: number
  setSelectedTab: (e: number) => void
  heroBoxDetails: {
    id: number
    label: string
    persianLabel: string
    count: number
    image: string
    color: string
  }[]
}
