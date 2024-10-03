import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "./ui/button";
import { apiClient } from "@/lib/api-client";
import { ADD_FRIEND_ROUTE } from "@/constants";
  
  interface User {
    _id: string;
    username: string;
    email: string;
  }

  const handleAddUser = async (friendId: string) => {
    try {
        const response = await apiClient.post(ADD_FRIEND_ROUTE, { friendId }, { withCredentials: true });
        console.log("Respuesta de la API:", response); // Log de la respuesta
        if (response.status === 200) {
          alert("Amigo agregado exitosamente");
        }
      } catch (error) {
        console.error("Error al agregar amigo:", error);
        alert("Error al agregar amigo");
      }
    };

  
  const PlayersTable = ({ users }: { users: User[] }) => {
    if (!Array.isArray(users)) {
      return <p>No se encontraron usuarios.</p>;
    }
    return (
      <Table>
        <TableHeader className="bg-gradient-to-b from-[#12003b] to-[#38006b] text-white">
          <TableRow>
            <TableHead className="px-2">User</TableHead>
            <TableHead className="px-2">ID</TableHead>
            <TableHead className="px-2">Email</TableHead>
            <TableHead className="px-2">Agregar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} className="text-white">
              <TableCell>
                <h1>{user.username}</h1>
              </TableCell>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleAddUser(user._id)}>
                  Agregar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  
  export default PlayersTable;
  