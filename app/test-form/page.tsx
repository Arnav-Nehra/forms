"use client";
import { useState } from "react";
import { GoogleFormStructure } from "@/lib/types";
import { getQuestionType, getQuestionTypeInfo } from "@/lib/google-forms-api";

export default function TestFormPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GoogleFormStructure | null>(null);
  const [error, setError] = useState("");

  const generateForm = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

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
        setResult(data.formStructure);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getQuestionTypeLabel = (item: any) => {
    const questionType = getQuestionType(item);
    if (!questionType) return "Unknown";

    const questionTypeInfo = getQuestionTypeInfo();
    const info = questionTypeInfo.find(q => q.type === questionType);
    return info ? info.label : questionType;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Google Forms Generator Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Generate Form from Natural Language</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your form:
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a customer feedback form with name, email, rating scale from 1-5, and comments section"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
            
            <button
              onClick={generateForm}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Form"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Form Structure</h2>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Copy JSON
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium text-gray-900 mb-2">Form Information</h3>
                  <p className="text-gray-700"><strong>Title:</strong> {result.info.title}</p>
                  {result.info.description && (
                    <p className="text-gray-700"><strong>Description:</strong> {result.info.description}</p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium text-gray-900 mb-4">Questions ({result.items.length})</h3>
                  <div className="space-y-3">
                    {result.items.map((item, index) => (
                      <div key={item.itemId} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900">
                          {index + 1}. {item.title}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {getQuestionTypeLabel(item)}
                          </span>
                          <span className={`px-2 py-1 rounded ${
                            item.questionItem?.question?.required 
                              ? "bg-red-100 text-red-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {item.questionItem?.question?.required ? "Required" : "Optional"}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                        )}
                        {item.questionItem?.question?.choiceQuestion?.options && (
                          <div className="mt-2">
                            <p className="text-gray-600 text-sm">Options:</p>
                            <ul className="list-disc list-inside text-gray-600 text-sm ml-4">
                              {item.questionItem.question.choiceQuestion.options.map((option, optIndex) => (
                                <li key={optIndex}>{option.value}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {item.questionItem?.question?.scaleQuestion && (
                          <div className="mt-2">
                            <p className="text-gray-600 text-sm">
                              Scale: {item.questionItem.question.scaleQuestion.low} to {item.questionItem.question.scaleQuestion.high}
                              {item.questionItem.question.scaleQuestion.lowLabel && 
                                ` (${item.questionItem.question.scaleQuestion.lowLabel} to ${item.questionItem.question.scaleQuestion.highLabel})`}
                            </p>
                          </div>
                        )}
                        {item.questionItem?.question?.ratingQuestion && (
                          <div className="mt-2">
                            <p className="text-gray-600 text-sm">
                              Rating: {item.questionItem.question.ratingQuestion.type} ({item.questionItem.question.ratingQuestion.low} to {item.questionItem.question.ratingQuestion.high})
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Raw JSON Output</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 