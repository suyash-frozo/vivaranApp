import { VivaranAPIRequest, VivaranAPIResponse } from '../types';

const API_ENDPOINT = 'https://endearing-prosperity-production.up.railway.app/analyze';
const API_ENDPOINT_ENHANCED = 'https://endearing-prosperity-production.up.railway.app/analyze-enhanced';

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

export const analyzeMedicalBillEnhanced = async (
  fileContent: string,
  docId: string,
  userId: string,
  fileFormat: string = 'pdf',
  language: string = 'english',
  stateCode: string = 'DL',
  insuranceType: string = 'cghs',
  query: string = 'Analyze this medical document'
): Promise<VivaranAPIResponse> => {
  const requestPayload: VivaranAPIRequest & { query: string } = {
    file_content: fileContent,
    doc_id: docId,
    user_id: userId,
    language,
    state_code: stateCode,
    insurance_type: insuranceType,
    file_format: fileFormat,
    query
  };

  // Detailed logging as requested
  console.log('================================================================================');
  console.log('🚀 API REQUEST DETAILS');
  console.log('================================================================================');
  console.log(`📍 URL: ${API_ENDPOINT_ENHANCED}`);
  console.log(`📍 METHOD: POST`);
  console.log(`📍 CONTENT-TYPE: application/json`);
  console.log('');
  console.log('📤 REQUEST PAYLOAD:');
  console.log(`    doc_id: ${requestPayload.doc_id}`);
  console.log(`    user_id: ${requestPayload.user_id}`);
  console.log(`    language: ${requestPayload.language}`);
  console.log(`    file_format: ${requestPayload.file_format}`);
  console.log(`    state_code: ${requestPayload.state_code}`);
  console.log(`    insurance_type: ${requestPayload.insurance_type}`);
  console.log(`    query: ${requestPayload.query}`);
  console.log(`    file_content: [BASE64 DATA - ${requestPayload.file_content.length} chars]`);
  console.log(`    file_content_preview: ${requestPayload.file_content.substring(0, 50)}...`);
  console.log('');
  console.log('🔍 REQUEST SIZE ANALYSIS:');
  const totalSize = JSON.stringify(requestPayload).length;
  console.log(`    Estimated total size: ${totalSize} chars (~${Math.round(totalSize / 1024)}KB)`);
  console.log(`    Base64 content size: ${requestPayload.file_content.length} chars`);
  console.log('');

  try {
    const response = await fetch(API_ENDPOINT_ENHANCED, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload)
    });

    console.log('================================================================================');
    console.log('✅ API RESPONSE RECEIVED');
    console.log('================================================================================');
    console.log(`📍 STATUS: ${response.status} ${response.statusText}`);
    console.log('📍 HEADERS:');
    response.headers.forEach((value, key) => {
      console.log(`    ${key}: ${value}`);
    });
    console.log('');

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.log('❌ ERROR RESPONSE:');
      console.log(errorData ? JSON.stringify(errorData, null, 2) : 'No error data available');
      console.log('================================================================================');
      throw new Error(errorData?.message || `API request failed with status: ${response.status}`);
    }

    const data: VivaranAPIResponse = await response.json();
    
    console.log('📥 RESPONSE BODY:');
    console.log(JSON.stringify(data, null, 2));
    console.log('================================================================================');
    
    return data;
  } catch (error) {
    console.log('❌ API REQUEST FAILED:');
    console.log(error instanceof Error ? error.message : 'Unknown error occurred');
    console.log('================================================================================');
    
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
    throw new Error('Analysis failed: Unknown error occurred');
  }
};

export const validateApiResponse = (response: VivaranAPIResponse): boolean => {
  // Check for new enhanced format first
  if (response.final_result) {
    return (
      typeof response.final_result.verdict === 'string' &&
      typeof response.final_result.total_overcharge === 'number' &&
      typeof response.final_result.confidence_score === 'number' &&
      response.final_result.confidence_score >= 0 &&
      response.final_result.confidence_score <= 100
    );
  }
  
  // Fallback to original format
  return (
    typeof response.verdict === 'string' &&
    typeof response.total_overcharge === 'number' &&
    typeof response.confidence_score === 'number' &&
    response.confidence_score >= 0 &&
    response.confidence_score <= 100
  );
};