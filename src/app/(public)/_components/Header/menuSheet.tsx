import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { navLinks } from "./constants";

const MenuSheet: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Menu">
          <MenuIcon className="size-5 text-secondary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <SheetClose key={link.label} asChild>
              <Link
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-11/12"
                onClick={() => alert(`Navegar para ${link.label}`)}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </div>
        <SheetFooter>
          <Button className="bg-muted" variant="ghost" asChild>
            <DarkModeToggle />
          </Button>
          <Button className="bg-muted" variant="ghost" asChild>
            <Link href="/sign-in">Entrar</Link>
          </Button>
          <Button className="bg-ring text-secondary-foreground" asChild>
            <Link href="/sign-up">Criar conta</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
