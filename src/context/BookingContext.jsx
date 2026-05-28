import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [hasBooked, setHasBooked] = useState(false)
  const [bookingData, setBookingData] = useState(null)
  const [surveyData, setSurveyData] = useState(null)

  const confirmBooking = (data) => {
    setBookingData(data)
  }

  const confirmPayment = () => {
    setHasBooked(true)
  }

  return (
    <BookingContext.Provider
      value={{
        hasBooked,
        bookingData,
        confirmBooking,
        confirmPayment,
        surveyData,
        setSurveyData
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
