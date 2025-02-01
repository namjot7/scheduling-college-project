import Layout from "@/components/Layout";

export default function Home() {
  return (
    <div className="bg-n-6 h-screen w-screen flex flex-col gap-6 justify-center items-center">
      <h1 className="h1">Welcome to NCT Scheduling Hub</h1>
      <a href='/login' className="btn-primary">Login</a>
      <a href='/dashboard' className="btn-primary">Dashboard</a>
      <a href='/schedule' className="btn-primary">Schedule</a>
    </div>
  );
}
