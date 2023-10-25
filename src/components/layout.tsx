import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col space-y-6 bg-slate-100">
      <main className="flex w-full items-center justify-center flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};
