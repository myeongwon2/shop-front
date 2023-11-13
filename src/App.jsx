import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Cart from "./page/Cart";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import Spinner from "./img/Spinner.gif";
import Footer from "./components/Footer";
import DetailPage from "./page/DetailPage";
import PayMentPage from "./page/PayPage";
import Favorite from "./page/Favorite";
import BestPage from "./page/BestPage";
import NewPage from "./page/NewPage";
import SearchPage from "./page/Searchpage";
import MyPage from "./page/MyPage";

function App() {
  const loading = useSelector((state) => {
    return state.loading;
  });

  return (
    <div className="App">
      <Background $loading={loading}>
        <img src={Spinner} alt="로딩중" width="10%" />
      </Background>
      <Navbar />
      <Container $loading={loading}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bestpage" element={<BestPage />} />
          <Route path="/best/:id" element={<DetailPage />} />
          <Route path="/newpage" element={<NewPage />} />
          <Route path="/new/:id" element={<DetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/payment" element={<PayMentPage />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

const Container = styled.div`
  display: ${(props) => (props.$loading ? "none" : null)};
`;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #e2e2e2;
  opacity: 0.6;
  z-index: 1000;
  display: ${(props) => (props.$loading ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export default App;
