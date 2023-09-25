import Nav from "@/components/Nav";
import "@styles/global.css";

export const metadata = {
  title: "ChatLMNOP",
  description: "A better ChatGPT!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
