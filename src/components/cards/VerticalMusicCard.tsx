"use client";
import React, { useActionState, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAddTrackMutation } from "../../../services/redux/Api/auth.api";
import { useSelector } from "react-redux";
import { getUser } from "../../../services/redux/reducer/authReducer";

const VerticalMusicCard = ({ item, data }: any) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "success",
  });
  const handleClick = (message: string, type: string) => {
    setMessage({ text: message, type });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const user = useSelector(getUser);
  const [addTrack] = useAddTrackMutation();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Card
        sx={{
          width: 200, // Fixed width
          height: 300, // Fixed height for uniformity
          boxShadow: 2,
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          "&:hover .hover-overlay": {
            opacity: 1,
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 140 }} // Consistent media height
          image={item.thumbnail[1]?.url}
          alt={item.name}
        />
        <CardContent
          sx={{
            height: "calc(100% - 140px)", // Ensures content fits within card
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {item.duration} • {item.artist_name}
          </Typography>
        </CardContent>

        {/* Hover Overlay */}
        <Box
          className="hover-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
          }}
          onClick={async () => {
            const dataa = {
              name: item.name,
              link: item.link,
              duration: item.duration,
              artist_name: item.artist_name,
              thumbnail: item.thumbnail,
              userId: user._id,
              playlistId: data,
              trackId: item.trackId,
            };
            try {
              const res = await addTrack(dataa);
              if (res.data) {
                handleClick("Music added successfully", "success");
              } else {
                handleClick("Something went wrong", "error");
              }
            } catch (error) {
              handleClick("Something went wrong", "error");
            }
            console.log("data", dataa);
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
          >
            <AddIcon color="primary" />
          </IconButton>
        </Box>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={3000} // Snackbar will hide after 3 seconds
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          //@ts-ignore
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VerticalMusicCard;
