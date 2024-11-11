import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";

export const Approve = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const approver = location.state?.approver;
  const allraza = useSelector((state) => state.Jamaat.raza);
  let raza = allraza.find((e) => e._id === id);

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleApprove = async (type) => {
    await axiosInstance
      .post("raza/approveRaza", {
        razaId:id,
        approve_as: approver,
        status: type,
        comment: comment,
      })
      .then(() => {
        setTimeout(() => {
          navigate("../", { state: { approver } });
        }, 1000);
        dispatchToasterSuccess(type);
      });
  };

  const handleBack = () => {
    navigate(`../`, { state: { approver } });
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
            <FormControl component="fieldset" fullWidth>
              <Box mt={3}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  label={`Add Comment As ${approver}`}
                  value={comment}
                  onChange={handleCommentChange}
                />
              </Box>
            </FormControl>
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
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => handleApprove("APPROVED")}
            >
              Approve
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => handleApprove("REJECTED")}
            >
              Reject
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
