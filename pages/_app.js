import "../styles/globals.css";
import { Layout } from "./components/layout";

export default function App({ Component, pageProps }) {
  const LayoutComponent = Component.layout || Layout;
  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
