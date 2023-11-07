import styled from "styled-components";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media only screen and (max-width: 600px) {
    gap: 8px;
  }
`;

const MenuIcon = styled(IconButton)`
  color: ${({ theme }) => theme.text_primary} !important;
  display: none !important;
  @media (max-width: 1100px) {
    display: flex !important;
  }
`;

const LogoText = styled(Link)`
  @media (max-width: 1100px) {
    display: flex;
    font-size: 20px;
  }
  display: none;
  font-weight: bold;
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
  font-size: 24px;
`;

const Path = styled.div`
  font-size: 22px;
  font-weight: 600;
  @media (max-width: 1100px) {
    display: none;
  }
`;

const Navbar = ({ setMenuOpen, menuOpen }) => {
  // Hooks
  const location = useLocation();

  // get the main path from the location
  let path = location.pathname.split("/")[1];
  if (path === "") path = "Users";
  else if (path === "teams") path = "Teams";
  else path = "";

  return (
    <Container>
      <Flex>
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          <MenuRounded sx={{ fontSize: "30px" }} />
        </MenuIcon>
        <Path>{path}</Path>
        <LogoText to="/">Heliverse</LogoText>
      </Flex>
    </Container>
  );
};

export default Navbar;
