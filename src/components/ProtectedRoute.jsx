import { Navigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

export default function ProtectedRoute({ children, requiredStep }) {
  const { surveyData, hasBooked } = useBooking()

  if (requiredStep === 'survey' && !surveyData) {
    return <Navigate to="/felmeres" replace />
  }

  if (requiredStep === 'payment' && !hasBooked) {
    return <Navigate to="/fizetes" replace />
  }

  return children
}
