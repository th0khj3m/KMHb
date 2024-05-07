import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadAccounts,
  removeAccounts,
} from "../../store/accounts/account.actions";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import ModalRender from "../../components/modal-render";
import AccountModal from "../../components/modal/account-modal";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
          button: { variant: "outlined" },
        }}
      />
    </GridToolbarContainer>
  );
};

export default function Accounts() {
  const dispatch = useDispatch();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { accounts, loading } = useSelector((state) => state.account);

  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 1 },
    { field: "role_id", headerName: "Role ID", flex: 1 },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(loadAccounts());
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(removeAccounts(rowSelectionModel));
    setRowSelectionModel([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Typography variant="h4" component={"h1"} fontWeight={"bold"} my={3}>
        Account Management
      </Typography>
      {accounts && (
        <>
          <Stack direction={"row"}>
            <Box ml={"auto"} my={2}>
              <Button variant="outlined" onClick={handleOpenModal}>
                <Typography color={"primary"} fontWeight={"bold"}>
                  Add Account
                </Typography>
              </Button>

              {rowSelectionModel?.length > 0 && (
                <Button variant="outlined" sx={{ ml: 2 }}>
                  <Typography
                    color={"error"}
                    fontWeight={"bold"}
                    onClick={handleDelete}
                  >
                    Delete
                  </Typography>{" "}
                </Button>
              )}
            </Box>
          </Stack>
          <DataGrid
            rows={accounts}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            slots={{ toolbar: CustomToolbar, loadingOverlay: LinearProgress }}
            autoPageSize
            checkboxSelection
            rowCount={accounts?.length}
            paginationMode="server"
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            loading={loading}
            autoHeight
            keepNonExistentRowsSelected
          />
        </>
      )}
      <ModalRender
        isOpen={openModal}
        handleClose={handleCloseModal}
        Component={AccountModal}
        modalProps={{
          handleCloseModal,
        }}
      />
    </Container>
  );
}
