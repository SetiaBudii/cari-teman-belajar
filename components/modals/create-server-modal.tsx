"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PlusCircle, MinusCircle} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required."
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required."
  }),
  description: z.string().min(1, {
    message: "Server description is required."
  }),
  departement: z.string().min(1, {
    message: "Server departement is required."
  }),
  // topic1: z.string().min(1, {
  //   message: "Server topic 1 is required."
  // }),
  // topic2: z.string().min(1, {
  //   message: "Server topic 2 is required."
  // }),
  // topic3: z.string().min(1, {
  //   message: "Server topic 3 is required."
  // }),
  topic1: z.string().optional(), // Making topic1 optional
  topic2: z.string().optional(), // Making topic2 optional
  topic3: z.string().optional(), // Making topic3 optional
  location: z.string().min(1, {
    message: "Server location is required."
  })
});

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      description: "",
      departement: "",
      topic1: "",
      topic2: "",
      topic3: "",
      location: "",
    }
  });

  const [topicCount, setTopicCount] = useState(1);

  const addTopicField = () => {
    if (topicCount < 3) {
      setTopicCount(prevCount => prevCount + 1);
    }
  };

  const removeTopicField = () => {
    if (topicCount > 1) {
      setTopicCount(prevCount => prevCount - 1);
    }
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  }

  const topicFields = [];
  for (let i = 0; i < topicCount; i++) {
    const fieldName = `topic${i + 1}`;
    topicFields.push(
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Topik {i + 1}
            </FormLabel>
            <FormControl>
              <Input
                disabled={isLoading}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                placeholder={`Enter topic ${i + 1}`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-4 px-3">
          <DialogTitle className="text-2xl text-center font-bold">
            Buat Komunitas Baru
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <div className="space-y-1 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Nama Komunitas
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deskripsi */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Deskripsi
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Jurusan */}
              <FormField
                control={form.control}
                name="departement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Jurusan
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server major"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-4 items-center">
                {/* Topic 1 */}
                {/* <FormField
                  control={form.control}
                  name="topic1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      >
                        Topik 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter topic 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Topic 2 */}
                {/* <FormField
                  control={form.control}
                  name="topic2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      >
                        Topik 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter topic 2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Topic 3 */}
                {/* <FormField
                  control={form.control}
                  name="topic3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      >
                        Topik 3
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter topic 3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {topicFields}
                <div className="flex space-x-2"> {/* Reduced space between buttons */}
                  <Button onClick={addTopicField} className="rounded-full p-1 mt-5"> {/* Reduced padding */}
                    <PlusCircle className="text-white dark:text-[#313338] h-4 w-4" /> {/* Reduced icon size */}
                  </Button>
                  <Button onClick={removeTopicField} className="rounded-full p-1 mt-5"> {/* Reduced padding */}
                    <MinusCircle className="text-white dark:text-[#313338] h-4 w-4" /> {/* Reduced icon size */}
                  </Button>
                </div>
              </div>


              {/* Lokasi */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Lokasi
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}