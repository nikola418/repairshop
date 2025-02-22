import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { File, HomeIcon, LogOut, UsersRound } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { NavButton } from "./buttons";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui";
import NavButtonMenu from "./buttons/NavButtonMenu";

const Header: FC = () => (
  <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
    <div className="flex h-8 items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <NavButton href="/tickets" icon={HomeIcon} label="home" />
        <Link
          href="/tickets"
          className="flex justify-center items-center gap-2 ml-0"
        >
          <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
            Computer Repair Shop
          </h1>
        </Link>
      </div>
      <div className="flex items-center">
        <NavButton href="/tickets" label="Tickets" icon={File} />
        <NavButtonMenu
          icon={UsersRound}
          label="Customer Menu"
          choices={[
            { title: "Search Customers", href: "/customers" },
            { title: "New Customer", href: "/customers/form" },
          ]}
        />
        <ModeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Logout"
          title="Logout"
          className="rounded-full"
          asChild
        >
          <LogoutLink>
            <LogOut />
          </LogoutLink>
        </Button>
      </div>
    </div>
  </header>
);

export { Header };
