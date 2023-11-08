import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getTeams } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import Loader from "../components/Loader";
import TeamCard from "../components/Cards/TeamCard";
import TeamDetails from "../components/TeamDetails";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 0px;
  }
  background: ${({ theme }) => theme.background};
`;

const TeamListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${({ theme }) => theme.card + 90};
`;

const Error = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  padding: 4px 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px 18px;
  }
`;

const TeamList = () => {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openTeamDetails, setOpenTeamDetails] = useState({
    open: false,
    team: null,
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        await getTeams().then((res) => {
          console.log(res.data);
          setTeams(res.data);
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.response) {
          setLoading(false);
          setError(err.response.data.message);
        } else {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        }
      }
    };
    fetchTeams();
  }, []);

  return (
    <Container>
      <div>
        {loading || error ? (
          <LoaderContainer>
            {loading && <Loader />}
            {error && <Error style={{ color: "red" }}>Error: {error}</Error>}
          </LoaderContainer>
        ) : (
          <TeamListContainer>
            {teams?.team.map((team) => {
              return (
                <TeamCard
                  team={team}
                  key={team._id}
                  setOpenTeamDetails={setOpenTeamDetails}
                />
              );
            })}
          </TeamListContainer>
        )}
      </div>

      {openTeamDetails.open && (
        <TeamDetails
          open={openTeamDetails?.open}
          openTeamDetails={openTeamDetails}
          setOpenTeamDetails={setOpenTeamDetails}
        />
      )}
    </Container>
  );
};

export default TeamList;
