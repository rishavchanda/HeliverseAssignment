import {
  CloseRounded,
  DarkModeRounded,
  GroupRounded,
  LightModeRounded,
  PersonRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { setDarkMode } from "../redux/reducers/userSlice";

const Container = styled.div`
  flex: 0.65;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.menubar};
  color: ${({ theme }) => theme.menu_primary_text};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 300px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;
const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Space = styled.div`
  height: 50px;
`;
const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px;
`;

const LogoText = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  background: linear-gradient(
    225deg,
    rgb(132, 0, 255) 0%,
    rgb(230, 0, 255) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  @media only screen and (max-width: 600px) {
    font-size: 22px;
  }
`;

const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const NavLinkItem = styled(NavLink)`
  display: flex;
  color: ${({ theme }) => theme.menu_secondary_text};
  align-items: center;
  gap: 16px;
  cursor: pointer;
  font-size: 18px;
  padding: 18px 22px;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  margin: 0px 10px;
  &:hover {
    background-color: ${({ theme }) => theme.menu_secondary_text + 10};
  }
  &.active {
    background-color: ${({ theme }) => theme.primary + 10};
    color: ${({ theme }) => theme.primary} !important;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    font-size: 16px;
  }
`;

const Item = styled.div`
  display: flex;
  color: ${({ theme }) => theme.menu_secondary_text};
  align-items: center;
  gap: 16px;
  cursor: pointer;
  font-size: 18px;
  padding: 20px 22px;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  margin: 0px 10px;
  &:hover {
    background-color: ${({ theme }) => theme.menu_secondary_text + 10};
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    font-size: 16px;
  }
`;

const Hr = styled.div`
  height: 1px;
  margin: 15px 0px 15px 0px;
  background: ${({ theme }) => theme.menu_secondary_text + 30};
`;

const Title = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.menu_primary_text};
  margin-bottom: 12px;
  padding: 2px 26px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Menu = ({ setMenuOpen }) => {
  // Hooks
  const { darkMode } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Container setMenuOpen={setMenuOpen}>
      <Flex>
        <LogoText to="/">Heliverse</LogoText>
        <Close>
          <CloseRounded onClick={() => setMenuOpen(false)} />
        </Close>
      </Flex>
      <ContainerWrapper>
        <NavLinkItem
          to="/"
          index
          exact
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <PersonRounded sx={{ fontSize: "26px" }} />
          Users
        </NavLinkItem>
        <NavLinkItem
          to="/teams"
          index
          exact
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <GroupRounded sx={{ fontSize: "26px" }} />
          Teams
        </NavLinkItem>
        <Hr />
        <Title>Settings</Title>
        <Item onClick={() => dispatch(setDarkMode(!darkMode))}>
          {darkMode ? (
            <LightModeRounded sx={{ fontSize: "26px" }} />
          ) : (
            <DarkModeRounded sx={{ fontSize: "26px" }} />
          )}
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Space />
      </ContainerWrapper>
    </Container>
  );
};

export default Menu;
