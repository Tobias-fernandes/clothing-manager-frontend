import { steps } from "./constants";

const HowItWorks = () => {
  return (
    <section className="flex justify-center px-4 pb-16 lg:pb-24">
      <div className="max-w-5xl w-full flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Como funciona
          </span>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Comece em minutos
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Sem instalação complicada, sem treinamento longo.
          </p>
        </div>

        <div className="flex flex-col">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold text-sm">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2" />
                )}
              </div>

              <div className={index < steps.length - 1 ? "pb-10" : ""}>
                <p className="font-semibold text-foreground leading-11">
                  {step.title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
