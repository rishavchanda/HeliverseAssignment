import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "./redux/reducers/userSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Themes";
import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import ToastMessage from "./components/ToastMessage";
import UserList from "./pages/UserList";
import TeamsList from "./pages/TeamsList";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

function App() {
  // hooks
  const { darkMode } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [menuOpen, setMenuOpen] = useState(true);
  const dispatch = useDispatch();

  // set default dark mode
  useEffect(() => {
    if (darkMode === undefined) {
      dispatch(setDarkMode(true));
    }
  });

  // set the menuOpen state to false if the screen size is less than 768px
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 1110) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
          <Wrapper>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/teams" element={<TeamsList />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
        {open && (
          <ToastMessage open={open} message={message} severity={severity} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
