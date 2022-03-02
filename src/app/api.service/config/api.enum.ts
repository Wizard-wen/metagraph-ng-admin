/**
 * @author songxiwen
 * @date  2022/2/21 13:12
 */

export enum ApiPathEnum {
  // pull request
  GetPullRequestList = '/admin/pull/request/getList',
  GetPullRequestDetail = '/admin/pull/request/detail',
  // user
  GetUserList = '/api/admin/account/user/getList',
  // domain
  GetDomainList = '/api/admin/domain/getList',
  CreateDomain = '/api/admin/domain/create',
  RemoveDomain = '/api/admin/domain/remove',
  UpdateDomain = '/api/admin/domain/update',
  // domain base type
  GetDomainBaseTypeList = '/api/admin/domainBaseType/getList',
  GetDomainBaseTypeTotalList = '/api/admin/domainBaseType/getTotalList',
  ChangeDomainBaseTypeChangeStatus = '/api/admin/domainBaseType/changeStatus',
  CreateDomainBaseType = '/api/admin/domainBaseType/create',
  GetDomainBaseTypeById = '/api/admin/domainBaseType/getById',
  UpdateDomainBaseType = '/api/admin/domainBaseType/update',
  // file
  GetFilePageList = '/api/admin/file/getFilePageList',
  GetFileList = '/api/admin/file/getFileList',
  GetFileStatusByKey = '/api/admin/file/getFileStatusByKey',
  RemoveFileById = '/api/admin/file/removeFileById',
  GetTotalSize = '/api/admin/file/getTotalSize',
  GetUploadToken = '/api/admin/file/getUploadToken',
  GetFileById = '/api/admin/file/getFileById',
  // tag
  GetTagPageList = '/api/admin/tag/getPageList',
  CreateTag = '/api/admin/tag/create',
  UpdateTag = '/api/admin/tag/update',
  GetTagById = '/api/admin/tag/getById',
  ChangeTagStatus = '/api/admin/tag/changeStatus',
  // dashboard
  GetSystemDashboard = '/api/admin/dashboard/getSystemDashboard',
  // repository
  GetRepositoryPageList = '/api/admin/repository/getPageList',
  // system
  TestRequestApi = '/api/system/requestAPI/testApi',
  CreateRequestApi = '/api/system/requestAPI/create',
  UpdateRequestApi = '/api/system/requestAPI/update',
  GetRequestApiById = '/api/system/requestAPI/getById',
  GetRequestApiList = '/api/system/requestAPI/getPageList',
  AddRequestApiField = '/api/system/requestAPI/addField',
  RemoveRequestApiField = '/api/system/requestAPI/removeField',
  UpdateRequestApiField = '/api/system/requestAPI/updateField',
  AddRequestApiTestData = '/api/system/requestAPI/addTestData',
  // system api tester
  CreateApiTester = '/api/system/apiTester/create',
  GetApiTesterList = '/api/system/apiTester/getList',
  GetApiTesterPageList = '/api/system/apiTester/getPageList',
  GetApiTesterToken = '/api/system/apiTester/getToken'
}
