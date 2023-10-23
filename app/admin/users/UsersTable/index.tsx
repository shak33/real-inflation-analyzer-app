"use client";

import { useUsers } from "@/hooks/useUsers";

import { UsersTableUser } from "@/interfaces/UsersTableUser";

import { CustomTable } from "@/components/Table";

export const UsersTable = () => {
  const users = useUsers();

  if (users.isLoading) {
    return <div>Loading</div>
  }

  const tableHead = [
    "Username",
    "Email",
    "Email verified",
    "Role",
    "Active",
    "Created at",
    "Updated at",
  ];

  const tableBody = users?.data?.map(({id, username, email, emailVerified, role, active, createdAt, updatedAt}: UsersTableUser) => [
    username,
    email,
    emailVerified ? 'Yes' : 'No',
    role,
    active ? 'Yes' : 'No',
    createdAt,
    updatedAt,
  ]);

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
    />
  )
}