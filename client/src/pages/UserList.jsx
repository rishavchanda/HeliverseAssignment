import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getUsers } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import UserCard from "../components/Cards/UserCard";
import Loader from "../components/Loader";
import PaginationBar from "../components/PaginationBar";
import SearchBarWithFilters from "../components/SearchBarWithFilters";
import CreateNewTeam from "../components/CreateNewTeam";

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

const UserTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    border-radius: 0px;
  }
  transition: all 0.5s ease-in-out;
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: ${({ theme }) => theme.text_secondary + 20};
`;

const TableTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 22px 20px;
  background: ${({ theme }) => theme.table_header};
  color: white;
  gap: 12px;
  @media (max-width: 768px) {
    padding: 16px 10px;
    gap: 8px;
  }
  transition: all 0.5s ease-in-out;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1vw;
  font-weight: 500;

  @media (max-width: 1000px) {
    font-size: 1.4vw;
  }
  @media (max-width: 768px) {
    font-size: 1.6vw;
  }
  @media (max-width: 600px) {
    font-size: 1.8vw;
  }
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

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const TeamButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.text_secondary};
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 4px 14px;
  }
`;

const ClearButton = styled.button`
  background: ${({ theme }) => theme.text_secondary + 10};
  color: ${({ theme }) => theme.text_secondary};
  border: none;
  padding: 10px 20px;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const UserList = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    gender: "all",
    domain: "all",
    availability: "all",
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openCreateTeam, setOpenCreateTeam] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateTeam = () => {
    setOpenCreateTeam(true);
  };

  const handleClear = () => {
    setSelectedUsers([]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        await getUsers({
          page,
          limit: 20,
          search: searchQuery,
          gender: filters.gender,
          domain: filters.domain,
          availability: filters.availability,
        }).then((res) => {
          setUser(res.data);
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
    fetchUsers();
  }, [searchQuery, filters, page]);

  return (
    <Container>
      <TopBar>
        <SearchBarWithFilters
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filters}
        />

        <TeamButton
          onClick={handleCreateTeam}
          disabled={selectedUsers.length === 0}
        >
          + Create New Team
        </TeamButton>

        {selectedUsers.length > 0 && (
          <ClearButton onClick={handleClear}>Clear All</ClearButton>
        )}
      </TopBar>
      <div>
        <UserTable>
          <TableTop>
            <Heading style={{ width: "30%" }}></Heading>
            <Heading style={{ width: "80%", justifyContent: "start" }}>
              Full Name
            </Heading>
            <Heading>Gender</Heading>
            <Heading>Domain</Heading>
            <Heading>Status</Heading>
          </TableTop>

          {loading || error ? (
            <LoaderContainer>
              {loading && <Loader />}
              {error && <Error style={{ color: "red" }}>Error: {error}</Error>}
            </LoaderContainer>
          ) : (
            <UserListContainer>
              {user?.users && user?.users.length > 0 ? (
                user?.users.map((user) => {
                  return (
                    <UserCard
                      key={user._id}
                      user={user}
                      onSelect={toggleUserSelection}
                      selectedUsers={selectedUsers}
                      selected={selectedUsers.includes(user._id)}
                    />
                  );
                })
              ) : (
                <LoaderContainer>No data found</LoaderContainer>
              )}
            </UserListContainer>
          )}
          <PaginationBar
            disabled={loading}
            last_page_no={user?.totalPages}
            limit={(user?.users && user?.users.length) || 0}
            handlePaginationChange={(_, value) => setPage(value)}
            page={page}
            sx={{ pl: "0", position: "unset" }}
          />
        </UserTable>
      </div>
      {openCreateTeam && (
        <CreateNewTeam
          setOpenCreateTeam={setOpenCreateTeam}
          team_members={selectedUsers}
          setTeamMember={setSelectedUsers}
        />
      )}
    </Container>
  );
};

export default UserList;
