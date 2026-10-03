import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "G5AR Portal - 5G Gateway Manager",
  description: "Modern web admin interface for Arcadyan G5AR 5G Gateway",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved dark mode preference before first paint to avoid a light/dark flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=localStorage.getItem("dark-mode");if(d!==null)document.documentElement.classList.toggle("dark",d==="true")}catch(e){}`,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
