import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const View = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const allraza = useSelector((state) => state.Mumineen.raza);
  let raza = allraza.find((e) => e._id === id);

  const [formData, setFormData] = useState(raza ? raza.data : []);
  const handleEdit = () => {
    navigate(`../edit/${id}`);
  };
  const handleBack = () => {
    navigate(`../`);
  };

  return (
    <Container maxWidth={"md"}>
      <Box marginTop={5} marginBottom={5}>
        <Card sx={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
          <CardHeader
            sx={{ bgcolor: "#eeeeee" }}
            title={`Raza For : ${raza?.razatype || ""}`}
            titleTypographyProps={{ textAlign: "center" }}
          />
          <CardContent
            sx={{
              paddingInline: { xs: 2, md: 5 },
              paddingTop: { xs: 2, md: 5 },
            }}
          >
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h6"
                        fontWeight={500}
                        textTransform={"capitalize"}
                      >
                        Raza Type
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {raza.type == "UMOOR_RAZA"
                          ? "UMOOR RAZA"
                          : "EVENT RAZA"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {raza.umoorName ? (
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="h6"
                          fontWeight={500}
                          textTransform={"capitalize"}
                        >
                          Umoor
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {raza.umoorName}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {formData.map((field, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          variant="h6"
                          fontWeight={500}
                          textTransform={"capitalize"}
                        >
                          {field.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{field.value}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardActions
            sx={{ padding: 5, display: "flex", justifyContent: "center" }}
          >
            <Button size="small" color="warning" variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button size="small" variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(View);
