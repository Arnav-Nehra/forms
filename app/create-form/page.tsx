"use client";
import { useState } from "react";
import { GoogleFormStructure } from "@/lib/types";
import { useSession } from "next-auth/react";
import Navbar from "@/components/LandingPage/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, Sparkles, Check, ArrowLeft, ExternalLink, Copy, AlertCircle } from "lucide-react";

type Step = "create" | "review" | "creating" | "done";

const Preview = ({ title, empty, loading, formStructure }: { title?: string; empty?: boolean; loading?: boolean; formStructure?: GoogleFormStructure }) => (
  <div className="h-full flex flex-col">
    {loading ? (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-muted grid place-items-center">
          <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        </div>
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded-lg w-48 animate-pulse" />
          <div className="h-4 bg-muted rounded w-32 animate-pulse mx-auto" />
        </div>
      </div>
    ) : empty ? (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-full bg-muted grid place-items-center mb-5">
          <Sparkles className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg">Your form preview</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Describe your form on the left to see a live preview here.
        </p>
      </div>
    ) : formStructure ? (
      <div className="overflow-y-auto">
        <h2 className="text-2xl font-semibold tracking-tight">{title || "Untitled form"}</h2>
        {formStructure.info.description && (
          <p className="text-sm text-muted-foreground mt-2 mb-6">{formStructure.info.description}</p>
        )}
        <div className="h-px bg-border my-6" />
        <div className="space-y-6">
          {formStructure.items.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold text-muted-foreground flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <label className="font-medium text-foreground">{item.title}</label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.questionItem?.question?.textQuestion?.type === "SHORT_ANSWER" && "Short text"}
                    {item.questionItem?.question?.textQuestion?.type === "PARAGRAPH" && "Long text"}
                    {item.questionItem?.question?.choiceQuestion?.type === "RADIO" && "Multiple choice"}
                    {item.questionItem?.question?.choiceQuestion?.type === "CHECKBOX" && "Checkboxes"}
                    {item.questionItem?.question?.choiceQuestion?.type === "DROP_DOWN" && "Dropdown"}
                    {item.questionItem?.question?.scaleQuestion && "Rating scale"}
                    {item.questionItem?.question?.dateQuestion && "Date"}
                    {item.questionItem?.question?.timeQuestion && "Time"}
                    {item.questionItem?.question?.fileUploadQuestion && "File upload"}
                    {!item.questionItem && "Question"}
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 min-h-10 text-sm text-muted-foreground">
                {item.questionItem?.question?.choiceQuestion?.options?.map((opt, i) => (
                  <div key={i} className="py-1">• {opt.value}</div>
                )) || "Answer field"}
              </div>
            </div>
          ))}
        </div>
        <div className="h-px bg-border my-6" />
        <Button disabled variant="secondary" className="w-full h-11">
          Submit (preview)
        </Button>
      </div>
    ) : (
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title || "Untitled form"}</h2>
        <div className="h-px bg-border my-6" />
        <Button disabled variant="secondary" className="w-full h-11">
          Submit (preview)
        </Button>
      </div>
    )}
  </div>
);

