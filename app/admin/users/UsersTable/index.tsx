"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useUsers } from "@/hooks/useUsers";

import { UsersTableUser } from "@/interfaces/UsersTableUser";

export const UsersTable = () => {
  const users = useUsers();

  if (users.isLoading) {
    return <div>Loading</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Email verified</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Updated at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data.map(({id, username, email, emailVerified, role, active, createdAt, updatedAt}: UsersTableUser) => (
          <TableRow key={id}>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{emailVerified ? 'Yes' : 'No'}</TableCell>
            <TableCell>{role}</TableCell>
            <TableCell>{active ? 'Yes' : 'No'}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>{updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}