import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";

interface User {
  id: number;
  userId: string;
  password: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const handleSave = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/users/${editingId}`, { userId, password });
    } else {
      await axios.post("http://localhost:5000/users", { userId, password });
    }
    fetchUsers();
    handleClose();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  const handleOpen = (user?: User) => {
    if (user) {
      setUserId(user.userId);
      setPassword(user.password);
      setEditingId(user.id);
    } else {
      setUserId("");
      setPassword("");
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell align="center">CRUD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>
                <Button color="primary"  onClick={() => handleOpen(user)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{mt:4, justifyContent:"flex-end", mr:4}}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField label="User ID" fullWidth margin="normal" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <TextField label="Passcode" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="success" variant="contained" >
            Save
          </Button>
          <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
