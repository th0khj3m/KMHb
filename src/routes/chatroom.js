import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom,
  loadRooms,
  updateRoom,
  deleteRoom,
} from "../store/room/room.actions";

const drawerWidth = 240;
const socketURL = "http://localhost:4000";
let socket;

export default function ChatRoom() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [roomDialog, setRoomDialog] = useState({
    open: false,
    name: "",
    mode: "add",
    roomId: null,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadRooms());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    socket = io(socketURL);
    socket.on("connect", () => {
      console.log("Socket connected:", socket.connected);
      socket.emit("join_room", { userId: user.id, roomId: currentRoom });
    });
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.emit("leave_room", { userId: user.id, roomId: currentRoom });
      socket.disconnect();
    };
  }, [currentRoom, user.id]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message && currentRoom) {
      socket.emit("send_message", {
        userId: user.id,
        roomId: currentRoom,
        content: message,
      });
      setMessage("");
    }
  };

  const joinRoom = (room) => {
    if (room !== currentRoom) {
      if (currentRoom) {
        socket.emit("leave_room", { userId: user.id, roomId: currentRoom });
      }
      setCurrentRoom(room);
      socket.emit("join_room", { userId: user.id, roomId: room });
      setMessages([]);
    }
  };

  const handleRoomDialog = async () => {
    if (roomDialog.mode === "add") {
      await dispatch(addRoom(roomDialog.name));
    } else {
      await dispatch(
        updateRoom({ room_id: roomDialog.roomId, name: roomDialog.name })
      );
    }
    setRoomDialog({ ...roomDialog, open: false });
  };

  const openRoomDialog = (mode, room = {}) => {
    setRoomDialog({
      open: true,
      mode: mode,
      name: room.name || "",
      roomId: room.id || null,
    });
  };

  const handleDeleteRoom = async () => {
    if (roomToDelete) {
      await dispatch(deleteRoom(roomToDelete));
      if (currentRoom === roomToDelete) setCurrentRoom("");
      setDeleteDialogOpen(false);
      setRoomToDelete(null);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Stack direction={"row"} mt={8}>
          <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
            Chat Rooms
          </Typography>
          <IconButton color="primary" onClick={() => openRoomDialog("add")}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {rooms.map((room) => (
            <ListItem
              key={room.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={room.name}
                onClick={() => joinRoom(room.id)}
              />
              <IconButton onClick={() => openRoomDialog("edit", room)}>
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => {
                  setDeleteDialogOpen(true);
                  setRoomToDelete(room.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog
        open={roomDialog.open}
        onClose={() => setRoomDialog({ ...roomDialog, open: false })}
      >
        <DialogTitle>
          {roomDialog.mode === "add" ? "Add a New Room" : "Edit Room"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {roomDialog.mode === "add"
              ? "Enter the name of the new room."
              : "Edit the name of the room."}
          </DialogContentText>
          <Input
            autoFocus
            margin="dense"
            id="roomName"
            type="text"
            fullWidth
            value={roomDialog.name}
            onChange={(e) =>
              setRoomDialog({ ...roomDialog, name: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleRoomDialog()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoomDialog({ ...roomDialog, open: false })}>
            Cancel
          </Button>
          <Button onClick={handleRoomDialog}>
            {roomDialog.mode === "add" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Room Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this room? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteRoom} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" noWrap component="div">
          {currentRoom || "Select a room"}
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                textAlign: message.userId === user.id ? "right" : "left",
                "& .MuiListItemText-root": {
                  textAlign: "inherit",
                  "& .MuiListItemText-primary": {
                    display: "inline-block",
                    maxWidth: "70%",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor:
                      message.userId === user.id ? "#DCF8C6" : "#EDEDED",
                  },
                },
              }}
            >
              <ListItemText primary={message.content} />
            </ListItem>
          ))}
        </List>
        <Box
          component="form"
          onSubmit={sendMessage}
          sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
        >
          <TextField
            fullWidth
            label="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            variant="outlined"
            disabled={!currentRoom}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={!currentRoom}
            sx={{ p: 2 }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
