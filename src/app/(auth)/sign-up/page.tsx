import { Shirt, Sparkles } from "lucide-react";
import Link from "next/link";
import SignUpForm from "./_components/signUpForm";
import { HIGHLIGHTS } from "./constants";

const SignUpPage = () => {
  return (
    <div className="min-h-svh flex">
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-primary overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute top-[15%] left-[20%] w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="animate-float-slow absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="animate-float-slower absolute top-[50%] left-[50%] w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative flex items-center gap-2.5">
          <Shirt className="h-7 w-7 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground">
            Clothing <span className="opacity-60">Manager</span>
          </span>
        </div>

        <div className="relative flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 w-fit">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              <span className="text-xs font-medium text-primary-foreground">
                Comece agora mesmo
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-snug tracking-tight text-primary-foreground">
              Uma conta para controlar tudo na sua loja
            </h2>
            <p className="text-sm text-primary-foreground/70 max-w-xs">
              Estoque, vendas e financeiro centralizados. Sua equipe acessa com
              as permissões certas.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {HIGHLIGHTS.map(({ label, description }) => (
              <div
                key={label}
                className="flex flex-col gap-0.5 px-4 py-3 rounded-xl bg-white/10"
              >
                <span className="text-lg font-bold text-primary-foreground">
                  {label}
                </span>
                <span className="text-xs text-primary-foreground/60">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Clothing Manager
        </p>
      </div>

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
              Crie sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Comece gratuitamente. Sem cartão de crédito.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <SignUpForm />

            {/* <Button className="w-full gap-2 shadow-sm shadow-primary/20">
              Criar conta
              <ArrowRight className="h-4 w-4" />
            </Button> */}

            <p className="text-center text-xs text-muted-foreground px-2">
              Ao criar uma conta, você concorda com os{" "}
              <Link
                href="/terms-of-use"
                className="text-primary hover:underline underline-offset-4"
              >
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline underline-offset-4"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
