import {
  AddTaskRounded,
  CloseRounded,
  GroupRounded,
} from "@mui/icons-material";
import { CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createTeam } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { useNavigate } from "react-router-dom";

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
    padding: 22px 20px 40px 20px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 0px;
  gap: 10px;
`;

const OutlinedInput = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  outline: none;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  &:focus {
    outline: none;
  }
`;

const TextInputArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  &:focus {
    outline: none;
  }
`;

const Error = styled.p`
  font-size: 12px;
  margin: 0px 4px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.button};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  ${({ buttonDisabled }) =>
    buttonDisabled &&
    `
    background: #cccccc;
    color: #666666;
    cursor: not-allowed;
  `}
`;

const CreateTask = ({ setOpenCreateTeam, team_members, setTeamMember }) => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ apierror: "" });
  const [formData, setFormData] = React.useState({
    team_description: "",
    team_name: "",
  });

  // Functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // If there is no error message and all the fields are filled, then enable the button
    if (formData.team_description && formData.team_name) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  // Submits the form data
  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is no error message, then submit the form
    if (!buttonDisabled) {
      setLoading(true);
      setButtonDisabled(true);
      createTeam({
        team_name: formData.team_name,
        team_description: formData.team_description,
        team_members: team_members,
      })
        .then((res) => {
          if (res.status === 201) {
            dispatch(
              openSnackbar({
                message: "Team created successfully",
                severity: "success",
              })
            );
            setTeamMember([]);
            setLoading(false);
            setButtonDisabled(false);
            setErrorMessage({
              ...errorMessage,
              apierror: "",
            });
            setOpenCreateTeam(false);
            navigate("/teams");
          }
        })
        .catch((err) => {
          setButtonDisabled(false);
          if (err.response) {
            setLoading(false);
            setErrorMessage({
              ...errorMessage,
              apierror: err.response.data.message,
            });
          } else {
            setLoading(false);
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error",
              })
            );
          }
        });
    }
  };

  return (
    <Body>
      <Modal
        open
        onClose={() => {
          setOpenCreateTeam(false);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Title>Create New Team</Title>
          <CloseRounded
            style={{
              position: "absolute",
              top: "16px",
              right: "26px",
              cursor: "pointer",
              fontSize: "28px",
              color: "inherit",
            }}
            onClick={() => setOpenCreateTeam(false)}
          />
          <Form>
            <OutlinedInput>
              <GroupRounded />
              <Input
                type="text"
                placeholder="Team Name"
                name="team_name"
                value={formData.team_name}
                onChange={handleInputChange}
              />
            </OutlinedInput>
            <OutlinedInput
              style={{
                alignItems: "start",
              }}
            >
              <AddTaskRounded />
              <TextInputArea
                type="text"
                placeholder="Team Description"
                name="team_description"
                value={formData.team_description}
                onChange={handleInputChange}
                rows={3}
              />
            </OutlinedInput>
            {
              // Show error message if there is one from the server
              errorMessage?.apierror && (
                <Error style={{ color: "red" }}>{errorMessage.apierror}</Error>
              )
            }
          </Form>
          <Button
            onClick={(e) => {
              setErrorMessage({
                ...errorMessage,
                apierror: "",
              });
              handleSubmit(e);
            }}
            buttonDisabled={buttonDisabled}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>Create Team</>
            )}
          </Button>
        </Container>
      </Modal>
    </Body>
  );
};

export default CreateTask;
