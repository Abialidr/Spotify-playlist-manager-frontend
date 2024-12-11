import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlaylistCard from "../cards/PlaylistCard";
import {
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useGetAllPlaylistQuery,
  useUpdatePlaylistMutation,
} from "../../../services/redux/Api/auth.api";
import { Description } from "@mui/icons-material";
import { S3PROXY } from "../../../utils/config";

const PlaylistMapperWithModal = ({ setData }: any) => {
  const [addPlaylist] = useCreatePlaylistMutation();
  const [updatePlaylist] = useUpdatePlaylistMutation();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [open, setOpen] = useState<any>();
  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    image: null,
    previewImage: null,
  });

  const handleOpen = () => setOpen("Add");
  const handleClose = () => {
    setOpen("");
    setForm({ name: "", description: "", image: null });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({
        ...form,
        image: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const { data: userData } = useGetAllPlaylistQuery({});
  const handleSubmit = async () => {
    if (open === "Add") {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      form.image && formData.append("thumbnail", form.image);

      const res: any = await addPlaylist(formData);
      if (res.data) {
        setForm({
          description: "",
          name: "",
          image: null,
          previewImage: null,
        });
        setOpen("");
      }
      // setPlaylistData([
      //   ...playlistData,
      //   {
      //     id: playlistData.length + 1,
      //     title: form.name,
      //     description: form.description,
      //   },
      // ]);
      // handleClose();
    } else {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      form.image && formData.append("thumbnail", form.image);
      form.id && formData.append("_id", form.id);

      const res: any = await updatePlaylist(formData);
      if (res.data) {
        setForm({
          description: "",
          name: "",
          image: null,
          previewImage: null,
        });
        setOpen("");
      }
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Playlists</Typography>
        <IconButton onClick={handleOpen} color="primary">
          <AddIcon />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {userData?.data?.data?.map((item: any) => (
          <Grid item xs={12} key={item.id}>
            <PlaylistCard
              item={item}
              setData={setData}
              onOpen={(item: any) => {
                setOpen("Edit");
                setForm({
                  name: item.name,
                  description: item.description,
                  previewImage: `${S3PROXY}${item.thumbnail}`,
                  id: item._id,
                });
              }}
              onDelete={async (item: any) => {
                deletePlaylist(item._id);
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Modal for Adding Playlist */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Playlist
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            multiline
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            centerRipple
            component="label"
            sx={{ mb: 2 }}
          >
            Upload Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {form.previewImage && (
            <Box
              component="img"
              src={form.previewImage}
              alt="Preview"
              sx={{ width: "100%", mb: 2 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            {open == "Add" ? "Add" : "Edit"} Playlist
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PlaylistMapperWithModal;
