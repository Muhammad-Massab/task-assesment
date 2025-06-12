"use client";

import type React from "react";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GET_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "@/lib/graphql/queries";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export default function TaskDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, loading, error, refetch } = useQuery(GET_TASKS);

  const [createTask, { loading: creating }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      setTitle("");
      setDescription("");
      refetch();
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => refetch(),
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => refetch(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask({
        variables: {
          input: {
            title: title.trim(),
            description: description.trim() || undefined,
            completed: false,
          },
        },
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask({
        variables: {
          id: task.id,
          input: {
            completed: !task.completed,
          },
        },
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask({
        variables: { id },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const tasks: Task[] = data?.tasks || [];
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Error loading tasks
          </div>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with GraphQL
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Tasks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedTasks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <X className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingTasks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Task Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Task
                </CardTitle>
                <CardDescription>
                  Create a new task to add to your list
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title *
                    </label>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter task title..."
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter task description..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={creating || !title.trim()}
                  >
                    {creating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Tasks</CardTitle>
                <CardDescription>
                  {tasks.length === 0
                    ? "No tasks yet. Create your first task!"
                    : `${tasks.length} task${
                        tasks.length === 1 ? "" : "s"
                      } total`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📝</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No tasks yet
                    </h3>
                    <p className="text-gray-600">
                      Get started by creating your first task!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Pending Tasks */}
                    {pendingTasks.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          Pending ({pendingTasks.length})
                        </h3>
                        <div className="space-y-3">
                          {pendingTasks.map((task) => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              onToggleComplete={handleToggleComplete}
                              onDelete={handleDelete}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Separator */}
                    {pendingTasks.length > 0 && completedTasks.length > 0 && (
                      <Separator className="my-6" />
                    )}

                    {/* Completed Tasks */}
                    {completedTasks.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Completed ({completedTasks.length})
                        </h3>
                        <div className="space-y-3">
                          {completedTasks.map((task) => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              onToggleComplete={handleToggleComplete}
                              onDelete={handleDelete}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <div
      className={`p-4 border rounded-lg transition-all hover:shadow-md ${
        task.completed
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-green-400"
            }`}
          >
            {task.completed && <Check className="h-3 w-3" />}
          </button>

          <div className="flex-1 min-w-0">
            <h4
              className={`font-medium ${
                task.completed ? "text-green-800 line-through" : "text-gray-900"
              }`}
            >
              {task.title}
            </h4>

            {task.description && (
              <p
                className={`mt-1 text-sm ${
                  task.completed
                    ? "text-green-600 line-through"
                    : "text-gray-600"
                }`}
              >
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 mt-2">
              <Badge variant={task.completed ? "default" : "secondary"}>
                {task.completed ? "Completed" : "Pending"}
              </Badge>
              <span className="text-xs text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