export default function CreateFormPage() {
  const { data: session, status } = useSession();
  const [step, setStep] = useState<Step>("create");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [formStructure, setFormStructure] = useState<GoogleFormStructure | null>(null);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [createdForm, setCreatedForm] = useState<any>(null);

  const generateForm = async () => {
    if (!prompt.trim()) {
      setError("Please enter a form description");
      return;
    }

    setLoading(true);
    setError("");
    setFormStructure(null);

    try {
      const response = await fetch("/api/generate-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate form");
      }

      if (data.success && data.formStructure) {
        setFormStructure(data.formStructure);
        setStep("review");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createGoogleForm = async () => {
    if (!formStructure) {
      setError("No form structure to create");
      return;
    }

    if (!(session as any)?.accessToken) {
      setError("No access token available. Please sign in again.");
      return;
    }

    setStep("creating");
    setError("");

    try {
      const response = await fetch("/api/create-google-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formStructure }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create Google Form");
      }

      if (data.success && data.form) {
        setCreatedForm(data.form);
        setTimeout(() => setStep("done"), 1600);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setStep("review");
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const resetForm = () => {
    setPrompt("");
    setFormStructure(null);
    setCreatedForm(null);
    setError("");
    setStep("create");
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
            <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">Please sign in with Google to create forms in your Google Drive.</p>
            <Link href="/signin">
              <Button className="w-full h-11">Sign In with Google</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const left = (() => {
    if (step === "create" && loading)
      return (
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight">Generating form...</h1>
          <p className="text-muted-foreground mt-2">Using AI to create your form structure</p>
          <div className="mt-8 space-y-4">
            <Card className="p-5 border-border shadow-none">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-muted rounded-full w-full animate-pulse" />
                <div className="h-4 bg-muted rounded-full w-2/3 animate-pulse" />
              </div>
            </Card>
            <Card className="p-5 border-border shadow-none">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded-full w-2/3 animate-pulse" />
                <div className="h-4 bg-muted rounded-full w-full animate-pulse" />
              </div>
            </Card>
          </div>
          <Button disabled className="mt-6 w-full h-12 text-base">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating form...
          </Button>
        </div>
      );

    if (step === "create")
      return (
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight">Create a form</h1>
          <p className="text-muted-foreground mt-2">
            Describe your form in natural language and let AI generate it for you.
          </p>
          <Card className="mt-8 p-5 border-border shadow-none">
            <label className="text-sm font-medium text-foreground block">What form do you want to create?</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A customer feedback form with name, email, rating and comments..."
              className="mt-3 min-h-32 resize-none border-0 px-0 focus-visible:ring-0 shadow-none bg-transparent"
            />
          </Card>
          {error && (
            <div className="mt-4 flex gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          <Button
            onClick={generateForm}
            disabled={loading || !prompt.trim()}
            className="mt-6 w-full h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating form...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate form
              </>
            )}
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Tip:</span> Be specific about the form type, questions, and any special requirements.
          </p>
        </div>
      );

    if (step === "review")
      return (
        <div className="max-w-xl">
          <button
            onClick={() => setStep("create")}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to edit
          </button>
          <h1 className="text-4xl font-semibold tracking-tight mt-3">Review your form</h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s what will be created. Click &quot;Create form&quot; to publish it to your Google Drive.
          </p>
          <Card className="mt-8 p-6 border-border shadow-none">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Prompt</p>
            <p className="font-medium leading-relaxed text-foreground">{prompt}</p>
          </Card>
          {error && (
            <div className="mt-4 flex gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11" onClick={() => setStep("create")}>
              Go back
            </Button>
            <Button className="h-11" onClick={createGoogleForm} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Create form
                </>
              )}
            </Button>
          </div>
        </div>
      );

    if (step === "creating")
      return (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="space-y-6 w-full">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-foreground/10 grid place-items-center mx-auto relative">
                <Loader2 className="w-8 h-8 animate-spin text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Creating your form</h2>
                <p className="text-muted-foreground mt-2">Publishing to your Google Drive…</p>
              </div>
            </div>
            <div className="max-w-xs mx-auto space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-foreground/10 animate-pulse" />
                <p className="text-sm text-muted-foreground">Generating form structure</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-foreground/5 animate-pulse" />
                <p className="text-sm text-muted-foreground">Publishing to Google Drive</p>
              </div>
            </div>
          </div>
        </div>
      );

    return (
      <div className="max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tight">Form created</h1>
        <p className="text-muted-foreground mt-2">Your form has been published to your Google Drive.</p>
        <Card className="mt-8 p-6 border-border shadow-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-foreground text-background grid place-items-center flex-shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Successfully created</p>
              <p className="text-sm text-muted-foreground">Your form is live and ready to collect responses.</p>
            </div>
          </div>
          <div className="h-px bg-border my-5" />
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Form title</p>
          <p className="font-semibold mt-1 text-foreground">{formStructure?.info.title || "Your form"}</p>
        </Card>
        <Button asChild className="mt-6 w-full h-12 text-base">
          <a href={createdForm?.responderUri || "#"} target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open form
          </a>
        </Button>
        <div className="mt-3 flex gap-2">
          <Input
            readOnly
            value={createdForm?.responderUri || ""}
            className="h-11 font-mono text-xs border-border"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0 border-border"
            onClick={() => copyToClipboard(createdForm?.responderUri || "")}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" className="mt-3 w-full h-11 border-border" onClick={resetForm}>
          Create another form
        </Button>
      </div>
    );
  })();

  const right = (() => {
    if (step === "creating")
      return <Preview title={prompt.slice(0, 60)} loading />;
    if (step === "done")
      return (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-foreground text-background grid place-items-center mb-5">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">Form published</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Your form is live in Google Drive and ready to collect responses.
          </p>
        </div>
      );
    if (step === "review" && formStructure)
      return <Preview title={formStructure.info.title} formStructure={formStructure} />;
    if (loading)
      return <Preview title={prompt.slice(0, 60)} loading />;
    return prompt.trim() ? <Preview title={prompt.slice(0, 60)} /> : <Preview empty />;
  })();

  const twoColumn = step === "review";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {twoColumn ? (
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
          <section className="px-6 lg:px-12 py-12 lg:border-r border-border">{left}</section>
          <section className="px-6 lg:px-12 py-12 bg-muted/30">{right}</section>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl px-6 py-12 min-h-[calc(100vh-64px)] flex items-start justify-center">
          <div className="w-full">{left}</div>
        </div>
      )}
    </div>
  );
} 