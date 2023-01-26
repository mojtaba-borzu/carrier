//common types
export interface StatusApi {
  readonly success: boolean
  readonly message: string
}

export interface GetSummaryInfoResponseStatus extends StatusApi {
  readonly data: {
    fullName: string
    readyToSendCount: number
    sentCount: number
    deliveredCount: number
  }
}

export interface GetListForCarrierPreloadInterface {
  readonly stateRef: number
}

export interface GetListForCarrierResponseInterface extends StatusApi {
  readonly data: {
    id: number
    customBasketNumber: string
    deliveryTimeSlot: string
    deliveryAddress: string
    deliveryAddressLatitude: string
    deliveryAddressLongitude: string
    recepientFullName: string
    recepientCellphone: string
    pickUpLocationTitle: string
    pickUpLocationAddress: string
    deliveryLocationTitle: string
    deliveryLocationAddress: string
  }[]
}

export interface putMarkAsDeliveredPreloadInterface {
  shipmentId: number
  trackingCode: string
}

export interface putMarkAsDeliveredResponseInterface extends StatusApi {}

export interface PostTrackingCodeResendPreloadInterface {
  shipmentId: number
}

export interface PostTrackingCodeResendResponseInterface extends StatusApi {}
