import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ShoppingBag } from "lucide-react";
import { stats } from "./constants";

const Hero = () => {
  return (
    <section className="relative w-full min-h-svh flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="animate-float-slow absolute top-[60%] right-[8%] w-96 h-96 rounded-full bg-accent/25 blur-3xl" />
        <div className="animate-float-slower absolute bottom-[10%] left-[30%] w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center gap-6">
        <div className="animate-in fade-in zoom-in-95 duration-500 fill-mode-both inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/20 text-accent-foreground text-sm font-medium">
          <ShoppingBag className="w-3.5 h-3.5 text-primary" />
          Gestão completa para lojas de roupa
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both delay-150 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground">
          Gerencie sua loja com{" "}
          <span className="bg-linear-to-r from-primary via-ring to-primary bg-size-[200%_auto] bg-clip-text text-transparent animate-shimmer">
            clareza e controle
          </span>
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both delay-300 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Substitua cadernos e planilhas por um sistema completo de estoque,
          vendas e financeiro — tudo em um só lugar.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both delay-500 flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            Começar agora
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Play className="w-4 h-4 fill-current" />
            Ver demonstração
          </Button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both delay-700 flex gap-10 mt-4 pt-6 border-t border-border/50 w-full max-w-sm justify-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-foreground">
                {value}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
