// V 2.3
class Helper{
  static createFileAsBase64Image(fileObject , _callback){
      const reader = new FileReader();
      reader.onload = (e)=>{
        _callback(e.target.result);
      }
      reader.readAsDataURL(fileObject)
  }

  static readAsDataURL(file){
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
        resolve(fr.result.split(",")[1]);
      }
      fr.readAsDataURL(file);
    });
  }

  static openLoadingOverlay(context) {
    context.$store.commit('loadingOverlayStore/showLoadingOverlay');
  }

  static closeLoadingOverlay(context) {
    context.$store.commit('loadingOverlayStore/hideLoadingOverlay');
  }

  static showResponseModal(context , title , isWarning = false){
    context.$store.commit('responseModal/toggleResponseModal');
    context.$store.commit('responseModal/setTitle' , title);
    context.$store.commit('responseModal/setWarning' , isWarning);
    context.$store.commit('responseModal/setCallbackUrl' , callbackUrl);
  }

  static prettyPrice(price, length, decimalDelimiter, sectionDelimiter){
    let c, d, t, s, i, j;
    c = isNaN(length = Math.abs(length)) ? 2 : length;
    d = decimalDelimiter === undefined ? "," : decimalDelimiter;
    t = sectionDelimiter === undefined ? "," : sectionDelimiter;
    s = price < 0 ? "-" : "";
    i = parseInt(price = Math.abs(+price || 0).toFixed(c)) + "";
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(price - i).toFixed(c).slice(2) : "");
  }

  static showLoginModal(context , title , description) {
    context.$store.commit('LoginModal/toggleLoginModal');
    context.$store.commit('LoginModal/setTitle' , title);
    if (title !== ''){context.$toastMessage(context, description, 'error' );}
  }

  static showRefreshSearchModal(context , title , description) {
    context.$store.commit('RefreshSearchModal/toggleRefreshSearchModal');
    context.$store.commit('RefreshSearchModal/setTitle' , title);
    if (title !== ''){context.$toastMessage(context, description, 'error' );
    }
  }

  static arrayRemove(arr, value) {

    return arr.filter(function(ele){
      return ele !== value;
    });
  }

  static isAdded(array) {
    return array === param;
  }

  static  myJoin(arr, sep = ",") {
    arr = arr.map(e => [undefined, null].includes(e) ? "" : e);
    let result = "";
    arr.forEach((e, i) => result += `${i ? sep : ""}${e}`);
    return result;
  }

  static generateExcel(response) {
    const file = new Blob([response.data], {
      type: "application/vnd.ms-excel"
    });
    return { file };
  }
}
export default Helper;
