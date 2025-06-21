'use client";';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal-context";
import { useRouter } from "next/navigation";
import { useTeams } from "@/api/team-api";
import { Team } from "@/types";
import { v4 as uuidv4 } from "uuid";
import NumberInput from "../number-input";

const formSchema = z.object({
  name: z.string().min(1, { message: "Team name is required" }),
  player_count: z
    .number()
    .min(1, { message: "Player count must be at least 1" }),
  region: z.string().min(1, { message: "Region is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

interface FormValues {
  name: string;
  player_count: number;
  region: string;
  country: string;
}
const TeamForm = () => {
  const { state, closeModal } = useModal();
  const teams = useTeams();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: state.data?.name || "",
      player_count: state.data?.player_count || 1,
      region: state.data?.region || "",
      country: state.data?.country || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!!state.data) {
      teams.updateTeam(state.data.id, data as Team);
    } else {
      teams.createTeam({ id: uuidv4(), ...data } as Team);
    }
    closeModal();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter team name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="player_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Count</FormLabel>
              <FormControl>
                <NumberInput
                  type="number"
                  {...field}
                  placeholder="Enter player count"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter region" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter country" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          {!!state.data ? "Update Team" : "Create Team"}
        </Button>
      </form>
    </Form>
  );
};
export default TeamForm;
