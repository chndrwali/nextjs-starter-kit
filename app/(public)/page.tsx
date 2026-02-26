import { redirect } from "next/navigation";

export default function HomePage() {
  return redirect("/login");
  // change return redirect to return component if u need public url
}
