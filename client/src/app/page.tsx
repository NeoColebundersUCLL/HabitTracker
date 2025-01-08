"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import UpdateTimer from "@/components/UpdateTimer";
import { trpc } from "@/lib/trcp"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function Habits() {

    const [title, setTitle] = useState("");
    const [frequenty, setFrequenty] = useState("");

    const { data, refetch } = trpc.habit.getHabits.useQuery()

    const deleteHabit = trpc.habit.deleteHabit.useMutation({
        onSuccess: () => { refetch() }
    })

    const updateHabit = trpc.habit.updateHabit.useMutation({
        onSuccess: () => { refetch() }
    })

    const addHabit = trpc.habit.createHabit.useMutation({
        onSuccess: () => {
            refetch()
            setTitle("")
            setFrequenty("")
        }
    })

    // if (isLoading) return <div>loading..</div>

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-20">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">📈 Habit Tracker</h1>

            <p className="text-center text-gray-500 mb-4">Manage and track your habits effortlessly!</p>

            <UpdateTimer />

            <div className="flex justify-center mb-8">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600">
                            + Add New Habit
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="p-6">
                        <AlertDialogTitle className="text-xl font-semibold">Add a New Habit</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 mb-4">
                            Enter the details for your new habit below.
                        </AlertDialogDescription>
                        <input
                            type="text"
                            placeholder="Habit Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                        />
                        <input
                            type="text"
                            placeholder="Frequency (e.g., daily, weekly)"
                            value={frequenty}
                            onChange={(e) => setFrequenty(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                        />
                        <div className="flex justify-end mt-4 space-x-2">
                            <AlertDialogCancel asChild>
                                <Button className="text-gray-600">Cancel</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button onClick={() => addHabit.mutate({ title, frequenty })} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                                    Add Habit
                                </Button>
                            </AlertDialogAction>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {data?.length ? (
                <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-indigo-700">Habit</th>
                            <th className="py-3 px-4 text-center font-semibold text-indigo-700">Frequency</th>
                            <th className="py-3 px-4 text-center font-semibold text-indigo-700">Status</th>
                            <th className="py-3 px-4 text-center font-semibold text-indigo-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((habit, index) => (
                            <tr key={index} className="hover:bg-indigo-50 transition duration-200">
                                <td className="py-4 px-4 border-b border-gray-200">{habit.title}</td>
                                <td className="py-4 px-4 text-center border-b border-gray-200">{habit.frequenty}</td>
                                <td
                                    className={`py-4 px-4 text-center border-b border-gray-200 font-semibold ${habit.completed ? "text-green-500" : "text-red-500"}`}
                                >
                                    {habit.completed ? "Completed" : "Not Completed"}
                                </td>
                                <td className="py-4 px-4 text-center border-b border-gray-200">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant={"ghost"}>
                                                ⋮
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-white border rounded shadow-md mt-2">
                                            <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold">Actions</DropdownMenuLabel>
                                            {!habit.completed && (
                                                <DropdownMenuItem onClick={() => updateHabit.mutate({ id: habit.id, completed: true })} className="px-4 py-2 hover:bg-indigo-50">
                                                    ✅ Mark as Completed
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem onClick={() => deleteHabit.mutate({ id: habit.id })} className="px-4 py-2 text-red-600 hover:bg-red-100">
                                                ❌ Delete Habit
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-gray-500 text-lg mt-20">
                    🚀 No habits to track yet. Start building your habits today!
                </div>
            )}
        </div>
    );


}