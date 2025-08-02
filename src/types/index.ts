export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  permissions?: string[];
  provider?: string;
  created_at?: string;
  last_login?: string;
  photoURL?: string;
}

export interface MedicalBill {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  analysisResult?: AnalysisResult;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

export interface AnalysisResult {
  verdict: string;
  totalOvercharge: number;
  confidenceScore: number;
  itemizedCharges: ItemizedCharge[];
  recommendations: string[];
}

export interface ItemizedCharge {
  item: string;
  chargedAmount: number;
  marketPrice: number;
  overcharge: number;
  category: string;
}

export interface VivaranAPIRequest {
  file_content: string;
  doc_id: string;
  user_id: string;
  language: string;
  state_code: string;
  insurance_type: string;
  file_format: string;
}

export interface VivaranAPIResponse {
  verdict?: string;
  total_overcharge?: number;
  confidence_score?: number;
  analysis_details?: any;
  final_result?: {
    verdict: string;
    total_overcharge: number;
    confidence_score: number;
    analysis_details?: any;
  };
  success?: boolean;
  doc_id?: string;
}