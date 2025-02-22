import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui/button";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

const NavButton: FC<Props> = ({ icon: Icon, label, href }) => (
  <Button
    variant="ghost"
    size="icon"
    aria-label={label}
    title={label}
    className="rounded-full"
    asChild
  >
    {href ? (
      <Link href={href}>
        <Icon />
      </Link>
    ) : (
      <Icon />
    )}
  </Button>
);

export { NavButton };
