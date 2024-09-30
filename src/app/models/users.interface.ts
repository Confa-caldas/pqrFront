export interface UserList {
  user_id: string;
  user_name: string;
  user_email: string;
  role_id: number;
  created_by: string;
  created_date: string;
  is_active: number | boolean;
  is_visible: number | boolean;
  user_name_completed: string;
}
export interface RequestsList {
  request_id: number;
  filing_number: number;
  filing_date: string;
  filing_date_date?: Date;
  filing_time: string;
  request_status: number;
  applicant_type: number;
  request_type: number;
  doc_type: number;
  doc_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_cellphone: string;
  request_description: string;
  request_days: number;
  assigned_user: string;
  request_answer: string;
  data_treatment: boolean;
  applicant_attachments: string[];
  assigned_attachments: string[];
  form_id: number;
  status_name: string;
  user_name_completed: string;
}

export interface RequestsDetails {
  request_id: number;
  filing_number: number;
  filing_date: string;
  filing_time: string;
  status_name: string;
  request_status?: number;
  applicant_type_name: string;
  applicant_type_id: number;
  request_type_name: string;
  request_type_id: number;
  catalog_item_name: string;
  doc_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_cellphone: string;
  request_description: string;
  request_days: number;
  assigned_user: string;
  request_answer: string;
  data_treatment: boolean;
  applicant_attachments: string[];
  assigned_attachments: string[];
  form_id: number;
  updated_by?: string;
  updated_date?: string;
  user_name_completed?: string;
}
export interface RequestAttachmentsList {
  url: string;
  file_name: string;
  file_size: string;
  file_ext: string;
  file_date: string;
}

export interface RequestHistoric {
  request_id: number;
  table_name: string;
  action: string;
  rowid: string;
  updated_by: string;
  updated_date: string;
  updated_time: string;
  old_data: string;
  new_data: string;
  status_name: string;
  assigned_user: string;
  difference: string[];
  user_name_completed: string;
}
export interface AssignUserRequest {
  request_id: number;
  filing_number?: number;
  filing_date?: string;
  filing_time?: string;
  request_status?: number;
  applicant_type?: number;
  request_type?: number;
  doc_type?: number;
  doc_id?: string;
  applicant_name?: string;
  applicant_email?: string;
  applicant_cellphone?: string;
  request_description?: string;
  request_days?: number;
  assigned_user?: string;
  request_answer?: string;
  data_treatment?: boolean;
  applicant_attachments?: string[];
  assigned_attachments?: string[];
  form_id?: number;
  user_name_completed?: string;
}

export interface UserCreate {
  user_name: string;
}

export interface ApplicantTypeList {
  applicant_type_id: number;
  applicant_type_name: string;
  applicant_type_description: string;
  is_active: number | boolean;
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
}

export interface RequestTypeList {
  request_type_id: number;
  is_active: number | boolean;
  request_type_name: string;
  request_type_description: string;
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
  form_id?: number;
  request_days?: number;
}
export interface RequestFormList {
  request_status: number;
  applicant_type: number;
  request_type: number;
  doc_type: number;
  doc_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_cellphone: string;
  request_description: string;
  request_days: number;
  assigned_user: string;
  request_answer: string;
  data_treatment: boolean;
  applicant_attachments?: ApplicantAttachments[] | null;
  assigned_attachments?: ApplicantAttachments[] | null;
  form_id?: number;
}
export interface answerRequest {
  request_status: number;
  request_answer: string;
  request_id: number;
  assigned_attachments?: ApplicantAttachments[] | null;
}
export interface ApplicantAttachments {
  base64file: string;
  source_name: string;
  fileweight: string;
  file?: File;
}
export interface AssociationApplicantRequestList {
  applicant_requests_type_id: number;
  applicant_type_name: string;
  applicant_type: number;
  request_type_name: string;
  request_type: number;
  is_active: number | boolean;
}
export interface CreateApplicantType {
  applicant_type_name: string;
  applicant_type_description: string;
}

