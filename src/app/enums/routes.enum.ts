export enum RoutesApp {
  LOGIN = 'login',
  MAIN_PAGE = 'main-page',
  REQUEST_MANAGER = 'request-manager',
  APPLICANT_TYPE = 'applicant-type',
  REQUEST_TYPE = 'request-type',
  APPLICANT_REQUEST = 'applicant-request-association',
  MODALITY = 'modality',
  CATEGORY = 'category',
  SEARCH_REQUEST = 'search-requests',
  REQUEST_REPORT = 'request-report',
  LOGOUT = 'logout',
  CREATE_REQUEST = 'create-request',
  REQUEST_DETAILS = 'request-details',
  REQUEST_FORM = 'request-form',
  NOTIFICATIONS = 'configure-notifications',
  PROCESS_REQUEST = 'process-request',
  REPORT_DETAILS = 'report-details',
}
export enum EndPointRoute {
  USERS_LIST = 'db/users',
  USER_LIST_PAGINATION = 'db/pagination/users',
  ALL_REQUESTS_BY_ASSIGNED_USER = 'request/byassigned',
  REQUEST_DETAILS = 'request/details',
  REQUEST_ATTACHMENTS_LIST = 'request/attachments/list',
  REQUEST_HISTORIC = 'historic/by/request',
  CREATE_USER = 'user/create',
  ASSIGN_USER_TO_REQUEST = 'request/assignuser',
  INACTIVATE_USER = 'user/in-activate',
  INVISIBLE_USER = 'user/in-visible',
  APPLICANT_TYPE_LIST = 'db/applicant_type',
  APPLICANT_TYPE_LIST_PAGINATION = 'db/pagination/applicant_type',
  INACTIVATE_APPLICANT = 'applicant/in-activate',
  REQUEST_TYPE_LIST = 'db/request_type',
  REQUEST_TYPE_LIST_PAGINATION = 'db/pagination/request_type',
  INACTIVATE_REQUEST = 'request/in-activate',
  APPLICANTYPE_REQUESTYPE = 'applicants/requests/association',
  ASSOCIATE_REQUEST_APPLICANT = 'associate/applicant/request',
  INACTIVE_ASSOCIATE_REQUEST_APPLICANT = 'association/applicant/request/in-activate',
  CREATE_APPLICANT_TYPE = 'applicant/create',
  MODIFY_APPLICANT_TYPE = 'applicantype/modify',
  CREATE_REQUEST_TYPE = 'requestype/create',
  MODIFY_REQUEST_TYPE = 'requestype/modify',
  MODALITY_LIST = 'db/modalities',
  MODALITY_LIST_PAGINATION = 'db/pagination/modalities',
  CREATE_MODALITY = 'modality/create',
  UPDATE_MODALITY = 'modality/modify',
  INACTIVATE_MODALITY = 'modality/in-activate',
  CATEGORY_LIST = 'db/categories',
  CATEGORY_LIST_PAGINATION = 'db/pagination/categories',
  REQUEST_STATUS = 'db/request_status',
  QUALITY_DIMENSION_LIST = 'db/quality_dimensions',
  CATEGORIES_BY_MODALITY = 'categories/by',
  TIPOLOGIES_BY_CATEGORY = 'tipologies/by/category',
  CAUSES_BY_TIPOLOGY = 'cause/by/tipology',
  NOTIFICATION_LIST_PAGINATION = 'db/pagination/notifications',
  NOTIFICATION_ACTION_LIST = 'db/notification_actions',
  NOTIFICATION_RECEIVER_LIST = 'db/receivers',
  CREATE_CATEGORY = 'category/create',
  INACTIVATE_CATEGORY = 'category/in-activate',
  UPDATE_CATEGORY = 'category/modify',
  CREATE_NOTIFICATION = 'notification/create',
  INACTIVATE_NOTIFICATION = 'notification/in-activate',
  UPDATE_NOTIFICATION = 'notification/modify',
  REQUEST_BY_APPLICANT = 'requeststypes/by',
  REQUEST_LIST = 'get_form/',
  CREATE_REQUEST = 'request/create',
  ATTACHMENTS_FILES = 'request/attachments',
  ANSWER_REQUEST = 'request/answer',
  CHARACTERIZE_REQUEST = 'request/characterization/create',
  DOWNLOAD_ATTACH = 'download/attach',
  REQUEST_REPORT = 'requests/report/filter',
  REQUEST_REPORT_ALL = 'requests/report/filter/all',
  REQUEST_BY_FILTER = 'requests/filter',
  REFRESH_TOKEN = 'token/refresh',
  URL_SIGNER = 'url/signer',
  REQUEST_REPORT_DETAIL_ALL = 'requests/report/all',
  REQUEST_REPORT_STATUS = 'requests/report/status',
  REQUEST_REPORT_FOR_STATUS = 'requests/report/for_status',
  REQUEST_REPORT_STATUS_BY_ASSIGNED_USER = 'requests/report/status_by_user',
  ATTACHMENTS_ERROR_LOG = 'error/log_attachment',
  CREATE_ANSWER_TEM = 'answer_temp/create',
  GET_ANSWER_TEMP_REQUEST = 'answer_temp/filter_request',
}
