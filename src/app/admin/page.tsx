"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, Settings, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Pages",
      value: "17",
      description: "Active pages in the system",
      icon: FileText,
    },
    {
      title: "Settings",
      value: "1",
      description: "Configurable components",
      icon: Settings,
    },
    {
      title: "Users",
      value: "1",
      description: "Admin users",
      icon: Users,
    },
    {
      title: "Analytics",
      value: "Coming Soon",
      description: "Performance metrics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to Pulau Pedia Admin Panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your application settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium">Footer Settings</p>
                <p className="text-sm text-muted-foreground">Update footer content and colors</p>
              </div>
              <a href="/admin/footer" className="text-sm font-medium text-primary hover:underline">
                Edit →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
