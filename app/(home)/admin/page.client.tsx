"use client";
import { useRouter } from "next/navigation";
import { insertAppSchema } from "@/drizzle/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export function AddForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof insertAppSchema>>({
    resolver: zodResolver(insertAppSchema),
  });
  const onSubmit = async (values: z.infer<typeof insertAppSchema>) => {
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
    toast({
      title: "Success",
      description: "App added successfully",
    });
    form.reset();
    router.refresh();
  };
  const formFields = [
    {
      name: "name",
      label: "Name",
      placeholder: "app name",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "app description",
    },
    {
      name: "url",
      label: "URL",
      placeholder: "app url",
    },
    {
      name: "image",
      label: "Image",
      placeholder: "app image",
    },
  ];
  return (
    <Form {...form}>
      <form
        className="flex justify-center gap-2 items-end"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {formFields.map((formField, key) => (
          <FormField
            key={key}
            control={form.control}
            name={formField.name as keyof z.infer<typeof insertAppSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  {/* @ts-expect-error whar */}
                  <Input placeholder={formField.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
