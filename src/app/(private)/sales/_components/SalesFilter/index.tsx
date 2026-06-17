import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ISalesFilter } from "./types";

const SalesFilter: React.FC<ISalesFilter> = ({
  startDate,
  endDate,
  activeFilter,
  onStartDateChange,
  onEndDateChange,
  onApply,
  onClear,
}) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="start-date">Data inicial</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="end-date">Data final</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-40"
            />
          </div>
          <Button
            variant="outline"
            onClick={onApply}
            disabled={!startDate && !endDate}
          >
            Filtrar
          </Button>
          {activeFilter && (
            <Button variant="ghost" onClick={onClear}>
              Limpar filtro
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { SalesFilter };
