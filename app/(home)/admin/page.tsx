"use client";
import { useState, useEffect } from "react";
import { app as appSchema } from "@/drizzle/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR, { useSWRConfig } from "swr";
import { ListRestartIcon, PencilIcon, Save, TrashIcon } from "lucide-react";
const fetcher = (url: string) =>
  fetch(url).then((res) => res.json().then(({ data }) => data));
const deleteAppSchema = z.object({
  name: z.string(),
});
const insertAppSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  image: z.string(),
});
export default function Page() {
  const { data: apps = [], isLoading } = useSWR<
    z.infer<typeof insertAppSchema>[]
  >("/api/apps", fetcher);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    url: "",
    image: "",
  });
  const [buttonIcon, setButtonIcon] = useState(<Save />);
  const deleteForm = useForm<z.infer<typeof deleteAppSchema>>({
    resolver: zodResolver(deleteAppSchema),
  });
  const createForm = useForm<z.infer<typeof insertAppSchema>>({
    resolver: zodResolver(insertAppSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      image: "",
    },
  });
  useEffect(() => createForm.reset(inputValue), [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps
  const formFields: {
    name: keyof z.infer<typeof insertAppSchema>;
    placeholder: string;
    className: string;
    label?: string;
  }[] = [
    {
      name: "name",
      label: "name (tip: use an existing app name to edit it)",
      placeholder: "app name",
      className: "w-56",
    },
    {
      name: "description",
      placeholder: "app description",
      className: "w-64",
    },
    {
      name: "url",
      placeholder: "app url",
      className: "w-72",
    },
    {
      name: "image",
      placeholder: "app image",
      className: "w-[24rem]",
    },
  ];
  return (
    <div className="justify-center flex flex-col h-full">
      <h1 className="text-2xl font-bold text-center">Apps</h1>
      {!isLoading ? (
        <div className="flex flex-row">
          <Table className="my-4">
            <TableHeader>
              <TableRow>
                {Object.keys(appSchema).map((key) => (
                  <TableHead key={key} className="text-start w-auto">
                    {key}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((app, key) => (
                <TableRow key={key}>
                  {Object.keys(app).map((key) => (
                    <TableCell className="text-ellipsis w-1/4" key={key}>
                      {app[key as keyof typeof app]}
                      {key === "name" && (
                        <Button
                          key={key}
                          className="ml-4 text-muted-foreground"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setInputValue(app);
                            setButtonIcon(<PencilIcon />);
                          }}
                        >
                          <PencilIcon className="size-4" />
                        </Button>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center h-[80vh] items-center">
          <Skeleton className="h-[calc(100%_-_2rem)] mx-6 w-full" />
        </div>
      )}
      <h1 className="text-lg font-bold text-center -my-2">Add new</h1>
      <Form {...createForm}>
        <form
          className="flex justify-start gap-1"
          onSubmit={createForm.handleSubmit(
            async (values: z.infer<typeof insertAppSchema>) => {
              await fetch("/api/admin/apps", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => {
                if (!response.ok) {
                  toast({
                    title: "Error",
                    description: "Network response was not ok",
                    variant: "destructive",
                  });
                  throw new Error("Network response was not ok");
                }
                return response.json();
              });
              createForm.reset();
              mutate("/api/apps");
              toast({
                title: "Success",
                description: "App added successfully",
              });
            },
          )}
        >
          <section className="flex flex-row">
            {formFields.map((formField, key) => (
              <FormField
                key={key}
                control={createForm.control}
                name={formField.name as keyof z.infer<typeof insertAppSchema>}
                render={({ field }) => (
                  <FormItem className="ml-4">
                    <FormLabel>{formField.name}</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        className={formField.className}
                        {...(formField.name === "name" && {
                          disabled: !!inputValue.name,
                        })}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </section>
          <div className="flex flex-row">
            <Button
              type="reset"
              className="ml-2 self-end"
              size="icon"
              variant="destructive"
              onClick={() => {
                createForm.reset(
                  {},
                  {
                    keepValues: false,
                    keepErrors: false,
                  },
                );
                setButtonIcon(<Save />);
              }}
            >
              <span className="[&>svg]:size-5">
                <ListRestartIcon />
              </span>
            </Button>
            <Button type="submit" className="ml-2 self-end" size="icon">
              <span className="[&>svg]:size-5">{buttonIcon}</span>
            </Button>
          </div>
        </form>
      </Form>
      <h1 className="text-lg font-bold text-center my-6">Delete</h1>
      <Form {...deleteForm}>
        <form
          className="flex justify-center gap-1"
          onSubmit={deleteForm.handleSubmit(async (values) => {
            await fetch("/api/admin/apps", {
              method: "DELETE",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              if (!response.ok) {
                toast({
                  title: "Error",
                  description: "Network response was not ok",
                  variant: "destructive",
                });
                throw new Error("Network response was not ok");
              }
              return response.json();
            });
            deleteForm.reset();
            mutate("/api/apps");
            toast({
              title: "Success",
              description: "App deleted successfully",
            });
          })}
        >
          <section className="flex flex-row">
            <FormField
              control={deleteForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="ml-4">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-56">
                        <SelectValue placeholder="Select an app to delete" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {apps.map((app, key) => (
                        <SelectItem key={key} value={app.name}>
                          {app.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </section>
          <div className="flex flex-row">
            <Button type="submit" className="ml-2 self-end" size="icon">
              <span className="[&>svg]:size-5">
                <TrashIcon />
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
