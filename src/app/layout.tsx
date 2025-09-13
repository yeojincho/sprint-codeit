import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "코드잇 투두리스트",
  description: "Next.js & TypeScript 기반 할 일 관리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css" />
      </head>
      <body className="font-nanum antialiased h-screen">
        {/* ✅ 공통 Header */}
        <header className="w-full h-[60px]  bg-white border-b border-[var(--color-slate-200)]">
          <Link href="/" className="flex items-center h-full max-w-[1200px] mx-auto lg:px-6 md:px-6 p-4">
            <img src="/logos/logo-icon.png" alt="로고 아이콘" className="h-[40px] w-auto" />
            <img src="/logos/logo-text.png" alt="로고 텍스트" className="h-[40px] hidden md:block" />
          </Link>
        </header>
        {/* ✅ 개별 페이지 내용 */}
        <main className="w-full h-[calc(100%-60px)] font-sans bg-gray-100"> {children}</main>
      </body>
    </html>
  );
}
