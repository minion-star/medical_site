
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import HeartRateLoader from "../../components/HeartRateLoader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Password } from "@mui/icons-material";
import React, { useState } from "react";



export default function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signin", { userId, password });
      if (response.status === 200) {
        alert("Sign-in successful!");
        navigate("/dashboard"); // Redirect to dashboard or homepage
      }
    } catch (err) {
      console.log("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <HeartRateLoader message={"Get well soon!"} />
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(../../../doctor.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    //required
                    fullWidth
                    id="id"
                    label="ID"
                    //name="email"
                    //autoComplete="email"
                    //autoFocus
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    //required
                    fullWidth
                    //name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <Button onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      )
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </form>
                

                <Typography align="center" variant="subtitle2" sx={{ mt: 2 }}>
                  By continuing, you agree to{" "}
                  <span style={{ color: "green" }}>Terms of Service</span> and
                  <span style={{ color: "green" }}> Privacy Policy</span>.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
