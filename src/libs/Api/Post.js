import WebServiceRequest from '../Api/WebServiceRequest'

class PostCreateRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('Post/Create')
    }
    setParams(data){
        super.setRequestParamDataObj(data)
    }
}
class PostDeleteRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setId(id){
        super.setTag('Post/Delete?id='+id)
    }
}
class PostGetAllRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setParams(data){
        super.setTag('Post/GetAll?pageNumber='+data.pageNumber+'&count='+data.count)
    }
}
class PostGetRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setId(id){
        super.setTag('Post/Get?postId='+id)
    }
}
class PostUpdateRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('Post/Update')
    }
    setParams(data){
        super.setRequestParamDataObj(data)
    }
}
class PostCommentGetByPostIdRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setId(id){
        super.setTag('PostComment/GetByPostId?postId='+id)
    }
}
class PostCommentDeleteRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setId(id){
        super.setTag('PostComment/Delete?id='+id)
    }
}
export {
    PostCreateRequest,
    PostDeleteRequest,
    PostGetAllRequest,
    PostGetRequest,
    PostUpdateRequest,
    PostCommentGetByPostIdRequest,
    PostCommentDeleteRequest
};
