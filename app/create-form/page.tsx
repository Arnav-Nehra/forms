"use client";
import { useState, useEffect } from "react";
import { GoogleFormStructure } from "@/lib/types";
import { useSession, signIn } from "next-auth/react";

export default function CreateFormPage() {
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingForm, setGeneratingForm] = useState(false);
  const [formStructure, setFormStructure] = useState<GoogleFormStructure | null>(null);
  const [error, setError] = useState("");
  const [createdForm, setCreatedForm] = useState<any>(null);

  const generateForm = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
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

    if (!session?.accessToken) {
      setError("No access token available. Please sign in again.");
      return;
    }

    setGeneratingForm(true);
    setError("");

    try {
      const response = await fetch("/api/create-google-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          formStructure
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create Google Form");
      }

      if (data.success && data.form) {
        setCreatedForm(data.form);
        setFormStructure(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setGeneratingForm(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Google Form</h1>
        
        {/* Authentication Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Google Authentication</h2>
          
          {!session ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                You need to authenticate with Google to create forms in your Google Drive.
              </p>
              <button
                onClick={() => signIn('google')}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Sign in with Google
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Authenticated with Google</span>
              </div>
              <p className="text-gray-600">
                Welcome, {session.user?.name}! You can now create Google Forms in your Google Drive.
              </p>
            </div>
          )}
        </div>

        {/* Form Generation Section */}
        {session && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Generate Form Structure</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your form
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create a customer feedback form with name, email, rating from 1-5 (as checkboxes), and comments section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              
              <button
                onClick={generateForm}
                disabled={loading || !prompt.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Form Structure"}
              </button>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Structure Display */}
        {formStructure && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Generated Form Structure</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {formStructure.info.title}
                </h3>
                {formStructure.info.description && (
                  <p className="text-gray-600 mb-4">{formStructure.info.description}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Form Items:</h4>
                <ul className="space-y-2">
                  {formStructure.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      • {item.title} ({item.questionItem?.question?.textQuestion?.type === 'SHORT_ANSWER' ? 'Short Text' : 
                        item.questionItem?.question?.textQuestion?.type === 'PARAGRAPH' ? 'Long Text' :
                        item.questionItem?.question?.choiceQuestion?.type === 'RADIO' ? 'Multiple Choice' :
                        item.questionItem?.question?.choiceQuestion?.type === 'CHECKBOX' ? 'Checkboxes' :
                        item.questionItem?.question?.scaleQuestion ? 'Rating Scale' :
                        item.questionItem?.question?.dateQuestion ? 'Date' :
                        item.questionItem?.question?.timeQuestion ? 'Time' :
                        item.questionItem?.question?.fileUploadQuestion ? 'File Upload' :
                        'Text input'})
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={createGoogleForm}
                disabled={generatingForm}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {generatingForm ? "Creating Google Form..." : "Create Google Form"}
              </button>
            </div>
          </div>
        )}

        {/* Created Form Display */}
        {createdForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Form Created Successfully!</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                Your Google Form has been created and saved to your Google Drive!
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{createdForm.title}</h3>
                {createdForm.description && (
                  <p className="text-gray-600">{createdForm.description}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <a
                  href={createdForm.responderUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
                >
                  View Form
                </a>
                <a
                  href={createdForm.editLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-center"
                >
                  Edit Form
                </a>
              </div>
              
              <button
                onClick={() => {
                  setCreatedForm(null);
                  setPrompt("");
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Create Another Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 