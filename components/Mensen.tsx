import { useEffect, useState } from 'react'
import Link from 'next/link'

const Mensen = () => {
  const [mensen, setMensen] = useState([])
  const [location, setLocation] = useState<any>('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => console.table(e))

    if ('Geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        console.log(navigator)
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude })
      })
    }
  }, [])

  // useEffect(() => {
  //   // Fetch data from API if `location` object is set
  //   if (location) {
  //     console.log('location', location)
  //     alert(location)
  //   }
  // }, [location])

  return <>{location.latitude}</>
}

export default Mensen
