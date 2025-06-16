// Google Forms API Types based on the official Discovery Document
// https://forms.googleapis.com/$discovery/rest?version=v1

export interface GoogleFormInfo {
  title: string;
  description?: string;
  documentTitle?: string;
}

export interface GoogleFormSettings {
  quizSettings?: {
    isQuiz: boolean;
  };
  emailCollectionType?: "EMAIL_COLLECTION_TYPE_UNSPECIFIED" | "DO_NOT_COLLECT" | "VERIFIED" | "RESPONDER_INPUT";
}

export interface GoogleFormPublishSettings {
  publishState: {
    isPublished: boolean;
    isAcceptingResponses: boolean;
  };
}

export interface GoogleFormOption {
  value: string;
  goToAction?: {
    condition: string;
    destinationId: string;
  };
}

export interface GoogleFormChoiceQuestion {
  type: "RADIO" | "CHECKBOX" | "DROP_DOWN";
  options: GoogleFormOption[];
  shuffle?: boolean;
}

export interface GoogleFormTextQuestion {
  type: "SHORT_ANSWER" | "PARAGRAPH";
  validation?: {
    type: "TEXT_LENGTH" | "NUMBER_RANGE" | "REGEX";
    value: string;
  };
}

export interface GoogleFormScaleQuestion {
  low: number;
  high: number;
  lowLabel?: string;
  highLabel?: string;
}

export interface GoogleFormDateQuestion {
  includeTime?: boolean;
  includeYear?: boolean;
}

export interface GoogleFormTimeQuestion {
  duration?: boolean;
}

export interface GoogleFormFileUploadQuestion {
  maxFileSize: number;
  maxFiles: number;
  types: string[];
}

export interface GoogleFormRowQuestion {
  title: string;
}

export interface GoogleFormRatingQuestion {
  scale: number; // Rating scale level (3-10)
}

export interface GoogleFormQuestion {
  questionId: string;
  required: boolean;
  grading?: {
    pointValue: number;
    correctAnswers?: {
      answers: Array<{
        value: string;
      }>;
    };
  };
  choiceQuestion?: GoogleFormChoiceQuestion;
  textQuestion?: GoogleFormTextQuestion;
  scaleQuestion?: GoogleFormScaleQuestion;
  dateQuestion?: GoogleFormDateQuestion;
  timeQuestion?: GoogleFormTimeQuestion;
  fileUploadQuestion?: GoogleFormFileUploadQuestion;
  rowQuestion?: GoogleFormRowQuestion;
  ratingQuestion?: GoogleFormRatingQuestion;
}

export interface GoogleFormImage {
  sourceUri: string;
  altText?: string;
  properties?: {
    alignment?: "LEFT" | "RIGHT" | "CENTER";
    width?: number;
    height?: number;
  };
}

export interface GoogleFormQuestionItem {
  question: GoogleFormQuestion;
  image?: GoogleFormImage;
}

export interface GoogleFormQuestionGroupItem {
  questions: GoogleFormQuestion[];
  image?: GoogleFormImage;
  grid?: {
    columns: GoogleFormChoiceQuestion;
    shuffleQuestions?: boolean;
  };
}

export interface GoogleFormPageBreakItem {
  navigationCondition?: {
    condition: string;
    destinationId: string;
  };
}

export interface GoogleFormTextItem {
  // No additional properties for text items
}

export interface GoogleFormImageItem {
  image: GoogleFormImage;
}

export interface GoogleFormVideo {
  youtubeUri: string;
  properties?: {
    alignment?: "LEFT" | "RIGHT" | "CENTER";
    width?: number;
    height?: number;
  };
}

export interface GoogleFormVideoItem {
  video: GoogleFormVideo;
  caption?: string;
}

export interface GoogleFormItem {
  itemId: string;
  title: string;
  description?: string;
  questionItem?: GoogleFormQuestionItem;
  questionGroupItem?: GoogleFormQuestionGroupItem;
  pageBreakItem?: GoogleFormPageBreakItem;
  textItem?: GoogleFormTextItem;
  imageItem?: GoogleFormImageItem;
  videoItem?: GoogleFormVideoItem;
}

export interface GoogleFormStructure {
  info: GoogleFormInfo;
  items: GoogleFormItem[];
  settings?: GoogleFormSettings;
}

// Complete Form object as returned by the API
export interface GoogleForm {
  formId: string;
  info: GoogleFormInfo;
  settings?: GoogleFormSettings;
  items: GoogleFormItem[];
  revisionId: string;
  responderUri: string;
  linkedSheetId?: string;
  publishSettings?: GoogleFormPublishSettings;
}

// API Response types
export interface GenerateFormResponse {
  success: boolean;
  formStructure?: GoogleFormStructure;
  rawResponse?: string;
  error?: string;
}

export interface CreateFormResponse extends GoogleForm {}

export interface UpdateFormRequest {
  requests: Array<{
    createItem?: {
      item: GoogleFormItem;
      location?: {
        index: number;
      };
    };
    updateItem?: {
      item: GoogleFormItem;
      updateMask?: string;
    };
    deleteItem?: {
      itemId: string;
    };
    moveItem?: {
      itemId: string;
      newIndex: number;
    };
    updateFormInfo?: {
      info: GoogleFormInfo;
      updateMask?: string;
    };
    updateSettings?: {
      settings: GoogleFormSettings;
      updateMask?: string;
    };
  }>;
  writeControl?: {
    targetRevisionId?: string;
  };
}

export interface BatchUpdateResponse {
  replies: Array<{
    createItem?: {
      item: GoogleFormItem;
    };
    updateItem?: {
      item: GoogleFormItem;
    };
    deleteItem?: {
      itemId: string;
    };
    moveItem?: {
      item: GoogleFormItem;
    };
    updateFormInfo?: {
      info: GoogleFormInfo;
    };
    updateSettings?: {
      settings: GoogleFormSettings;
    };
  }>;
  writeControl?: {
    targetRevisionId: string;
  };
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Question type mapping for easier identification
export type QuestionType = 
  | "TEXT_SHORT_ANSWER"
  | "TEXT_PARAGRAPH"
  | "CHOICE_RADIO"
  | "CHOICE_CHECKBOX"
  | "CHOICE_DROP_DOWN"
  | "SCALE"
  | "DATE"
  | "TIME"
  | "FILE_UPLOAD"
  | "ROW"
  | "RATING_STAR"
  | "RATING_HEART"
  | "RATING_THUMB";

export interface QuestionTypeInfo {
  type: QuestionType;
  label: string;
  description: string;
} 