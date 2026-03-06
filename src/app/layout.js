import "./globals.css"
import AuthProvider from "../components/AuthProvider"

export const metadata = {
 title: "FinVista Expense Tracker",
 description: "Track expenses with financial insights"
}

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>
    <AuthProvider>
     {children}
    </AuthProvider>
   </body>
  </html>
 )
}