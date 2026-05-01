import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@devsphere/auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevSphere | 40 Apps Universe",
  description: "A unified interactive platform housing 40 fully functional web applications.",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const { children } = props;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <div className="min-h-screen bg-[#090a0f] text-white">
              {children}
            </div>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