export interface CreateRequestType {
  request_type_id?: number;
  request_type_name: string;
  request_type_description: string;
}

export interface AssociateApplicantRequest {
  applicant_type_id: number;
  request_type_id: number;
}
export interface ModalityList {
  modality_id: number;
  modality_name: string;
  is_active?: number | boolean;
  created_by?: string;
  created_date?: string;
  updated_by?: string;
  updated_date?: string;
}
export interface CategoryList {
  category_id: number;
  category_name: string;
  tipology_name: string;
  cause_name: string;
  modality_id?: number;
  modality_name?: string;
  is_active?: number | boolean;
  created_by?: string;
  created_date?: string;
  updated_by?: string;
  updated_date?: string;
}
export interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

export interface ExportColumn {
  title: string;
  dataKey: string;
}

export interface ApplicantAttach {
  url: string;
  fileName: string;
  fileExt: string;
  fileSize: string;
  fileDate?: string;
}

export interface NotificationList {
  notification_id?: number;
  notification_name: string;
  notification_message: string;
  notification_receiver?: string[];
  notification_receiver_id?: number;
  receiver_type_name?: string;
  action_name?: string;
  action_id?: number;
  is_active?: number | boolean;
  created_by?: string;
  created_date?: string;
  updated_by?: string;
  updated_date?: string;
}
export interface NotificationActionList {
  action_id: number;
  action_name: string;
  action_description: string;
  is_active: number | boolean;
}
export interface NotificationReceiversList {
  receiver_id: number;
  receiver_name: string;
  is_active: number | boolean;
}
export interface QualityDimensionList {
  quality_dimension_id: number;
  quality_dimension_name: string;
  quality_dimension_description: string;
  is_active: number | boolean;
}
export interface CharacterizationCreate {
  request_id: number;
  applicant_type_id: number;
  request_type_id: number;
  is_pqr: number;
  quality_dimension_id?: number;
  modality_id?: number;
  category_id?: number;
  month?: number;
}
export interface TipologiesCauses {
  category_name?: string;
  tipology_name?: string;
  cause_name?: string;
  category_id?: number;
  is_active?: number | boolean;
}
export interface DownloadAttach {
  download_url: string;
}

export interface RequestStatusList {
  request_status_id: number;
  status_name: string;
  status_description: string;
  is_active: number;
}
export interface IsPqrCatalog {
  id: number;
  name: string;
}
export interface FilterRequests {
  i_date: string | null;
  f_date: string | null;
  status_id?: number | null;
  assigned_user?: string | null;
  is_pqr?: number | null;
  filing_number?: number | null;
  doc_id?: string | null;
  applicant_name?: string | null;
  request_days?: number | null;
  applicant_type_id?: number | null;
  request_type_id?: number | null;
  page?: number;
  page_size?: number;
}
export interface RequestReportList {
  request_id: number;
  filing_number: number;
  filing_date: number;
  filing_time: string;
  status_name: string;
  applicant_type_name: string;
  applicant_type_id: number;
  request_type_name: string;
  request_type_id: number;
  catalog_item_name: string;
  doc_id: number;
  applicant_name: string;
  applicant_email: string;
  applicant_cellphone: string;
  request_description: string;
  request_days: number;
  assigned_user: string;
  request_answer: string;
  data_treatment: boolean | string;
  applicant_attachments: string[];
  assigned_attachments: string[];
  form_id: number;
  updated_by: string;
  updated_date: string;
  is_pqr: number | string;
  reclasification_applicant_type_name: string;
  reclasification_request_type_name: string;
  answer_date: string;
  answer_time: string;
  quality_dimension_name: string;
  modality_id: number;
  modality_name: string;
  category_id: number;
  category_name: string;
  tipology_name: string;
  cause_name: string;
  month: number | string;
}
export interface Pagination {
  request_id?: number;
  page: number;
  page_size: number;
}
export interface PreSignedAttach {
  source_name?: string;
  request_id?: number;
  url?: string;
}

export interface RequestReportDetail {
  type: string;
  total_request: number;
}
