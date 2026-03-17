import { redirect } from "next/navigation";

export default function Home() {
  const isLogged = true;

  if (!isLogged) {
    redirect('/login')
  } else {
    redirect('/admin')
  }

  return null
}
