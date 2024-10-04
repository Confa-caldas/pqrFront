import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BodyResponse, ZionResponse } from '../models/shared/body-response.inteface';
import { EndPointRoute } from '../enums/routes.enum';
import {
  ApplicantTypeList,
  AssignUserRequest,
  AssociateApplicantRequest,
  AssociationApplicantRequestList,
  CategoryList,
  CreateApplicantType,
  CreateRequestType,
  ModalityList,
  RequestHistoric,
  RequestFormList,
  RequestTypeList,
  RequestsDetails,
  RequestsList,
  UserCreate,
  UserList,
  NotificationList,
  NotificationActionList,
  NotificationReceiversList,
  QualityDimensionList,
  CharacterizationCreate,
  answerRequest,
  TipologiesCauses,
  DownloadAttach,
  RequestStatusList,
  FilterRequests,
  RequestReportList,
  ApplicantAttachments,
  Pagination,
  RequestAttachmentsList,
  PreSignedAttach,
  RequestReportDetail,
} from '../models/users.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Users {
  private apiUrl = 'https://api-utilitarios.confa.co/IA/analizartextoclasificar'; // URL del web service
  private apiKey = 'AIabZtSVgS2nIVD03HQxY1cM6qLmRS8B3zHlw3qo'; // La API key que te dieron
  private apiUrlAdjuntos = 'https://api-utilitarios.confa.co/IA/analizartextov2';

  constructor(private http: HttpClient) {}

  getUsersList() {
    return this.http.get<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.USERS_LIST}`
    );
  }
  getUsersListPagination(payload: Pagination) {
    return this.http.post<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.USER_LIST_PAGINATION}`,
      payload
    );
  }
  getRequestListByAssignedUser(assigned_user: string, payload: FilterRequests) {
    return this.http.post<BodyResponse<RequestsList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.ALL_REQUESTS_BY_ASSIGNED_USER}/${assigned_user}`,
      payload
    );
  }
  getRequestDetails(payload: number) {
    return this.http.get<BodyResponse<RequestsDetails>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_DETAILS}/${payload}`
    );
  }
  getRequestHistoric(payload: Pagination) {
    return this.http.post<BodyResponse<RequestHistoric[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_HISTORIC}`,
      payload
    );
  }
  getRequestAttachments(payload: Pagination, attachment_owner: string) {
    return this.http.post<BodyResponse<RequestAttachmentsList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_ATTACHMENTS_LIST}/${attachment_owner}`,
      payload
    );
  }
  assignUserToRequest(payload: AssignUserRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.ASSIGN_USER_TO_REQUEST}`,
      payload
    );
  }
  createUser(payload: UserCreate) {
    return this.http.post<BodyResponse<ZionResponse>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_USER}`,
      payload
    );
  }

  inactivateUser(payload: UserList) {
    return this.http.post<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_USER}`,
      payload
    );
  }

  invisibleUser(payload: UserList) {
    return this.http.post<BodyResponse<UserList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.INVISIBLE_USER}`,
      payload
    );
  }

  getApplicantTypesList() {
    return this.http.get<BodyResponse<ApplicantTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.APPLICANT_TYPE_LIST}`
    );
  }
  getApplicantTypesListPagination(payload: Pagination) {
    return this.http.post<BodyResponse<ApplicantTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.APPLICANT_TYPE_LIST_PAGINATION}`,
      payload
    );
  }
  inactivateApplicant(payload: ApplicantTypeList) {
    return this.http.post<BodyResponse<ApplicantTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_APPLICANT}`,
      payload
    );
  }
  createApplicantType(payload: CreateApplicantType) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_APPLICANT_TYPE}`,
      payload
    );
  }
  modifyApplicantType(payload: CreateApplicantType) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.MODIFY_APPLICANT_TYPE}`,
      payload
    );
  }

  getRequestTypesList() {
    return this.http.get<BodyResponse<RequestTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_TYPE_LIST}`
    );
  }
  getRequestTypesListPagination(payload: Pagination) {
    return this.http.post<BodyResponse<RequestTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_TYPE_LIST_PAGINATION}`,
      payload
    );
  }
  inactivateRequest(payload: RequestTypeList) {
    return this.http.post<BodyResponse<RequestTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_REQUEST}`,
      payload
    );
  }
  createRequestType(payload: CreateRequestType) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_REQUEST_TYPE}`,
      payload
    );
  }
  modifyRequestType(payload: CreateRequestType) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.MODIFY_REQUEST_TYPE}`,
      payload
    );
  }
  getApplicantTypeRequestsAssociation(payload: Pagination) {
    return this.http.post<BodyResponse<AssociationApplicantRequestList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.APPLICANTYPE_REQUESTYPE}`,
      payload
    );
  }
  inactivateAssociationApplicantRequest(payload: AssociationApplicantRequestList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVE_ASSOCIATE_REQUEST_APPLICANT}`,
      payload
    );
  }
  createAssociationApplicantRequest(payload: AssociateApplicantRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.ASSOCIATE_REQUEST_APPLICANT}`,
      payload
    );
  }
  getModalityList() {
    return this.http.get<BodyResponse<ModalityList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.MODALITY_LIST}`
    );
  }
  getModalityListPagination(payload: Pagination) {
    return this.http.post<BodyResponse<ModalityList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.MODALITY_LIST_PAGINATION}`,
      payload
    );
  }
  createModality(payload: ModalityList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_MODALITY}`,
      payload
    );
  }
  modifyModality(payload: ModalityList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.UPDATE_MODALITY}`,
      payload
    );
  }
  inactivateModality(payload: ModalityList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_MODALITY}`,
      payload
    );
  }
  getCategoryList() {
    return this.http.get<BodyResponse<CategoryList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.CATEGORY_LIST}`
    );
  }
  getCategoryListPagination(payload: Pagination) {
    return this.http.post<BodyResponse<CategoryList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.CATEGORY_LIST_PAGINATION}`,
      payload
    );
  }
  createCategory(payload: CategoryList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_CATEGORY}`,
      payload
    );
  }

  modifyCategory(payload: CategoryList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.UPDATE_CATEGORY}`,
      payload
    );
  }
  inactivateCategory(payload: CategoryList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_CATEGORY}`,
      payload
    );
  }
  getCategoryListByModality(modality_id: number) {
    return this.http.get<BodyResponse<CategoryList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.CATEGORIES_BY_MODALITY}/${modality_id}`
    );
  }
  getTipologiesListByCategory(payload: TipologiesCauses) {
    return this.http.post<BodyResponse<TipologiesCauses[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.TIPOLOGIES_BY_CATEGORY}`,
      payload
    );
  }
  getCausesListByTipology(payload: TipologiesCauses) {
    return this.http.post<BodyResponse<TipologiesCauses[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.CAUSES_BY_TIPOLOGY}`,
      payload
    );
  }
  getQualityDimensionsList() {
    return this.http.get<BodyResponse<QualityDimensionList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.QUALITY_DIMENSION_LIST}`
    );
  }
  getRequestsTypeByApplicantType(payload: number) {
    return this.http.get<BodyResponse<RequestTypeList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_BY_APPLICANT}/${payload}`
    );
  }

  getFormById(applicant_id: number) {
    return this.http.get<BodyResponse<[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_LIST}${applicant_id}`
    );
  }

  createRequest(payload: RequestFormList) {
    return this.http.post<BodyResponse<number>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_REQUEST}`,
      payload
    );
  }
  attachApplicantFiles(payloadAttach: any, request_id: number) {
    console.log(payloadAttach);
    const payload = {
      applicant_attachments: payloadAttach,
      request_id: request_id,
    };
    console.log(payload);
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.ATTACHMENTS_FILES}`,
      payload
    );
  }
  getNotificationActionList() {
    return this.http.get<BodyResponse<NotificationActionList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.NOTIFICATION_ACTION_LIST}`
    );
  }
  getNotificationReceiversList() {
    return this.http.get<BodyResponse<NotificationReceiversList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.NOTIFICATION_RECEIVER_LIST}`
    );
  }
  getNotificationList(payload: Pagination) {
    return this.http.post<BodyResponse<NotificationList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.NOTIFICATION_LIST_PAGINATION}`,
      payload
    );
  }
  getRequestStatusList() {
    return this.http.get<BodyResponse<RequestStatusList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_STATUS}`
    );
  }
  createNotification(payload: NotificationList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CREATE_NOTIFICATION}`,
      payload
    );
  }

  modifyNotification(payload: NotificationList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.UPDATE_NOTIFICATION}`,
      payload
    );
  }
  inactivateNotification(payload: NotificationList) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.INACTIVATE_NOTIFICATION}`,
      payload
    );
  }
  answerRequest(payload: answerRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.ANSWER_REQUEST}`,
      payload
    );
  }
  characterizeRequest(payload: CharacterizationCreate) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.CHARACTERIZE_REQUEST}`,
      payload
    );
  }
  downloadRequest(payload: DownloadAttach) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.DOWNLOAD_ATTACH}`,
      payload
    );
  }
  getRequestReport(payload: FilterRequests) {
    return this.http.post<BodyResponse<RequestReportList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_REPORT}`,
      payload
    );
  }
  getRequestReportAll(payload: FilterRequests) {
    return this.http.post<BodyResponse<RequestReportList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_REPORT_ALL}`,
      payload
    );
  }
  getRequestListByFilter(payload: FilterRequests) {
    return this.http.post<BodyResponse<RequestsList[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_BY_FILTER}`,
      payload
    );
  }
  getUrlSigned(payload: PreSignedAttach, attachment_owner: string) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.URL_SIGNER}/${attachment_owner}`,
      payload
    );
  }
  downloadFileFromS3(preSignedUrl: string): Observable<Blob> {
    return this.http.get(preSignedUrl, { responseType: 'blob' });
  }

  respuestaIaWs(requestDescription?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Asegura que se envíe como JSON
      'x-api-key': this.apiKey, // Incluye la API key en los headers
    });
    const payload = {
      mensaje: requestDescription,
    };
    return this.http.post(this.apiUrl, payload, { headers }); // Envía la petición con headers
  }

  respuestaIaAdjuntos(mensaje?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });
    // Serializa el mensaje como un objeto JSON en una cadena
    const payload = {
      body: JSON.stringify({
        userMessage: mensaje,
      }),
    };
    console.log(payload);
    return this.http.post(this.apiUrlAdjuntos, payload, { headers }); // Envía la petición con headers
  }

  getRequestReportDetail(): Observable<BodyResponse<RequestReportDetail[]>> {
    return this.http.post<BodyResponse<RequestReportDetail[]>>(
      `${environment.API_PUBLIC}${EndPointRoute.REQUEST_REPORT_DETAIL_ALL}`,
      {}
    );
  }
}
