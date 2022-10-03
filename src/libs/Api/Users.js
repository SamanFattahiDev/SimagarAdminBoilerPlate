import WebServiceRequest from '../Api/WebServiceRequest'

class UsersChangeUserRoleRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setParams(data){
        super.setTag('Users/ChangeUserRole?userId='+data.userId+'&UserTypeId='+data.UserTypeId)
    }
}
class UserCreateRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('Users/Create')
    }
    setParams(data){
        super.setRequestParamDataObj(data)
    }
}
class UsersGetAllRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setParams(data){
        super.setTag('Users/GetAll?search='+data.search+'&pageNumber='+data.pageNumber+'&count='+data.count+'&state='+data.state+'');
    }
}
class UsersGeByTokenRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('Users/GetByToken')
    }

}
class UsersUpdateByAdminRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('Users/UpdateUserByAdmin')
    }
    setParams(data){
        super.setRequestParamDataObj(data)
    }
}
class UserTypeGetAllRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('UserType/GetAll')
    }
}
class UsersGetRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setUserId(id){
        super.setTag('Users/Get?id='+id)
    }
}
export {
    UsersChangeUserRoleRequest,
    UserCreateRequest,
    UsersGetAllRequest,
    UsersGeByTokenRequest,
    UsersUpdateByAdminRequest,
    UserTypeGetAllRequest,
    UsersGetRequest
};
