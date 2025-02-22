import { redirect } from "next/navigation";
import { FC } from "react";

const Home: FC = () => redirect("/tickets");

export default Home;
