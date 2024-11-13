import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const Approve = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const allraza = useSelector((state) => state.Jamaat.raza);
  let raza = allraza.find((e) => e._id === id);

  const [formData, setFormData] = useState(raza ? raza.data : []);

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
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
            <Grid container spacing={2} pb={3}>
              <Grid item md={8}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            textTransform={"capitalize"}
                          >
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {raza.user.name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            textTransform={"capitalize"}
                          >
                            Its
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {raza.user.its}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            textTransform={"capitalize"}
                          >
                            Contact
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {raza.user.phone}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            textTransform={"capitalize"}
                          >
                            E-mail
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {raza.user.email}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                md={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt={"title"}
                  height="200"
                  style={{
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                  src={
                    raza.user.image
                      ? raza.user.image
                      : "https://maroljamaat.in/wp-content/uploads/2022/03/Abbas-bhai-Aliasgar-bhai-Rajkotwala.jpeg"
                  }
                />
              </Grid>
            </Grid>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        textTransform={"capitalize"}
                      >
                        Raza Type
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {raza.type === "UMOOR_RAZA"
                          ? "UMOOR RAZA"
                          : "EVENT RAZA"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {raza.umoorName ? (
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textTransform={"capitalize"}
                        >
                          Umoor
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {raza.umoorName}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {formData.map((field, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          textTransform={"capitalize"}
                        >
                          {field.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {field.name === "date"
                            ? formatDate(field.value)
                            : field.value}
                        </Typography>
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
            <Button
              size="small"
              color="warning"
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Approve);
