import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// ------------ DO NOT DELETE THESE COMMENT , YOU WILL NEED THEM SOON ------------

// import type { ChangeEvent } from 'react'
// import { useEffect, useRef } from 'react'
// export const useForm =
//   <TContent>(defaultValues: TContent) =>
//   (handler: (content: TContent) => void) =>
//   async (event: ChangeEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     event.persist()

//     const form = event.target as HTMLFormElement
//     const elements = Array.from(form.elements) as HTMLInputElement[]
//     const data = elements
//       .filter((element) => element.hasAttribute('name'))
//       .reduce(
//         (object, element) => ({
//           ...object,
//           [`${element.getAttribute('name')}`]: element.value,
//         }),
//         defaultValues
//       )
//     await handler(data)
//     form.reset()
//   }

// // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// // eslint-disable-next-line
// export const useInterval = (callback: Function, delay: number) => {
//   // eslint-disable-next-line
//   const savedCallback = useRef<Function>()
//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])
//   useEffect(() => {
//     // eslint-disable-next-line
//     const handler = (...args: any) => savedCallback.current?.(...args)

//     if (delay !== null) {
//       const id = setInterval(handler, delay)
//       return () => clearInterval(id)
//     }
//   }, [delay])
// }
