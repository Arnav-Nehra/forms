"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "@/components/LandingPage/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Loader2,
  ExternalLink,
  Edit,
  Trash2,
  AlertCircle,
  FileText,
  Plus,
} from "lucide-react";

interface Form {
  id: string;
  title: string;
  createdTime: string;
  modifiedTime: string;
  responderUri: string;
  editUri: string;
  driveLink: string;
  itemCount: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetchForms();
    }
  }, [status]);

  const fetchForms = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/list-forms");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch forms");
      }

      setForms(data.forms || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="h-8 w-8 animate-spin text-foreground" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Card className="w-full max-w-md p-8 text-center border-border shadow-none">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
              Authentication Required
            </h2>
            <p className="text-muted-foreground mb-6">
              Please sign in with Google to view your forms.
            </p>
            <Link href="/signin">
              <Button className="w-full h-11">Sign In with Google</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">My Forms</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all your Google Forms
            </p>
          </div>
          <Link href="/create-form">
            <Button className="h-11">
              <Plus className="w-4 h-4 mr-2" />
              Create New Form
            </Button>
          </Link>
        </div>

        {error && (
          <div className="mb-6 flex gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-foreground mb-4" />
            <p className="text-muted-foreground">Loading your forms...</p>
          </div>
        ) : forms.length === 0 ? (
          <Card className="p-12 text-center border-border shadow-none">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No forms yet
            </h3>
            <p className="text-muted-foreground mb-6">
              You haven't created any forms yet. Create your first form to get
              started!
            </p>
            <Link href="/create-form">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Form
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <Card key={form.id} className="p-6 border-border shadow-none hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {form.title}
                  </h3>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Questions:</span> {form.itemCount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(form.createdTime).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Modified:</span>{" "}
                    {new Date(form.modifiedTime).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a href={form.responderUri} target="_blank" rel="noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-10 border-border"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </a>
                  <a href={form.editUri} target="_blank" rel="noreferrer" className="flex-1">
                    <Button className="w-full h-10">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
