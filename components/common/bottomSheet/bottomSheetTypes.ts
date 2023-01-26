export interface BottomSheetTypes {
  per?: boolean
  height: number
  status?: boolean
  children?: React.ReactNode
  handleClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
