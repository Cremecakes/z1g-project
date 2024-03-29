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
import useSWR, { useSWRConfig } from "swr";
import { Loader2, PencilIcon } from "lucide-react";
const fetcher = (url: string) =>
  fetch(url).then((res) => res.json().then(({ data }) => data));
const deleteAppSchema = z.object({
  name: z.string(),
});
const insertAppSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  url: z.string().url(),
  image: z.string().url(),
});
export default function Page() {
  const { data: apps = [], isLoading } = useSWR<
    z.infer<typeof insertAppSchema>[]
  >("/api/apps", fetcher);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const [disabledInput, setDisabledInput] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    url: "",
    image: "",
  });
  const [buttonText, setButtonText] = useState("Save");
  const deleteForm = useForm<z.infer<typeof deleteAppSchema>>({
    resolver: zodResolver(deleteAppSchema),
  });
  const createForm = useForm<z.infer<typeof insertAppSchema>>({
    resolver: zodResolver(insertAppSchema),
    defaultValues: inputValue,
  });
  useEffect(() => {
    createForm.reset(inputValue);
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps
  const formFields: {
    name: keyof z.infer<typeof insertAppSchema>;
    placeholder: string;
  }[] = [
    {
      name: "name",
      placeholder: "app name",
    },
    {
      name: "description",
      placeholder: "app description",
    },
    {
      name: "url",
      placeholder: "app url",
    },
    {
      name: "image",
      placeholder: "app image",
    },
  ];
  return (
    <div className="justify-center flex flex-col h-full">
      {!isLoading ? (
        <div className="flex flex-row">
          <Table className="my-4 border-b">
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
                            setDisabledInput(true);
                            setButtonText("Edit");
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
        <div className="flex flex-col h-screen justify-center items-center">
          <Loader2 className="mx-auto my-4 size-24 animate-spin" />
        </div>
      )}
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
              createForm.reset(inputValue);
              mutate("/api/apps");
              toast({
                title: "Success",
                description: "App updated successfully",
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
                        className="w-72"
                        {...field}
                        {...(formField.name === "name" && {
                          disabled: disabledInput,
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
              variant="destructive"
              onClick={() => {
                createForm.reset(
                  {
                    name: "",
                    description: "",
                    url: "",
                    image: "",
                  },
                  {
                    keepValues: false,
                    keepErrors: false,
                  },
                );
                setDisabledInput(false);
                setInputValue({
                  name: "",
                  description: "",
                  url: "",
                  image: "",
                });
                setButtonText("Save");
              }}
            >
              Reset
            </Button>
            <Button type="submit" className="ml-2 self-end">
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
      <Form {...deleteForm}>
        <form
          className="flex justify-start gap-1 py-12"
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
                  <FormLabel>name</FormLabel>
                  <FormMessage />
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
                        <SelectItem key={key} value={app.name!}>
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
            <Button
              type="submit"
              className="ml-2 self-end"
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
