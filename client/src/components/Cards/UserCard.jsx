import { Avatar } from "@mui/material";
import styled, { useTheme } from "styled-components";
import { Checkbox } from "@mui/material";

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px 20px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  gap: 12px;
  @media (max-width: 768px) {
    padding: 10px 10px;
    gap: 8px;
  }
  &:hover {
    background: ${({ theme }) => theme.card + 90};
  }
  transition: all 0.5s ease-in-out;
`;

const AvatarImage = styled(Avatar)`
  width: 52px !important;
  height: 52px !important;

  @media (max-width: 768px) {
    width: 32px !important;
    height: 32px !important;
    font-size: 16px !important;
  }
  @media (max-width: 600px) {
    width: 28px !important;
    height: 28px !important;
    font-size: 12px !important;
  }
`;

const Name = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.9vw;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  span {
    font-size: 0.8vw;
    color: #3483eb;
  }

  @media (max-width: 1000px) {
    font-size: 1.3vw;
    span {
      font-size: 1vw;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.5vw;
    span {
      font-size: 1.2vw;
    }
  }

  @media (max-width: 600px) {
    width: 70px;
    font-size: 1.8vw;
    b {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      font-size: 1.6vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 400px) {
    width: 40px;
    font-size: 1.8vw;
    b {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      font-size: 1.6vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 0.9vw;
  white-space: nowrap;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 1000px) {
    font-size: 1.3vw;
  }
  @media (max-width: 768px) {
    font-size: 1.5vw;
  }
  @media (max-width: 600px) {
    font-size: 1.8vw;
  }
`;

const Status = styled.div`
  width: fit-content;
  font-size: 0.9vw;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.text_secondary + 10};
  padding: 4px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @media (max-width: 1000px) {
    font-size: 1.3vw;
  }

  @media (max-width: 768px) {
    font-size: 1.5vw;
  }

  @media (max-width: 600px) {
    font-size: 1.8vw;
    padding: 5px 10px;
  }
`;

const UserCard = ({ user, onSelect, selectedUsers, selected }) => {
  const theme = useTheme();

  const handleCardClick = () => {
    if (user.available) onSelect(user._id);
  };

  return (
    <Card
      onClick={handleCardClick}
      style={{ backgroundColor: selected ? theme.card + 90 : theme.card }}
    >
      {selectedUsers.length > 0 && (
        <Checkbox
          checked={selected}
          sx={{
            color: user.available
              ? theme.text_secondary
              : theme.text_secondary + 20,
          }}
        />
      )}

      <Info style={{ width: "30%" }}>
        <AvatarImage src={user?.avatar}></AvatarImage>
      </Info>
      <Name>
        {user?.first_name} {user?.last_name}
        <span>{user?.email}</span>
      </Name>
      <Info>{user?.gender}</Info>
      <Info>{user?.domain}</Info>
      <Info>
        {user?.available ? (
          <Status
            style={{
              background: `${theme.green + 10}`,
              color: `${theme.green}`,
            }}
          >
            Available
          </Status>
        ) : (
          <Status
            style={{
              background: `${theme.yellow + 10}`,
              color: `${theme.yellow}`,
            }}
          >
            Not Available
          </Status>
        )}
      </Info>
    </Card>
  );
};
export default UserCard;
