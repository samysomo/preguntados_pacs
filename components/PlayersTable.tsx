import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"
  


const PlayersTable = ({users} : any) => {
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
            {users.map((user: any) => {
                return (
                    <TableRow key={user._id} className="text-white">
                        <TableCell>
                            <div>
                                <h1>
                                    {user.username}
                                </h1>
                            </div>
                        </TableCell>
                        <TableCell>
                            {user._id}
                        </TableCell>
                        <TableCell>
                            {user.email}
                        </TableCell>
                        <TableCell>
                            <Button variant="outline">
                                Agregar
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    </Table>

  )
}

export default PlayersTable