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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, loadRooms } from "../store/room/room.actions";

const drawerWidth = 240;

const socketURL = "http://localhost:4000"; // WebSocket server URL

let socket;

export default function ChatRoom() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadRooms());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    //Connect to the WebSocket server
    socket = io(socketURL);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.connected);
      // Ensure you emit the 'join_room' with correct identifiers
      socket.emit("join_room", { userId: user.id, roomId: currentRoom });
    });

    socket.on("receive_message", (newMessage) => {
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    // Clean up the effect when the component unmounts
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

  const add = async () => {
    if (newRoomName) {
      await dispatch(addRoom(newRoomName));
      setNewRoomName("");
      setOpenDialog(false); // Close dialog
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
          <IconButton color="primary" onClick={() => setOpenDialog(true)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>

        <Divider />
        <List>
          {rooms.map((room, index) => (
            <ListItem key={room.id} onClick={() => joinRoom(room.id)}>
              <ListItemText primary={room.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add a New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name of the new room.</DialogContentText>
          <Input
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addRoom()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={add}>Add</Button>
        </DialogActions>
      </Dialog>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" noWrap component="div">
          {currentRoom || "Select a room"}
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${message.user}: ${message.content}`} />
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
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}