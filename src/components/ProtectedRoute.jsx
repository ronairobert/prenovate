import { Navigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

export default function ProtectedRoute({ children }) {
  const { hasBooked } = useBooking()

  if (!hasBooked) {
    return <Navigate to="/idopontfoglalas" replace />
  }

  return children
}
