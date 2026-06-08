import type { ComponentPropsWithRef } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  cn,
  Input,
  Select,
  Skeleton,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@fetch-rosetta/ui-kit";

export type ShowcaseProps = ComponentPropsWithRef<"div">;

export function Showcase({ className, ...props }: ShowcaseProps) {
  return (
    <div className={cn(className)} {...props}>
      <Tabs defaultValue="kit">
        <TabsList>
          <TabsTrigger value="kit">UI Kit</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="kit">
          <Card>
            <CardHeader>
              <CardTitle>Component showcase</CardTitle>
              <CardDescription>
                Base components from @fetch-rosetta/ui-kit, shared by every
                matrix cell.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Alert variant="info" title="Heads up">
                Every data-layer variant renders this exact UI.
              </Alert>

              <div className="flex flex-wrap items-center gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Delete</Button>
                <Button loading>Loading</Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input placeholder="Search characters…" />
                <Select
                  placeholder="Pick a status"
                  options={[
                    { value: "alive", label: "Alive" },
                    { value: "dead", label: "Dead" },
                    { value: "unknown", label: "Unknown" },
                  ]}
                />
              </div>

              <Checkbox id="remember" label="Remember my filters" />

              <div className="flex items-center gap-4">
                <Avatar name="Diego Díaz Ogni" />
                <Spinner size="sm" />
                <Skeleton className="h-4 w-40" />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-zinc-500">
                12 primitives, zero runtime dependencies.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Why a shared kit?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600">
                Keeping the UI identical across variants isolates the one
                variable that matters: the data layer. Any difference you feel
                between matrix cells is architecture, not styling.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
