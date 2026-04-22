import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
      {Array.from({ length: 100 }, (_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Card {i + 1}</CardTitle>
              <Badge variant="outline">Test</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              Test content for card {i + 1}. Checking layout and scroll.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboard;
