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

function CustomToolbar() {
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
}

export default function Accounts() {
  const dispatch = useDispatch();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { accounts, loading } = useSelector((state) => state.account);

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
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component={"h1"} fontWeight={"bold"} my={3}>
        Account Management
      </Typography>
      <Stack direction={"row"}>
        <Box ml={"auto"} mb={2}>
          <Button variant="outlined">
            <Typography color={"primary"}>Add Account</Typography>
          </Button>

          {rowSelectionModel.length > 0 && (
            <Button variant="outlined" sx={{ ml: 2 }}>
              <Typography
                color={"error"}
                fontWeight={""}
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
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: CustomToolbar, loadingOverlay: LinearProgress }}
        autoHeight
        checkboxSelection
        rowCount={accounts.length}
        paginationMode="server"
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        loading={loading}
        keepNonExistentRowsSelected
      />
    </Container>
  );
}
