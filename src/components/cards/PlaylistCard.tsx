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
import { S3PROXY } from "../../../utils/config";
import { Delete, Edit } from "@mui/icons-material";

const PlaylistCard = ({ setData, item, onOpen, onDelete }: any) => {
  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: 3,
        borderRadius: 2,
        Width: 800,
        alignItems: "stretch",
        "@media (max-width:400px)": {
          flexDirection: "column",
        },
      }}
      onClick={() => {
        setData(item._id);
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 200,
          minHeight: 200,
          "@media (max-width:400px)": {
            width: "100%",
          },
        }}
        image={`${S3PROXY}${item.thumbnail}`}
        alt="Big Album"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(item);
            }}
          >
            <Edit />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item);
            }}
          >
            <Delete />
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default PlaylistCard;
