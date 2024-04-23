import React from "react";
import Box from "@mui/material/Box";
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
import { loadAccounts } from "../../store/accounts/account.actions";
import { Container, LinearProgress, Typography } from "@mui/material";

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
  const { accounts, loading } = useSelector((state) => state.account);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 1 },
    { field: "role_id", headerName: "Role ID" },
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

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component={"h1"} fontWeight={"bold"} my={3}>
        Account Management
      </Typography>
      <DataGrid
        rows={accounts}
        columns={columns}
        slots={{ toolbar: CustomToolbar, loadingOverlay: LinearProgress }}
        autoHeight
        loading={loading}
      />
    </Container>
  );
}
