"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Tab,
  Tabs,
  Alert,
} from "@mui/material";
import {
  useUserSigninMutation,
  useUserSignupMutation,
} from "../../../services/redux/Api/auth.api";
import { Email } from "@mui/icons-material";
import { setToken } from "../../../services/redux/reducer/authReducer";
import { useDispatch } from "react-redux";

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string; // Optional for login
  name: string; // For signup only
  image?: File | null; // For image upload
};

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [addUser] = useUserSignupMutation();
  const [logUser] = useUserSigninMutation();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      image: null,
    }); // Reset form data
    setPreviewImage(null); // Reset image preview
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (tabValue === 1 && formData.password !== formData.confirmPassword) {
      setAlertMessage("Passwords do not match!");
      return;
    }

    if (tabValue === 0) {
      try {
        const res: any = await logUser({
          email: formData.email,
          password: formData.password,
        });
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          dispatch(setToken(res.data.token));
          setAlertMessage("");
        } else if (res.error) {
          setAlertMessage(res.error?.data?.message);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: NewCustomers.tsx:83 ~ handleSubmit ~ error:",
          error
        );
      }
    } else {
      try {
        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("password", formData.password);
        formData.image && form.append("file", formData.image);
        const res: any = await addUser(form);
        if (res.data) {
          setFormData({
            ...formData,
            confirmPassword: "",
            name: "",
            image: null,
          });
          setTabValue(0);
          setAlertMessage("");
        } else if (res.error) {
          setAlertMessage(res.error?.data?.message);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: NewCustomers.tsx:86 ~ handleSubmit ~ error:",
          error
        );
        // setAlertMessage()
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      {alertMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <Typography variant="h5" textAlign="center" sx={{ mb: 3 }}>
        {tabValue === 0 ? "Login" : "Sign Up"}
      </Typography>

      <form onSubmit={handleSubmit}>
        {tabValue === 1 && (
          <TextField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        {tabValue === 1 && (
          <>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {previewImage && (
              <Box
                component="img"
                src={previewImage}
                alt="Preview"
                sx={{
                  width: "100%",
                  height: "auto",
                  mb: 2,
                  borderRadius: 1,
                }}
              />
            )}
          </>
        )}

        <Button variant="contained" color="primary" type="submit" fullWidth>
          {tabValue === 0 ? "Login" : "Sign Up"}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;
