import { Suspense } from "react";
import { CheckCircle2, Shirt } from "lucide-react";
import Link from "next/link";
import { features } from "./constants";
import SignInForm from "./form";

const SignInPage = () => {
  return (
    <div className="min-h-svh flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-primary overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="animate-float-slow absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="animate-float-slower absolute top-[55%] left-[45%] w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative flex items-center gap-2.5">
          <Shirt className="h-7 w-7 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground">
            Clothing <span className="opacity-60">Manager</span>
          </span>
        </div>

        <div className="relative flex flex-col gap-8">
          <h2 className="text-4xl font-bold leading-snug tracking-tight text-primary-foreground">
            Tudo que sua loja precisa, em um só lugar
          </h2>
          <ul className="flex flex-col gap-4">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Clothing Manager
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-24 lg:py-12 bg-background">
        <div className="w-full max-w-sm flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <div className="flex lg:hidden items-center gap-2 justify-center">
            <Shirt className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              Clothing <span className="text-primary">Manager</span>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre na sua conta para continuar
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Suspense>
              <SignInForm />
            </Suspense>

            <div className="flex justify-end">
              {/* <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Esqueceu a senha?
              </Link> */}
            </div>

            {/* <Button className="w-full gap-2 shadow-sm shadow-primary/20">
              Entrar
              <ArrowRight className="h-4 w-4" />
            </Button> */}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
