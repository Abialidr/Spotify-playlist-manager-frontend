import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { MusicPlaylistMapper } from "./MusicListMapper";
import PlaylistMapperWithModal from "./PlaylistMapper";

const PlaylistContainer = () => {
  const [data, setData] = useState(""); // Empty array means no data, simulate by adding items to test
  console.log(
    "🚀 ~ file: PlaylistContainer.tsx:8 ~ PlaylistContainer ~ data:",
    data
  );

  return (
    <Box sx={{ padding: 4 }}>
      {data ? (
        <MusicPlaylistMapper setData={setData} data={data} />
      ) : (
        <PlaylistMapperWithModal setData={setData} />
      )}
    </Box>
  );
};

export default PlaylistContainer;
