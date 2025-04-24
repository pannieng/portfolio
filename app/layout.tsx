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
  title: "Pannie Ng | Software Engineer",
  description:
    "Portfolio of Pannie — a software engineer with experience in freelance projects, full-stack development, and web applications for testing instruments. Currently working in the field of industrial automation, creating innovative solutions for automated systems.",
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
