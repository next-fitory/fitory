import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header'
import Footer from './components/Footer'
import Modal from "./components/Modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FITORY - 트렌디한 패션 플랫폼",
  description: "국내 최대 패션 플랫폼 FITORY에서 트렌디한 스타일을 만나보세요",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <Modal />
      </body>
    </html>
  );
}
