import {
  AccessTimeFilled,
  Cancel,
  CheckCircle,
  Close,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { deleteRazaReq, getAllRazaReq } from "../../redux/Jamaat/JamaatAction";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const MyTableComponent = ({ item, formatDate }) => {
  const eventDate = item.data.find((i) => i.name === "date")?.value;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="caption" fontWeight={500}>
                Created At
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {formatDate(item.createdAt)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="caption" fontWeight={500}>
                ITS
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{item.user.its}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="caption" fontWeight={500}>
                Applied By
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{item.user.name}</Typography>
            </TableCell>
          </TableRow>
          {eventDate && (
            <TableRow>
              <TableCell>
                <Typography variant="caption" fontWeight={500}>
                  Event Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{formatDate(eventDate)}</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Raza = (props) => {
  const [searchText, setSearchText] = useState("");

  const location = useLocation();
  const approver = location.state?.approver;

  const raza = useSelector((state) => state.Jamaat.raza) || [];

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchText(e.target.value);
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

  const filteredData = raza.filter((item) => {
    const searchLower = searchText.toLowerCase();
    const userName = item.user.name.toLowerCase();
    const userIts = item.user.its.toString();

    return (
      item.razatype.toLowerCase().includes(searchLower) ||
      userName.includes(searchLower) ||
      userIts.includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };
  const handleRazaView = (id) => {
    navigate(`view/${id}`, { state: { approver } });
  };

  useEffect(() => {
    console.log('use effect called')
    props.getRaza(approver, () => {});
  }, []);

  const columns = [
    { name: "S.No.", cell: (row, index) => index + 1 },
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
      name: "Date",
      cell: (row) => {
        const dateField = row.data.find((item) => item.name === "date");
        const timeField = row.data.find((item) => item.name === "time");
        let field = dateField
          ? `${new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(dateField.value))}`
          : "";
        field += timeField ? timeField.value : "";
        return field;
      },
      selector: (row) => {
        const dateField = row.data.find((item) => item.name === "date");
        return dateField ? new Date(dateField.value).toLocaleDateString() : "";
      },
      sortable: true,
    },
    {
      name: "Applied By",
      cell: (row) => row.user.name,
    },
    {
      name: "ITS",
      cell: (row) => row.user.its,
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
      width: "200px",
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
              onClick={() => handleRazaView(row._id)}
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
    <Container maxWidth={"xl"}>
      <Typography
        variant="h4"
        marginTop={4}
        marginBottom={4}
        textAlign={"center"}
        sx={{ color: "#8C5F2E" }}
      >
        Raza Applications for {approver}
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
                <CardContent onClick={() => handleRazaView(item._id)}>
                  <Stack direction={"column"} gap={1} width={"100%"}>
                    <Typography variant="h6">{item.razatype}</Typography>
                    <MyTableComponent item={item} formatDate={formatDate} />
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
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={10}
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
