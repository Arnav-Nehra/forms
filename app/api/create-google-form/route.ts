import { NextRequest, NextResponse } from 'next/server';
import { createFormsClient, createDriveClient, validateAccessToken } from '@/lib/google-api';
import { GoogleFormStructure, GoogleFormItem } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    const { formStructure } = await request.json();

    if (!formStructure) {
      return NextResponse.json(
        { error: "Form structure is required" },
        { status: 400 }
      );
    }

    // Get the session to access the access token
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in with Google." },
        { status: 401 }
      );
    }

    // Validate access token
    const isValidToken = await validateAccessToken(session.accessToken);
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Invalid or expired access token. Please sign in again." },
        { status: 401 }
      );
    }

    // Create authenticated clients
    const formsClient = createFormsClient(session.accessToken);
    const driveClient = createDriveClient(session.accessToken);

    // Step 1: Create the form using Google Forms API
    const createFormResponse = await formsClient.forms.create({
      requestBody: {
        info: {
          title: formStructure.info.title,
        }
      }
    });

    if (!createFormResponse.data.formId) {
      throw new Error('Failed to create form - no form ID returned');
    }

    const formId = createFormResponse.data.formId;

    // Step 2: Add form items using batch update
    if (formStructure.items && formStructure.items.length > 0) {
      const batchUpdateRequests = formStructure.items.map((item: GoogleFormItem, index: number) => {
        // Create a minimal item structure that the Google Forms API supports
        const cleanItem: any = {
          title: item.title,
        };

        // Add description if it exists
        if (item.description) {
          cleanItem.description = item.description;
        }

        // Handle question items - only include basic supported structure
        if (item.questionItem && item.questionItem.question) {
          const question = item.questionItem.question;
          
          cleanItem.questionItem = {
            question: {
              required: question.required || false,
            }
          };

          // Only add supported question types
          if (question.textQuestion) {
            // Text questions don't need additional fields in the API
            cleanItem.questionItem.question.textQuestion = {};
          }

          if (question.choiceQuestion && question.choiceQuestion.options) {
            cleanItem.questionItem.question.choiceQuestion = {
              type: question.choiceQuestion.type,
              options: question.choiceQuestion.options
            };
          }

          if (question.scaleQuestion) {
            cleanItem.questionItem.question.scaleQuestion = {
              low: question.scaleQuestion.low,
              high: question.scaleQuestion.high
            };
            
            if (question.scaleQuestion.lowLabel) {
              cleanItem.questionItem.question.scaleQuestion.lowLabel = question.scaleQuestion.lowLabel;
            }
            
            if (question.scaleQuestion.highLabel) {
              cleanItem.questionItem.question.scaleQuestion.highLabel = question.scaleQuestion.highLabel;
            }
          }

          if (question.dateQuestion) {
            cleanItem.questionItem.question.dateQuestion = {};
            if (question.dateQuestion.includeTime !== undefined) {
              cleanItem.questionItem.question.dateQuestion.includeTime = question.dateQuestion.includeTime;
            }
            if (question.dateQuestion.includeYear !== undefined) {
              cleanItem.questionItem.question.dateQuestion.includeYear = question.dateQuestion.includeYear;
            }
          }

          if (question.timeQuestion) {
            cleanItem.questionItem.question.timeQuestion = {};
            if (question.timeQuestion.duration !== undefined) {
              cleanItem.questionItem.question.timeQuestion.duration = question.timeQuestion.duration;
            }
          }

          if (question.fileUploadQuestion) {
            cleanItem.questionItem.question.fileUploadQuestion = {
              maxFileSize: question.fileUploadQuestion.maxFileSize,
              maxFiles: question.fileUploadQuestion.maxFiles,
              types: question.fileUploadQuestion.types
            };
          }
        }

        // Handle other item types
        if (item.questionGroupItem) {
          cleanItem.questionGroupItem = item.questionGroupItem;
        }

        if (item.pageBreakItem) {
          cleanItem.pageBreakItem = item.pageBreakItem;
        }

        if (item.textItem) {
          cleanItem.textItem = item.textItem;
        }

        if (item.imageItem) {
          cleanItem.imageItem = item.imageItem;
        }

        if (item.videoItem) {
          cleanItem.videoItem = item.videoItem;
        }

        return {
          createItem: {
            item: cleanItem,
            location: {
              index: index
            }
          }
        };
      });

      console.log('Batch update requests:', JSON.stringify(batchUpdateRequests, null, 2));

      try {
        await formsClient.forms.batchUpdate({
          formId: formId,
          requestBody: {
            requests: batchUpdateRequests
          }
        });
      } catch (batchError: any) {
        console.error('Batch update error details:', {
          error: batchError.message,
          response: batchError.response?.data,
          status: batchError.response?.status
        });
        throw batchError;
      }
    }

    // Step 3: Get the complete form details
    const formDetailsResponse = await formsClient.forms.get({
      formId: formId
    });

    // Step 4: Get file metadata from Google Drive
    const driveFileResponse = await driveClient.files.get({
      fileId: formId,
      fields: 'id,name,description,webViewLink,owners,permissions'
    });

    // Step 5: Construct the response
    const form = {
      formId: formId,
      title: formDetailsResponse.data.info?.title || formStructure.info.title,
      description: formDetailsResponse.data.info?.description || formStructure.info.description || '',
      responderUri: `https://docs.google.com/forms/d/${formId}/viewform`,
      editLink: `https://docs.google.com/forms/d/${formId}/edit`,
      webViewLink: driveFileResponse.data.webViewLink,
      owners: driveFileResponse.data.owners,
      permissions: driveFileResponse.data.permissions,
      items: formDetailsResponse.data.items || [],
      settings: formDetailsResponse.data.settings,
      revisionId: formDetailsResponse.data.revisionId
    };

    return NextResponse.json({
      success: true,
      form: form
    });

  } catch (error: any) {
    console.error('Create form error:', error);
    
    // Handle specific Google API errors
    if (error.code === 401) {
      return NextResponse.json(
        { error: "Authentication failed. Please sign in again." },
        { status: 401 }
      );
    }
    
    if (error.code === 403) {
      return NextResponse.json(
        { error: "Permission denied. Please ensure you have the necessary permissions." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create Google Form. Please try again." },
      { status: 500 }
    );
  }
}

// GET endpoint to check authentication status
export async function GET(request: NextRequest) {
  try {
    // Get the session to access the access token
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in with Google." },
        { status: 401 }
      );
    }

    // Validate access token
    const isValidToken = await validateAccessToken(session.accessToken);
    
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Invalid or expired access token. Please sign in again." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      canCreateForms: true,
      message: 'Authentication verified successfully'
    });

  } catch (error: any) {
    console.error('Authentication check error:', error);
    return NextResponse.json(
      { error: "Failed to verify authentication" },
      { status: 500 }
    );
  }
} 