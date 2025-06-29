import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robototMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trackers by @etobdc",
  description: "RPG - Gaming - etc. Generate custom trackers for whatever you want",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robototMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
