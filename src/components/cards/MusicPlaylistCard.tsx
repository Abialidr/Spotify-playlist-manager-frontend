"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  CardActions,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Delete } from "@mui/icons-material";
import { useDeleteTrackMutation } from "../../../services/redux/Api/auth.api";
import Link from "next/link";

const MusicPlaylistCard = ({ setData, item }: any) => {
  const [deletetrack] = useDeleteTrackMutation();
  return (
    <Link
      href={item.link}
      target="_blank"
      style={{
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          display: "flex",
          backgroundColor: "background.paper",
          height: "100%",
          boxShadow: 2,
          borderRadius: 2,
          "@media (max-width:400px)": {
            flexDirection: "column",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 120,
            minHeight: 120,
            "@media (max-width:400px)": {
              width: "100%",
            },
          }}
          image={item.thumbnail[0].url}
          alt="Album Cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", p: 1 }}>
            <Typography component="div" variant="h6" fontWeight="bold">
              {item.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{ mb: 1 }}
            >
              {item.artist_name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.duration}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Button
            onClick={async (e) => {
              e.stopPropagation();
              try {
                const res = await deletetrack(item._id);
              } catch (error) {}
            }}
          >
            <Delete />
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default MusicPlaylistCard;
