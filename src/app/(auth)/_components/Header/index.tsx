import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-8 right-8">
      <Button variant="outline" asChild className="h-12 w-12 rounded-full p-0">
        <Link href="/">
          <X className="h-10 w-10" />
        </Link>
      </Button>
    </header>
  );
};

export default Header;
