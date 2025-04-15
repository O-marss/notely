import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Montserrat } from "next/font/google";
import { TanStackProvider } from "./_Components/providers/tanstack";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: montserrat.style.fontFamily, backgroundColor:'#f9f9f9' }}>
        <TanStackProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
