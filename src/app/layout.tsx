import { ReactNode } from "react";
import { Inter } from "next/font/google";

import { StoreProvider } from "@/redux/StoreProvider";
import { Header } from "@/components/Header/Header";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className={styles.main_container}>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
