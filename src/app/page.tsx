import { NavButton } from "@/components";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto min-h-dvh">
        <section className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-lg mx-auto text-white sm:text-2xl ">
          <h1 className="text-4xl font-bold">
            Nikola&apos;s Computer
            <br />
            Repair Shop
          </h1>
          <address>Kragujevac, 34000, Serbia</address>
          <p>Open Daily: 9am to 5pm</p>
          <p>
            Phone:&nbsp;
            <Link href="tel:+381629756150" className="hover:underline">
              +381629756150
            </Link>
          </p>
          <p>
            Email:&nbsp;
            <Link
              href="mailto:nikolam998@gmail.com"
              className="hover:underline"
            >
              nikolam998@gmail.com
            </Link>
          </p>
        </section>
        <div className="fixed top-5 left-5">
          <NavButton href="/tickets" icon={HomeIcon} label="Home" />
        </div>
      </main>
    </div>
  );
}
