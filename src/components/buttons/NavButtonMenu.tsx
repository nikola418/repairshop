import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui";

type Choice = {
  title: string;
  href: string;
};

type Props = {
  icon: LucideIcon;
  label: string;
  choices: Choice[];
};

const NavButtonMenu: FC<Props> = ({ icon: Icon, choices, label }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Icon className="h-5 w-5" aria-label={label} />
        <span className="sr-only">{label}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {choices.map(({ href, title }) => (
        <DropdownMenuItem key={title} asChild>
          <Link href={href}>{title}</Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default NavButtonMenu;
