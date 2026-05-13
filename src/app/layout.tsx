import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/shared/lib/auth-context";
import "@/shared/styles/globals.css";
import type { Metadata } from "next";
import { Noto_Serif_JP, Plus_Jakarta_Sans } from "next/font/google";

// Plus Jakarta Sans cho các phần giao diện cần sự hiện đại, dễ đọc (UI, Tech Stack)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

// Noto Serif JP cho tiêu đề và các phần nhấn mạnh nghệ thuật (Branding, Titles)
const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Hong Anh | Portfolio",
  description:
    "UI/UX Designer & Graphic Artist specializing in Japanese Minimalist Design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${notoSerif.variable} scroll-smooth`}
    >
      <body className="bg-[#F8F7F3] text-[#1a1a1a] font-sans antialiased selection:bg-[#BC002D] selection:text-white">
        <AuthProvider>
          {/* Lớp phủ Grain tạo Texture như giấy thủ công Nhật Bản */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.4] z-[9999] mix-blend-multiply"
            style={{
              backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
            }}
          ></div>

          {/* Container chính với độ rộng giới hạn để tạo cảm giác tập trung (Zen) */}
          <div className="relative min-h-screen flex flex-col max-w-[1440px] mx-auto overflow-x-hidden">
            <Header />

            {/* Main Content với padding-top lớn để không bị Header đè lên */}
            <main className="flex-1 w-full px-4 sm:px-8 md:px-12 pt-32 pb-16">
              {children}
            </main>

            <Footer />
          </div>

          {/* Điểm nhấn trang trí: Đường line mảnh chạy dọc bên trái/phải theo phong cách editorial */}
          <div className="fixed left-4 top-0 bottom-0 w-[1px] bg-neutral-200/50 hidden xl:block" />
          <div className="fixed right-4 top-0 bottom-0 w-[1px] bg-neutral-200/50 hidden xl:block" />
        </AuthProvider>
      </body>
    </html>
  );
}
