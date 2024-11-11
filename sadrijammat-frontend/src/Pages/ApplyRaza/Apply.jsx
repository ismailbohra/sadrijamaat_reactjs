import {
  Box,
  Card,
  CardContent,
  Container,
  MenuItem,
  TextField,
  CardHeader,
  Grid,
  CardActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  applyRazaReq,
  getAllRazaReq,
  getRazaTypeReq,
} from "../../redux/Mumineen/MumineenAction";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Auth from "../../utils/Auth";
import { useNavigate } from "react-router-dom";

export const Apply = (props) => {
  const [raza, setRaza] = useState({
    razafor: "",
    razaType: "",
    umoorName: "",
    razaName: "",
  });
  const [formFields, setFormFields] = useState([]);
  useEffect(() => {
    let query = "";
    if (raza.razaType) {
      query += `type=${raza.razaType}&`;
    }
    if (raza.umoorName) {
      query += `umoorName=${raza.umoorName}&`;
    }
    if (query) {
      props.getRazaType(query, successcb);
    }
  }, [raza.razaType, raza.umoorName]);

  const razaType = useSelector((state) => state.Mumineen.razaType) || [];
  useEffect(() => {
    const selectedRaza = razaType.find((e) => e._id === raza.razaName);
    setFormFields(selectedRaza ? selectedRaza.fields : []);
  }, [raza.razaName]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setRaza((prevState) => {
      // Clear dependent fields based on current selection
      if (name === "razaType") {
        return { ...prevState, [name]: value, umoorName: "", razaName: "" };
      }
      if (name === "umoorName") {
        return { ...prevState, [name]: value, razaName: "" };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleDateChange = (index, date) => {
    setFormFields((prevFields) =>
      prevFields.map((f, i) => (i === index ? { ...f, value: date } : f))
    );
  };

  const successcb = () => {
    console.log("new razatype fetched");
  };

  const umoor = [
    "Umoor FMB",
    "Umoor Deeniyah",
    "Umoor Talimiyah",
    "Umoor Marafiq Burhaniyah",
    "Umoor Maaliyah",
    "Umoor Mawarid Bashariyah",
    "Umoor Dakheliya",
    "Umoor Kharejiyah",
    "Umoor Iqtesadiyah",
    "Umoor Al-Qaza",
    "Umoor Al-Amlaak",
    "Umoor Al-Sehhat",
  ];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = formFields.map(({ _id, ...rest }) => rest);
    const formData = {
      data: temp,
      razaType: raza.razaName,
    };
    console.log(formData);
    props.applyRazaReq(formData, () => {
      props.newRaza({}, () => {});
      setTimeout(() => {
        navigate("../");
      }, 1000);
    });
  };

  return (
    <Container maxWidth="sm">
      <Box marginTop={5} marginBottom={5}>
        <Card>
          <CardHeader
            sx={{ bgcolor: "#eeeeee" }}
            title="New Raza"
            titleTypographyProps={{
              textAlign: "center",
              fontSize: { xs: 20, md: 30 },
            }}
          />
          <CardContent
            sx={{
              paddingInline: { xs: 3, md: 4 },
              paddingTop: { xs: 3, md: 4 },
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    label={"Raza Type"}
                    name="razaType"
                    value={raza.razaType}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value={"EVENT_RAZA"}>Event Raza</MenuItem>
                    <MenuItem value={"UMOOR_RAZA"}>12 Umoor Raza</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  {raza.razaType === "UMOOR_RAZA" && (
                    <TextField
                      select
                      label={"Umoor"}
                      name="umoorName"
                      value={raza.umoorName}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    >
                      {umoor.map((e, idx) => (
                        <MenuItem key={idx} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Grid>
                {raza.razaType === "EVENT_RAZA" && (
                  <Grid item xs={12}>
                    <TextField
                      select
                      label={"Raza For"}
                      name="razaName"
                      value={raza.razaName}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    >
                      {razaType.map((e, idx) => (
                        <MenuItem key={idx} value={e._id}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
                {raza.razaType === "UMOOR_RAZA" && raza.umoorName && (
                  <Grid item xs={12}>
                    <TextField
                      select
                      label={"Raza For"}
                      name="razaName"
                      value={raza.razaName}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    >
                      {razaType.map((e, idx) => (
                        <MenuItem key={idx} value={e._id}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
                {formFields.map((field, index) => (
                  <Grid item xs={12} key={index}>
                    {field.type === "select" ? (
                      <TextField
                        select
                        label={field.name}
                        value={field.value || ""}
                        onChange={(e) =>
                          setFormFields((prevFields) =>
                            prevFields.map((f, i) =>
                              i === index ? { ...f, value: e.target.value } : f
                            )
                          )
                        }
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
                            value={field.value || null}
                            onChange={(date) => handleDateChange(index, date)}
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
                        onChange={(e) =>
                          setFormFields((prevFields) =>
                            prevFields.map((f, i) =>
                              i === index ? { ...f, value: e.target.value } : f
                            )
                          )
                        }
                        fullWidth
                        size="small"
                        required={field.is_required}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                {raza.razaName && (
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                )}
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getRazaType: bindActionCreators(getRazaTypeReq, dispatch),
  applyRazaReq: bindActionCreators(applyRazaReq, dispatch),
  newRaza: bindActionCreators(getAllRazaReq, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Apply);
