import { redirect } from 'next/navigation'

const useCustomBooking = process.env.NEXT_PUBLIC_BOOKING_MODE === "custom"
const BOOKING_APP_URL = process.env.NEXT_PUBLIC_BOOKING_APP_URL || "https://topmate.io/khalidirfan"

export async function GET() {
  if (useCustomBooking) {
    redirect(BOOKING_APP_URL)
  }
  redirect('https://topmate.io/khalidirfan/1622786')
}
