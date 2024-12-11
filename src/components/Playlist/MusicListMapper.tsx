import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Drawer,
  TextField,
  Button,
} from "@mui/material";
import MusicPlaylistCard from "../cards/MusicPlaylistCard";
import AddIcon from "@mui/icons-material/Add";
import VerticalMusicCard from "../cards/VerticalMusicCard";
import {
  useGettAllTracksQuery,
  useLazySearchTrackQuery,
} from "../../../services/redux/Api/auth.api";
import { BackHand, ChevronLeft } from "@mui/icons-material";

// PlaylistMapper Component
export const MusicPlaylistMapper = ({ setData, data }: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const musicPlaylistData = new Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    title: `Music Playlist ${index + 1}`,
    artist: `Artist ${index + 1}`,
  }));

  const [searchTrack] = useLazySearchTrackQuery();
  const handleSearch = async () => {
    const res = await searchTrack(searchQuery);
    setFilteredPlaylists(res.data.data);
  };
  const { data: musicData } = useGettAllTracksQuery(data);
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <IconButton onClick={() => setData("")} color="primary">
            <ChevronLeft />
          </IconButton>
          <Typography variant="h4">Music Playlists</Typography>
        </Box>
        <IconButton onClick={() => setIsDrawerOpen(true)} color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {musicData?.data?.data.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MusicPlaylistCard setData={setData} item={item} />
          </Grid>
        ))}
      </Grid>

      {/* Bottom Drawer */}
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            height: "90vh",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            padding: 2,
          },
        }}
      >
        <Box>
          {/* Search Bar and Button */}
          <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search Playlists"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSearch()}
            >
              Search
            </Button>
          </Box>

          {/* Filtered Playlists */}
          <Grid container spacing={3}>
            {filteredPlaylists.map((item: any) => (
              <Grid item xs={12} sm={6} md={3} xl={1.5} key={item.id}>
                <VerticalMusicCard item={item} data={data} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};
