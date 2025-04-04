import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Plus, Trash2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function TaskList({ onTaskComplete }: { onTaskComplete: (change: number) => void }) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete deep work session", completed: false },
    { id: "2", title: "Review progress", completed: false },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const addTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete?.completed) {
      onTaskComplete(-1); // Reduce completed count if deleting a completed task
    }
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          const newStatus = !task.completed;
          onTaskComplete(newStatus ? 1 : -1); // Increase or decrease completed task count
          return { ...task, completed: newStatus };
        }
        return task;
      })
    );
  };

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
  };

  const saveEditTask = () => {
    if (editTaskTitle.trim() === "") return;
    setTasks(
      tasks.map(task =>
        task.id === editTaskId ? { ...task, title: editTaskTitle } : task
      )
    );
    setEditTaskId(null);
  };

  return (
    <Card className="w-full animate-fade-in shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            className="flex-1 mr-2"
          />
          <Button onClick={addTask} size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No tasks yet. Add one above!
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-md border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mr-2"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </Button>

                  {editTaskId === task.id ? (
                    <Input
                      value={editTaskTitle}
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEditTask();
                        if (e.key === "Escape") setEditTaskId(null);
                      }}
                      onBlur={saveEditTask}
                      autoFocus
                      className="flex-1"
                    />
                  ) : (
                    <span
                      className={`flex-1 ${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditTask(task)}
                    disabled={editTaskId === task.id}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}