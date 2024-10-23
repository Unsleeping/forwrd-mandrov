import * as React from "react";
import UserList from "./users-list";

type UsersPageProps = unknown;

const UsersPage: React.FC<UsersPageProps> = () => {
  return (
    <section className="max-w-7xl mx-auto w-full h-full">
      <UserList />
    </section>
  );
};

export default UsersPage;
