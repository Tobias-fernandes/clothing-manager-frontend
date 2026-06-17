import { Button } from "@/components/ui/button";
import { data } from "./constants";

const Plan = () => {
  return (
    <section className="flex justify-center px-4 pb-16 lg:pb-24">
      <div className="max-w-5xl w-full flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Plano
          </span>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Simples e acessível
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Um único plano com tudo incluso. Sem surpresas na fatura.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 flex flex-col space-y-8 shadow-2xl">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent border border-primary/20 text-accent-foreground text-sm font-medium">
                {data.badge}
              </span>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-foreground tracking-tight">
                    {data.price}
                  </span>
                  <span className="text-muted-foreground text-base">
                    {data.period}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {data.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-green-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" variant={"outline"} className="w-full">
              {data.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plan;
