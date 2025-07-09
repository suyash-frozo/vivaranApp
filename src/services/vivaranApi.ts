import { VivaranAPIRequest, VivaranAPIResponse } from '../types';

const API_ENDPOINT = 'https://endearing-prosperity-production.up.railway.app/analyze';

export const analyzeMedicalBill = async (
  fileContent: string,
  docId: string,
  userId: string,
  fileFormat: string = 'pdf',
  language: string = 'english',
  stateCode: string = 'DL',
  insuranceType: string = 'general'
): Promise<VivaranAPIResponse> => {
  const requestPayload: VivaranAPIRequest = {
    file_content: fileContent,
    doc_id: docId,
    user_id: userId,
    language,
    state_code: stateCode,
    insurance_type: insuranceType,
    file_format: fileFormat
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `API request failed with status: ${response.status}`);
    }

    const data: VivaranAPIResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
    throw new Error('Analysis failed: Unknown error occurred');
  }
};

export const validateApiResponse = (response: VivaranAPIResponse): boolean => {
  return (
    typeof response.verdict === 'string' &&
    typeof response.total_overcharge === 'number' &&
    typeof response.confidence_score === 'number' &&
    response.confidence_score >= 0 &&
    response.confidence_score <= 100
  );
};