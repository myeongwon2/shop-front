import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import NavigationBar from "./components/Navbar";
import Cart from "./page/Cart";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import Spinner from "./img/Spinner.gif";
import Footer from "./components/Footer";
import BestDetail from "./page/BestDetail";
import NewDetail from "./page/NewDetail";

function App() {
  const store = useSelector((state) => {
    return state.loading;
  });
  console.log(store);

  return (
    <div className="App">
      <Background $store={store}>
        <img src={Spinner} alt="로딩중" width="10%" />
      </Background>
      <NavigationBar />
      <Container $display={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/best/:id" element={<BestDetail />} />
          <Route path="/new/:id" element={<NewDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

const Container = styled.div`
  display: ${(props) => (props.$display ? "none" : null)};
`;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #e2e2e2;
  opacity: 0.6;
  z-index: 1000;
  display: ${(props) => (props.$store ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export default App;
