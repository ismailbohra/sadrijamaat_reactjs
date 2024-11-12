import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import axiosInstance from "../../network/apis";
import { dispatchToasterSuccess } from "../../utils/Shared";

const AnnouncementScreen = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendTo, setSendTo] = useState("topic"); // "topic" or "fcm"
  const [roles, setRoles] = useState([]); // Roles for topic-based notifications
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]); // Users from search
  const [selectedUsers, setSelectedUsers] = useState([]); // Store user objects

  // Fetch roles (topics) from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (sendTo === "topic") {
      fetchRoles();
    }
  }, [sendTo]);

  // Search users by name/ITS
  const searchUsers = async () => {
    try {
      const query = isNaN(searchTerm)
        ? `?name=${searchTerm}`
        : `?its=${searchTerm}`;
      const response = await axiosInstance.get(`/user/search${query}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle submission of the notification
  const handleSubmit = async () => {
    const payload =
      sendTo === "topic"
        ? { title, body: message, topics: selectedRoles }
        : {
            title,
            body: message,
            user_ids: selectedUsers.map((user) => user.id),
          };

    const apiUrl =
      sendTo === "topic" ? "/notifications/topic" : "/notifications/device";

    try {
      await axiosInstance.post(apiUrl, payload);
      dispatchToasterSuccess("Notification sent successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setSelectedRoles([]);
    setSelectedUsers([]);
    setStep(1);
  };

  // Navigation between steps
  const handleNextStep = () => {
    if (step === 1 && (!title || !message)) {
      alert("Please enter title and message.");
    } else {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "md", margin: "auto" }}>
      <Card sx={{ padding: 3, mb: 2 }}>
        {step === 1 && (
          <Box>
            <Typography variant="h6">Message Details</Typography>
            <TextField
              fullWidth
              label="Message Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ my: 2 }}
            />
            <TextField
              fullWidth
              label="Message Body"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
              sx={{ my: 2 }}
            />
            <Button variant="contained" onClick={handleNextStep}>
              Next
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="h6">Select Recipients</Typography>
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Checkbox
                checked={sendTo === "topic"}
                onChange={() => setSendTo("topic")}
              />
              <Typography>Send to Groups</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Checkbox
                checked={sendTo === "fcm"}
                onChange={() => setSendTo("fcm")}
              />
              <Typography>Send to Individual Users</Typography>
            </Box>
            <Button onClick={handlePreviousStep}>Prev</Button>
            <Button onClick={handleNextStep} sx={{ ml: 2 }}>
              Next
            </Button>
          </Box>
        )}

        {step === 3 && sendTo === "topic" && (
          <Box>
            <Typography variant="h6">Select Roles</Typography>
            <List>
              {roles.map((role) => (
                <ListItem
                  key={role._id}
                  button
                  onClick={() => {
                    setSelectedRoles((prev) =>
                      prev.includes(role.name)
                        ? prev.filter((r) => r !== role.name)
                        : [...prev, role.name]
                    );
                  }}
                >
                  <Checkbox checked={selectedRoles.includes(role.name)} />
                  <ListItemText primary={role.name} />
                </ListItem>
              ))}
            </List>
            <Button onClick={handlePreviousStep}>Prev</Button>
            <Button onClick={handleNextStep} sx={{ ml: 2 }}>
              Next
            </Button>
          </Box>
        )}

        {step === 3 && sendTo === "fcm" && (
          <Box>
            <Typography variant="h6">Search Users</Typography>
            <TextField
              fullWidth
              placeholder="Enter user name or ITS"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchUsers()}
              sx={{ my: 2 }}
            />
            <Button variant="contained" onClick={searchUsers}>
              Search
            </Button>
            <List>
              {users.map((user) => (
                <ListItem
                  key={user._id}
                  button
                  onClick={() => {
                    setSelectedUsers((prev) =>
                      prev.some((u) => u.id === user._id)
                        ? prev.filter((u) => u.id !== user._id)
                        : [...prev, { id: user._id, name: user.name }]
                    );
                  }}
                >
                  <Checkbox
                    checked={selectedUsers.some((u) => u.id === user._id)}
                  />
                  <ListItemText primary={`${user.name} (${user.its})`} />
                </ListItem>
              ))}
            </List>
            <Button onClick={handlePreviousStep}>Prev</Button>
            <Button onClick={handleNextStep} sx={{ ml: 2 }}>
              Next
            </Button>
          </Box>
        )}

        {step === 4 && (
          <Stack gap={2}>
            <Typography variant="h6">Confirm Notification</Typography>
            <Typography>Title: {title}</Typography>
            <Typography>Message: {message}</Typography>
            <Typography>
              Recipients:{" "}
              {sendTo === "topic"
                ? selectedRoles.join(", ")
                : selectedUsers.map((u) => u.name).join(", ")}
            </Typography>
            <Box flexDirection={'row'} justifyContent={'center'}>
              <Button onClick={handlePreviousStep}>Prev</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ ml: 2 }}
              >
                Send Notification
              </Button>
            </Box>
          </Stack>
        )}
      </Card>
    </Box>
  );
};

export default AnnouncementScreen;
