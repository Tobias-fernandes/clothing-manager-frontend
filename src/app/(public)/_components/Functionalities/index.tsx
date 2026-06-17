import { features } from "./constants";

const Functionalities = () => {
  return (
    <section
      className="flex justify-center px-4 py-16 lg:py-24"
      id="functionalities"
    >
      <div className="max-w-5xl w-full flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Funcionalidades
          </span>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Tudo que sua loja precisa
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Do cadastro de produtos ao relatório financeiro, o Clothing Manager
            cobre todas as operações do seu dia a dia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Functionalities;
