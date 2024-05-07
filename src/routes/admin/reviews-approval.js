import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
  Stack,
} from "@mui/material";
import {
  loadPendingReviews,
  rejectReviews,
  updateReviewsStatus,
} from "../../store/review/review.actions";

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

export default function ReviewsApproval() {
  const dispatch = useDispatch();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { pendingReviews, loading } = useSelector((state) => state.review);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "content", headerName: "Content", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 1 },
    { field: "movie_id", headerName: "Movie Id", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(loadPendingReviews());
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [dispatch]);

  const handleApprove = async () => {
    await dispatch(updateReviewsStatus(rowSelectionModel));
    setRowSelectionModel([]);
  };

  const handleReject = async () => {
    await dispatch(rejectReviews(rowSelectionModel));
    setRowSelectionModel([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Typography variant="h4" component={"h1"} fontWeight={"bold"} my={3}>
        Reviews Approval Management
      </Typography>
      {pendingReviews && (
        <>
          <Stack direction={"row"}>
            <Box ml={"auto"} my={2}>
              {rowSelectionModel?.length > 0 && (
                <>
                  <Button variant="outlined" sx={{ ml: 2 }}>
                    <Typography
                      color={"success"} // Change color to represent approved action
                      fontWeight={"bold"}
                      onClick={handleApprove} // Add onClick handler for approval action
                    >
                      Approved
                    </Typography>
                  </Button>
                  <Button variant="outlined" sx={{ ml: 2 }}>
                    <Typography
                      color={"error"}
                      fontWeight={"bold"}
                      onClick={handleReject}
                    >
                      Rejected
                    </Typography>{" "}
                  </Button>
                </>
              )}
            </Box>
          </Stack>
          <DataGrid
            rows={pendingReviews}
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
            rowCount={pendingReviews?.length}
            paginationMode="server"
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            loading={loading}
            keepNonExistentRowsSelected
            autoHeight
          />
        </>
      )}
    </Container>
  );
}
