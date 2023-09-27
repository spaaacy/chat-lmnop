import Nav from "@/components/Nav";
import "@styles/global.css";
import Provider from "@components/Provider.js";

export const metadata = {
  title: "ChatLMNOP",
  description: "A better ChatGPT!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="min-h-screen bg-pink-gradient">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
