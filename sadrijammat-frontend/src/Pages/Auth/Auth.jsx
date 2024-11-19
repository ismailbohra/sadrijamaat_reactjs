import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import ForgotPasswordForm from "./ForgotPassword";
import { styled } from "@mui/system";
import { Image } from "react-bootstrap";
import logo from "../../assets/logo/main_logo.png";
import bg from "../../assets/images/bg_Login_Jamea.jpg";

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: 10,
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
  height: "auto",
}));

const UserLogin = (props) => {
  const [formIndex, setFormIndex] = useState(0);

  return (
    <Box sx={{ background: `url(${bg})`, backgroundPosition: "center" }}>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <FormContainer
            sx={{ boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.2)", height: "auto" }}
          >
            <Image
              src={logo}
              style={{
                marginBottom: 3,
                height: "50px",
                width: "100%",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{ color: "#8C5F2E" }}
              marginTop={2}
              marginBottom={2}
              textAlign="center"
              fontWeight={700}
            >
              SADRI SAGHEER
            </Typography>
            <SwipeableViews
              index={formIndex}
              onChangeIndex={setFormIndex}
              animateHeight
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop={1}
              >
                <LoginForm toggleForm={setFormIndex} />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="auto"
                paddingTop={1}
              >
                <SignupForm toggleForm={setFormIndex} />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="auto"
                paddingTop={1}
              >
                <ForgotPasswordForm toggleForm={setFormIndex} />
              </Box>
            </SwipeableViews>
          </FormContainer>
        </Box>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  // map necessary state
});

const mapDispatchToProps = (dispatch) => ({
  // map necessary dispatch actions
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
