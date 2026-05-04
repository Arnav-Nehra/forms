import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { createDriveClient, createFormsClient } from "@/lib/google-api";

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as any;

    if (!session) {
      return Response.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!session?.accessToken) {
      console.error("Session exists but no accessToken:", { 
        hasSession: !!session,
        sessionKeys: Object.keys(session || {}),
        user: session?.user?.email
      });
      return Response.json(
        { error: "No access token available. Please sign out and sign in again." },
        { status: 401 }
      );
    }

    // Get Google Drive client to list files
    const driveClient = createDriveClient(session.accessToken);
    const formsClient = createFormsClient(session.accessToken);

    // List all Google Forms in user's Drive
    const driveResponse = await driveClient.files.list({
      q: "mimeType='application/vnd.google-apps.form' and trashed=false",
      spaces: "drive",
      pageSize: 50,
      fields:
        "files(id, name, createdTime, modifiedTime, webViewLink, webContentLink)",
      orderBy: "modifiedTime desc",
    });

    const forms = driveResponse.data.files || [];

    // Fetch additional details for each form
    const formsWithDetails = await Promise.all(
      forms.map(async (form) => {
        try {
          const formDetails = await formsClient.forms.get({
            formId: form.id!,
          });

          return {
            id: form.id,
            title: formDetails.data.info?.title || form.name || "Untitled form",
            createdTime: form.createdTime,
            modifiedTime: form.modifiedTime,
            responderUri: formDetails.data.responderUri,
            editUri: `https://docs.google.com/forms/d/${form.id}/edit`,
            driveLink: form.webViewLink,
            itemCount: formDetails.data.items?.length || 0,
          };
        } catch (error) {
          console.error(`Error fetching form details for ${form.id}:`, error);
          return {
            id: form.id,
            title: form.name || "Untitled form",
            createdTime: form.createdTime,
            modifiedTime: form.modifiedTime,
            responderUri: `https://docs.google.com/forms/d/${form.id}/viewform`,
            editUri: `https://docs.google.com/forms/d/${form.id}/edit`,
            driveLink: form.webViewLink,
            itemCount: 0,
          };
        }
      })
    );

    return Response.json({
      success: true,
      forms: formsWithDetails,
      count: formsWithDetails.length,
    });
  } catch (error) {
    console.error("Error listing forms:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to list forms",
      },
      { status: 500 }
    );
  }
}
