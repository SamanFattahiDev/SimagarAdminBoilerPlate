import WebServiceRequest from '../Api/WebServiceRequest'

class TicketCreateRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
        super.setTag('Ticket/CreateTicket')
    }
    setParams(data){
        super.setRequestParamDataObj(data)
    }
}
class TicketDeleteRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setId(id){
        super.setTag('Ticket/DeleteTicket?ticketId='+id)
    }
}
class TicketGetAllByParentIdRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setId(id){
        super.setTag('Ticket/GetAllByParentId?parentId='+id)
    }
}
class TicketGetAllRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setParams(data){
        super.setTag('Ticket/GetAll?pageNumber='+data.pageNumber+'&count='+data.count+'')
    }
}
export {
    TicketCreateRequest,
    TicketDeleteRequest,
    TicketGetAllByParentIdRequest,
    TicketGetAllRequest
};
