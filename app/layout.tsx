import type React from "react"
import "@/app/globals.css"
import "@/app/theme-transition.css"
import { Jost } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alex Kim | Distinctive Designer & Developer",
  description:
    "Portfolio of Alex Kim, a designer and developer creating distinctive digital experiences that stand out.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jost.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
