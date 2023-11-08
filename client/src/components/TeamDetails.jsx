import { CloseRounded } from "@mui/icons-material";
import { Avatar, Modal } from "@mui/material";
import React from "react";
import styled, { useTheme } from "styled-components";

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 8px;
  margin: 50px 20px;
  padding: 22px 28px 40px 28px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  outline: none;
  @media (max-width: 600px) {
    max-width: 400px;
    padding: 22px 20px 40px 20px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const TeamDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Member = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TeamDetails = ({ open, openTeamDetails, setOpenTeamDetails }) => {
  const team = openTeamDetails?.team;
  const theme = useTheme();
  return (
    <Body>
      <Modal
        open={open}
        onClose={() => setOpenTeamDetails({ open: false, team: null })}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Title>{team?.team_name}</Title>
          <TeamDescription>{team?.team_description}</TeamDescription>
          Members
          {team?.team_members?.map((member) => (
            <Member key={member._id}>
              <Avatar
                sx={{
                  width: "36px",
                  height: "36px",
                  fontSize: "16px",
                  backgroundColor: theme.text_primary,
                }}
                src={member?.avatar}
              >
                {member?.first_name?.charAt(0)}
              </Avatar>
              <div>
                {member?.first_name} {member?.last_name} ({member?.domain})
              </div>
            </Member>
          ))}
          <CloseRounded
            style={{
              position: "absolute",
              top: "16px",
              right: "26px",
              cursor: "pointer",
              fontSize: "28px",
              color: "inherit",
            }}
            onClick={() => setOpenTeamDetails({ open: false, team: null })}
          />
        </Container>
      </Modal>
    </Body>
  );
};

export default TeamDetails;
