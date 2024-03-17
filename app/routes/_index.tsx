import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormProvider } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-screen gap-2 p-4 text-center">
      <h1 className="text-2xl">Reproduction for Vaul Drawer issues on mobile</h1>
      <p>Please open this website on a mobile device with a slide out keyboard</p>
      <p>Click the button below, try typing in the message field</p>
      <EnquireForm />
    </main>
  );
}

function EnquireForm() {
  const [formOpen, setFormOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  return (
    <Drawer open={formOpen} onOpenChange={setFormOpen}>
      <DrawerTrigger asChild>
        <Button>Enquire</Button>
      </DrawerTrigger>
      <DrawerContent>
        <FormProvider {...form}>
          <form>
            <DrawerHeader className="text-left">
              <DrawerTitle>Enquire with us</DrawerTitle>
              <DrawerDescription>Fill out the form below to send us your enquiry.</DrawerDescription>
            </DrawerHeader>
            <EnquiryFormContent className="p-4" />
            <DrawerFooter>
              <Button type="submit">Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}

function EnquiryFormContent({ className }: { className?: string }) {
  const formContext = useFormContext();
  return (
    <div className={cn("grid gap-2 text-left", className)}>
      <FormField
        control={formContext.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Your Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="message"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea placeholder="Type your message here. " {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
