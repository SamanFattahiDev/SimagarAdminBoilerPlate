import WebServiceRequest from '../Api/WebServiceRequest'

class WalletGetAllRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setParams(data){
        super.setTag('Wallet/GetAll?pageNumber='+data.pageNumber+'&count='+data.count+'&searchCommand='+data.search)
    }
}
class WalletGetByUserIdRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setUserId(id){
        super.setTag('Wallet/GetByUserId?userId='+id)
    }
}
class WalletUpdateRequest extends WebServiceRequest {
    constructor (context) {
        super(context)
    }
    setParams(data){
        super.setTag('Wallet/updateWallet?credit='+data.credit+'&userId='+data.userId+'')
    }
}
export {
    WalletGetAllRequest,
    WalletGetByUserIdRequest,
    WalletUpdateRequest
};
