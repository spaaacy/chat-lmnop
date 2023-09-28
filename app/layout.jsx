import Nav from "@/components/Nav";
import "@styles/global.css";
import Provider from "@components/Provider.js";
import Footer from "@components/Footer";

export const metadata = {
  title: "ChatLMNOP",
  description: "A better ChatGPT!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-pink-gradient">
        <Provider>
          <main className="min-h-screen flex flex-col max_width">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
