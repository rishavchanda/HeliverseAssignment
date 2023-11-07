import { Pagination, PaginationItem, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";

const PaginationContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: ${(props) => props.table_header};
  width: 100%;
  height: 70px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.sx}

  @media (max-width: 600px) {
    height: 100px;
  }
`;

const PaginationButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  font-weight: 500;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  ${({ theme, disabled }) => `
    color: ${disabled ? theme.text_secondary + 50 : "inherit"};
  `}
  &:hover {
    ${({ theme, disabled }) => `
      background: ${disabled ? "transparent" : theme.table_header};
      color: ${disabled ? theme.text_secondary + 50 : theme.primary};
    `}
  }

  @media (max-width: 600px) {
    padding: 0px 0px;
  }
`;

const PaginationText = styled.div`
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export default function PaginationBar({
  disabled,
  last_page_no,
  limit,
  page,
  handlePaginationChange,
  disableBorder,
  ...props
}) {
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(page);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handlePaginationChange(null, currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < last_page_no) {
      setCurrentPage(currentPage + 1);
      handlePaginationChange(null, currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <>
      {last_page_no > 1 && (
        <PaginationContainer disableBorder={disableBorder} sx={props.sx}>
          <PaginationButton
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            <ArrowBack />
            <PaginationText>Previous</PaginationText>
          </PaginationButton>
          <Pagination
            count={last_page_no || 0}
            disabled={disabled}
            onChange={handlePaginationChange}
            page={page}
            hidePrevButton
            hideNextButton
            size="large"
            sx={{
              color: theme.text_primary,
              "& .MuiPaginationItem-root": {
                color: theme.text_primary,
                "@media (max-width: 600px)": {
                  fontSize: "12px",
                },
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                component={IconButton}
                disabled={item.disabled}
                onClick={item.onClick}
                style={
                  item.selected
                    ? {
                        backgroundColor: theme.table_header,
                        color: theme.primary,
                      }
                    : {
                        color: theme.text_secondary,
                      }
                }
                {...item}
              />
            )}
          />
          <PaginationButton
            onClick={handleNextClick}
            disabled={currentPage === last_page_no}
          >
            <PaginationText>Next</PaginationText>
            <ArrowForward />
          </PaginationButton>
        </PaginationContainer>
      )}
    </>
  );
}
