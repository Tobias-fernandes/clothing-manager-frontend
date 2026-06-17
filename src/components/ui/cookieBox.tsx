"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "cookie_accepted";

const CookieBox = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center gap-3 border-t border-border bg-background px-6 py-4 shadow-lg sm:flex-row sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Usamos cookies para melhorar sua experiência. Ao continuar, você
        concorda com nossa{" "}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Política de Privacidade
        </Link>{" "}
        e nossos{" "}
        <Link
          href="/terms-of-use"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Termos de Uso
        </Link>
        .
      </p>
      <Button size="sm" className="shrink-0" onClick={handleAccept}>
        Entendi
      </Button>
    </div>
  );
};

export default CookieBox;
