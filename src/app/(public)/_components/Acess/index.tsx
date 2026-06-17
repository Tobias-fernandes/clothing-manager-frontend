import { Check, X } from "lucide-react";
import { data, features } from "./constants";

const Acess = () => {
  return (
    <section className="flex justify-center px-4 pb-16 lg:pb-24" id="access">
      <div className="max-w-5xl w-full flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Perfis de acesso
          </span>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Cada um acessa o que precisa
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Defina o que cada funcionário pode ou não fazer no sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.map((role) => (
            <div
              key={role.position}
              className="flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-border bg-muted/40">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                  {role.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  {role.position}
                </h3>
              </div>

              <ul className="flex flex-col divide-y divide-border">
                {features.map((feature, i) => {
                  const allowed = role.permissions[i];
                  return (
                    <li
                      key={feature}
                      className="flex items-center justify-between px-6 py-3.5"
                    >
                      <span className="text-sm text-foreground">{feature}</span>
                      {allowed ? (
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-destructive shrink-0" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Acess;
