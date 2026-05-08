import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [hasBooked, setHasBooked] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  const confirmBooking = (data) => {
    setHasBooked(true)
    setBookingData(data)
  }

  return (
    <BookingContext.Provider value={{ hasBooked, bookingData, confirmBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
