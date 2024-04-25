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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, loadRooms } from "../store/room/room.actions";

const drawerWidth = 240;

let socket;

export default function ChatRoom() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);

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

//   useEffect(() => {
//     //Connect to the WebSocket server
//     socket = io("http://localhost:4000");
//     socket.emit("join_room", { user: "Username", room: "RoomID" });
//     socket.on("receive_message", (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });
//     // Clean up the effect when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("send_message", {
        user: "Username",
        room: "RoomID",
        content: message,
      });
      setMessage("");
    }
  };


  const joinRoom = (room) => {
    setCurrentRoom(room);
    socket.emit("join_room", { user: "Username", room });
    // Reset messages when joining new room
    setMessages([]);
  };

  const add = async () => {
    if (newRoomName) {
      await dispatch(addRoom(newRoomName));
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

        <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
          Chat Rooms
        </Typography>
        <IconButton color="primary" onClick={() => setOpenDialog(true)}>
          <AddCircleOutlineIcon />
        </IconButton>
        <Divider />
        <List>
          {rooms.map((room, index) => (
            <ListItem key={room.id} onClick={() => joinRoom(room.name)}>
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
