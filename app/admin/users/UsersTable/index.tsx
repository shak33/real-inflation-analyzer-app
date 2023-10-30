"use client";

import { useMemo } from "react";

import { useGetUsers } from "@/hooks/users/useGetUsers";

import { UsersTableUser } from "@/interfaces/UsersTableUser";

import { CustomTable } from "@/components/Table";

export const UsersTable = () => {
  const users = useGetUsers();

  const tableHead = [
    "Username",
    "Email",
    "Email verified",
    "Role",
    "Active",
    "Created at",
    "Updated at",
  ];

  const tableBody = useMemo(() => {
    return users?.data?.map(({id, username, email, emailVerified, role, active, createdAt, updatedAt}: UsersTableUser) => [
      username,
      email,
      emailVerified ? 'Yes' : 'No',
      role,
      active ? 'Yes' : 'No',
      createdAt,
      updatedAt,
    ]);
  }, [users]);

  if (users.isLoading) {
    return <div>Loading users, please wait...</div>
  }

  return (
    <CustomTable
      tableHead={tableHead}
      tableBody={tableBody}
    />
  )
}