import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  Button,
  InputBase,
  Box,
  IconButton,
  Container,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  AccessTimeFilled,
  CheckCircle,
  Cancel,
  Close,
  RemoveRedEye,
  Edit,
} from "@mui/icons-material";
import {
  getAllRazaReq,
  deleteRazaReq,
} from "../../redux/Mumineen/MumineenAction";

export const Raza = (props) => {
  const [searchText, setSearchText] = useState("");

  const raza = useSelector((state) => state.Mumineen.raza) || [];


  useEffect(() => {
    props.getRaza()
  }, [])
  

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleCreate = () => {
    navigate(`apply`);
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      console.log("row", row._id);
      props.deleteRaza(row._id, () => {
        console.log("deleted");
      });
    }
  };

  const filteredData = raza.filter((item) =>
    item.razatype.toLowerCase().includes(searchText.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };
  const handleRazaClick = (id) => {
    navigate(`edit/${id}`);
  };
  const handleRazaView = (id) => {
    navigate(`view/${id}`);
  };

  const columns = [
    { name: "S.No.", cell: (row, index) => index + 1, width: "100px" },
    {
      name: "Created",
      cell: (row) => formatDate(row.createdAt),
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Raza",
      cell: (row) => row.razatype,
      selector: (row) => row.razatype,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <List dense={true}>
            {row.approval_status.map((e, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  {e.status == "PENDING" ? (
                    <AccessTimeFilled sx={{ color: "#FFA21D" }} />
                  ) : null}
                  {e.status == "REJECTED" ? (
                    <Cancel sx={{ color: "#ff3a6e" }} />
                  ) : null}
                  {e.status == "APPROVED" ? (
                    <CheckCircle sx={{ color: "#5EB839" }} />
                  ) : null}
                </ListItemIcon>
                <ListItemText
                  sx={{ whiteSpace: "nowrap" }}
                  primary={`${e.approver}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Box
            sx={{
              bgcolor: "#3EC9D6",
              borderRadius: "10px",
              marginInline: "5px",
            }}
          >
            <IconButton
              sx={{ margin: 0, padding: "4px" }}
              onClick={() => handleRazaClick(row._id)}
            >
              <EditIcon
                sx={{ color: "white", height: "18px", width: "18px" }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              bgcolor: "#FFA21D",
              borderRadius: "10px",
              marginInline: "5px",
            }}
          >
            <IconButton
              sx={{ margin: 0, padding: "4px" }}
              onClick={() => handleDelete(row)}
            >
              <DeleteIcon
                sx={{ color: "white", height: "18px", width: "18px" }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              bgcolor: "#3EC9D6",
              borderRadius: "10px",
              marginInline: "5px",
            }}
          >
            <IconButton
              sx={{ margin: 0, padding: "4px" }}
              onClick={() => handleRazaView(row._id)}
            >
              <RemoveRedEye
                sx={{ color: "white", height: "18px", width: "18px" }}
              />
            </IconButton>
          </Box>
        </>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f4f4f4",
        fontWeight: "bold",
        color: "#333",
        fontSize: "15px",
      },
    },
    rows: {
      style: {
        minHeight: "56px", // override the row height
        "&:not(:last-of-type)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "#e0e0e0",
        },
        fontSize: 16,
      },
    },
    pagination: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#e0e0e0",
        padding: "8px",
      },
    },
    table: {
      style: {
        border: "1px solid #e0e0e0", // outer border
      },
    },
  };

  return (
    <Container maxWidth={"lg"}>
      <Typography
        variant="h4"
        marginTop={4}
        marginBottom={4}
        textAlign={"center"}
        sx={{ color: "#8C5F2E" }}
      >
        My Raza Applications
      </Typography>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px grey solid",
              maxWidth: { sm: "200px" },
              borderRadius: 1,
              paddingInline: 1,
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
              sx={{ marginLeft: 1, flex: 1 }}
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{
              bgcolor: "#5EB839",
              "&:hover": {
                bgcolor: "#29b729",
              },
            }}
          >
            Create
          </Button>
        </Box>
        {isXs ? (
          <Box>
            {filteredData.map((item, index) => (
              <Card
                key={index}
                sx={{
                  marginBottom: 2,
                  boxShadow: "0 4px 5px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() => handleDelete(item)}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <Close sx={{ width: 18, height: 18, color: "red" }} />
                </IconButton>
                <IconButton
                  onClick={() => handleRazaClick(item._id)}
                  sx={{ position: "absolute", top: 8, right: 35 }}
                >
                  <Edit sx={{ width: 18, height: 18, color: "blue" }} />
                </IconButton>
                <CardContent onClick={() => handleRazaView(item._id)}>
                  <Typography variant="caption">
                    {formatDate(item.createdAt)}
                  </Typography>
                  <Typography variant="h6">{item.razatype}</Typography>
                  <Stack direction={"row"} gap={2}>
                    {(() => {
                      const temp = item.data.find(
                        (i) => i.name === "date"
                      )?.value;
                      return temp ? (
                        <>
                        <Typography variant="body2">Date</Typography>
                        <Typography variant="body2">
                          {formatDate(temp)}
                        </Typography>
                        </>
                      ) : (
                        ""
                      );
                    })()}
                  </Stack>
                  <List dense={true}>
                    {item.approval_status.map((e, index) => (
                      <ListItem key={index} sx={{ padding: 0 }}>
                        <ListItemIcon sx={{ minWidth: "30px" }}>
                          {e.status == "PENDING" ? (
                            <AccessTimeFilled sx={{ color: "#FFA21D" }} />
                          ) : null}
                          {e.status == "REJECTED" ? (
                            <Cancel sx={{ color: "#ff3a6e" }} />
                          ) : null}
                          {e.status == "APPROVED" ? (
                            <CheckCircle sx={{ color: "#5EB839" }} />
                          ) : null}
                        </ListItemIcon>
                        <ListItemText
                          sx={{ whiteSpace: "nowrap" }}
                          primary={`${e.approver}`}
                          secondary={`${e.comment}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            customStyles={customStyles}
          />
        )}
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getRaza: bindActionCreators(getAllRazaReq, dispatch),
  deleteRaza: bindActionCreators(deleteRazaReq, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Raza);
