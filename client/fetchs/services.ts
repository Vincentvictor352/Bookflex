const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export async function logout() {
  const router = useRouter();
  try {
    const data = await fetch(`${backendUrl}/api/authv1/logout`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const res = await data.json();
    if (res.success) {
      toast.success(res.message);
      router.push("/login");
    } else {
      toast.error(res.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}
