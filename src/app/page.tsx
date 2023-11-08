import { redirect } from "next/navigation";
import { Mode } from "@/redux/types";

export default function Home() {
  redirect(`/weather?mode=${Mode.Current}`);
}
