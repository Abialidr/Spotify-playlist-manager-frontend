import React, { FormEvent, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setToken } from "../../../services/redux/reducer/authReducer";
import { S3PROXY } from "../../../utils/config";
import { useUserUpdateMutation } from "../../../services/redux/Api/auth.api";
import { logout } from "../../../utils/helper";

const UserPage: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [updateUser] = useUserUpdateMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: user.name,
    image: null,
  });
  console.log("🚀 ~ file: Header.tsx:30 ~ formData:", formData);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    `${S3PROXY}${user.pic}`
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    logout(dispatch);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormData({
      ...formData,
      image: file,
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      formData.image && form.append("file", formData.image);
      const res: any = await updateUser(form);
      if (res.data) {
        dispatch(setToken(res.data.token));
        setIsModalOpen(false);
      } else if (res.error) {
        // setAlertMessage(res.error?.data?.message);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: NewCustomers.tsx:86 ~ handleSubmit ~ error:",
        error
      );
      // setAlertMessage()
    }
  };

  return (
    <>
      {/* Header Bar */}
      <AppBar position="static" color="primary">
        <Toolbar
          sx={{
            justifyContent: "end",
          }}
        >
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Hello, {user.name}
          </Typography>
          {/*@ts-ignore*/}
          <Avatar
            src={`${S3PROXY}${user.pic}`}
            alt="User"
            sx={{ cursor: "pointer" }}
            onClick={handleMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                transform: "translateY(10px)",
              },
            }}
          >
            <MenuItem onClick={handleSettingsClick}>
              <SettingsIcon sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Settings Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
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
            {selectedImage && (
              <Box
                component="img"
                src={selectedImage}
                alt="Preview"
                sx={{ width: "100%", height: "auto", borderRadius: 2, mb: 2 }}
              />
            )}
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UserPage;
