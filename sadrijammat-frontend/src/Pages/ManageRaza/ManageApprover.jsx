import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useParams, useNavigate } from "react-router-dom";
import { dispatchToasterSuccess } from "../../utils/Shared";
import axiosInstance from "../../network/apis";

const ManageApprover = () => {
  const { razaid } = useParams();
  const [razaData, setRazaData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `raza/manageRaza/getraza/${razaid}`
        );
        setRazaData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [razaid]);

  const handleRemoveApprover = (approverName) => {
    const updatedApprovers = razaData.approval_status.filter(
      (approver) => approver !== approverName
    );
    setRazaData((prev) => ({ ...prev, approval_status: updatedApprovers }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedApprovalStatus = Array.from(razaData.approval_status);
    const [movedItem] = updatedApprovalStatus.splice(result.source.index, 1);
    updatedApprovalStatus.splice(result.destination.index, 0, movedItem);

    setRazaData((prev) => ({
      ...prev,
      approval_status: updatedApprovalStatus,
    }));
  };

  const addNewApprover = () => {
    navigate(`../add-approver/${razaid}`, {
      state: { approvalStatus: razaData.approval_status },
    });
  };

  const handleUpdate = async () => {
    const updatedData = {
      id: razaid,
      data: razaData,
    };

    try {
      await axiosInstance.put("raza/manageRaza", updatedData);
      dispatchToasterSuccess("Order Updated");
      navigate(-1)
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  return (
    <Box justifyContent={"center"}>
      <Container maxWidth={"md"} sx={{ marginTop: 5 }}>
        <Card>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
                Manage Approver
              </Typography>
              <IconButton color="primary" onClick={addNewApprover}>
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box
            sx={{
              padding: 2,
            }}
          >
            {razaData &&
            razaData.approval_status &&
            razaData.approval_status.length > 0 ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="approverList">
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        padding: 2,
                      }}
                    >
                      {razaData.approval_status.map((approver, index) => (
                        <Draggable
                          key={approver}
                          draggableId={approver}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                maxWidth: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                boxShadow: snapshot.isDragging ? 10 : 1,
                              }}
                            >
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                  variant="body1"
                                  color="text.primary"
                                >
                                  {approver}
                                </Typography>
                              </CardContent>
                              <IconButton
                                onClick={() => handleRemoveApprover(approver)}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No approvers found. Click '+' to add.
              </Typography>
            )}
          <Box justifyContent={"center"} display={"flex"} width={'100%'}>
            <Button onClick={handleUpdate} variant="contained" color="success">
              Done
            </Button>
          </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ManageApprover;
