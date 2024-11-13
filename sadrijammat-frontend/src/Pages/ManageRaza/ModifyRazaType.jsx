import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Paper,
  Tooltip,
  Container,
  Card,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";

const ManageRazaFields = () => {
  const { razaid } = useParams();
  const [razaData, setRazaData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `raza/manageRaza/getraza/${razaid}`
      );
      setRazaData(response.data);
    };
    fetchData();
  }, [razaid]);

  const handleUpdate = async (updatedFields) => {
    const updatedData = { id: razaData._id, data: { ...razaData, fields: updatedFields } };
    setAnchorEl(null);
    await axiosInstance.put("raza/manageRaza", updatedData);
    dispatchToasterSuccess("Order Updated");
  };

  const handleAddOption = (fieldId) => {
    navigate(`../add-option/${razaid}/${fieldId}`);
  };

  const handleRemoveField = async (fieldId) => {
    let confirm = window.confirm("Do you want to remove this field");
    if (confirm) {
      const updatedFields = razaData.fields.filter(
        (field) => field._id !== fieldId
      );
      setRazaData({ ...razaData, fields: updatedFields });
      handleUpdate(updatedFields);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(razaData.fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setRazaData((prev) => ({ ...prev, fields: items }));
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ marginTop: 5 }}>
        <Box display="flex" alignItems="center" bgcolor="#FEF7E6" px={2} py={1}>
          <Typography variant="h6" color="#AD7E05">
            {razaData?.name}
          </Typography>
          <IconButton onClick={handleMenuClick} sx={{ ml: "auto" }}>
            <MoreVertIcon color="primary" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate(`../add-field/${razaid}`)}>
              Add Fields
            </MenuItem>
            <MenuItem onClick={() => navigate(`../manage-approver/${razaid}`)}>
              Manage Approver
            </MenuItem>
            <MenuItem onClick={handleUpdate}>Update</MenuItem>
          </Menu>
        </Box>

        <Box p={3}>
          {razaData && razaData.fields && razaData.fields.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="fields">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ gap: 2 }}
                  >
                    {razaData.fields.map((field, index) => (
                      <Draggable
                        key={field._id}
                        draggableId={field._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            elevation={snapshot.isDragging ? 8 : 2}
                            sx={{
                              p: 2,
                              mb: 2,
                              backgroundColor: "#FEF7E6",
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: 2,
                            }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography variant="h6">{field.name}</Typography>
                              <Tooltip title="Drag to reorder">
                                <DragIndicatorIcon />
                              </Tooltip>
                            </Box>
                            <Typography variant="body2">
                              {field.is_required ? "Required" : "Optional"}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {field.type}
                            </Typography>

                            {field.type === "select" && (
                              <Box mt={2}>
                                {field.options?.map((option, idx) => (
                                  <Typography key={idx} sx={{ ml: 2 }}>
                                    {option.label}
                                  </Typography>
                                ))}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleAddOption(field._id)}
                                  sx={{ mt: 1 }}
                                >
                                  Add/Modify Option
                                </Button>
                              </Box>
                            )}
                            <Box display="flex" gap={2} mt={2}>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  navigate(`../edit-field/${razaid}/${field._id}`)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleRemoveField(field._id)}
                              >
                                Remove
                              </Button>
                            </Box>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Please Add Fields To Raza
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default ManageRazaFields;
