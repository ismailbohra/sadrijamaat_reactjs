import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { bindActionCreators } from "redux";
import { updateRazaReq } from "../../redux/Mumineen/MumineenAction";

export const Edit = (props) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const allraza = useSelector((state) => state.Mumineen.raza);
  let raza = allraza.find((e) => e._id === id);

  const [formData, setFormData] = useState(raza ? raza.data : []);
  const handleChange = (index, event) => {
    const newFormData = [...formData];
    newFormData[index].value = event.target.value;
    setFormData(newFormData);
  };

  const handleDateChange = (index, date) => {
    setFormData((prevFields) =>
      prevFields.map((f, i) => (i === index ? { ...f, value: date } : f))
    );
  };

  const handleUpdate = () => {
    props.updateRazaReq({ id: id, data: formData }, () => {
      navigate("../");
    });
  };
  const handleCancel = () => {
    navigate("../");
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <form>
                  <Grid container padding={1} spacing={4}>
                    {formData.map((field, index) => (
                      <Grid item xs={12} key={index}>
                        {field.type === "select" ? (
                          <TextField
                            select
                            label={field.name}
                            value={field.value || ""}
                            onChange={(e) => handleChange(index, e)}
                            fullWidth
                            size="small"
                            required={field.is_required}
                          >
                            {field.options.map((option, idx) => (
                              <MenuItem key={idx} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : field.type === "date" ? (
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                label={field.name}
                                value={field.value ? moment(field.value) : null}
                                onChange={(date) =>
                                  handleDateChange(index, date)
                                }
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    size: "small",
                                    required: field.is_required,
                                  },
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        ) : (
                          <TextField
                            label={field.name}
                            type={field.type}
                            value={field.value || ""}
                            onChange={(e) => handleChange(index, e)}
                            fullWidth
                            size="small"
                            required={field.is_required}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{ padding: 5, display: "flex", justifyContent: "center" }}
          >
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  updateRazaReq: bindActionCreators(updateRazaReq, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
