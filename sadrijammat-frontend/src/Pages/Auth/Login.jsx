import React from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userLoginReqITS } from "../../redux/users/UserAction";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [values, setValues] = React.useState({
    its: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    delete values["showPassword"];
    console.log(values);

    props.userLoginReqITS(values, (resp) => {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="ITS"
            type="text"
            fullWidth
            size="small"
            required
            name="its"
            value={values.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="new-password"
            label="Password"
            type={values.showPassword ? "text" : "password"}
            fullWidth
            required
            name="password"
            size="small"
            value={values.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link
            sx={{
              textAlign: "end",
              textDecoration: "none",
              display: "block",
              marginTop: 1,
              cursor: "pointer",
            }}
            onClick={() => props.toggleForm(2)}
          >
            Forgot Password
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography align="center">
            Don't Have an account
            <Link
              sx={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => props.toggleForm(1)}
            >
              Sign Up
            </Link>
          </Typography>
        </Grid> */}
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  userLoginReqITS: bindActionCreators(userLoginReqITS, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
