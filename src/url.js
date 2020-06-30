const baseurl="http://localhost/OTHER/thinkbridge_api/public/api"
//const baseurl="https://infinite-brushlands-79097.herokuapp.com/api"
export const TAG="WEB";
export const USERID=localStorage.getItem('user_id')==null?0:localStorage.getItem('user_id');
export const LOGIN=baseurl+"/login";
export const REGISTER=baseurl+"/register";
export const LOGOUT=baseurl+"/logout";
export const CREATERECRUITER=baseurl+"/createRecruiter";
export const GETJOBCATEGORY=baseurl+"/getJobcategory";
export const AUTHENTICATERECRUITER=baseurl+"/authenticate_recruiter";
export const GETRECRUITERJOBS=baseurl+"/getRecruiterJobs";
export const GETALLJOBSBEFORE=baseurl+"/getAllJobsBeforeLogin";
export const GETALLJOBSAFTER=baseurl+"/getAllJobsAfterLogin";
export const CREATEJOB=baseurl+"/createJob";
export const APPLYJOB=baseurl+"/applyJob";
export const GETRECRUITERAPPLICATIONSTATUS=baseurl+"/jobById";


export const CREATEINVENTORY=baseurl+"/createInventory"
export const GETINVENTORYLIST=baseurl+"/getInventoryList"
export const GETORDELETEDATA=baseurl+"/getDeleteData"

export const HEADER = {
      headers: {
       'Content-Type': 'application/json;charset=UTF-8',
       'Accept':'application/json',
       'Authorization':"Bearer " + localStorage.getItem('thinkbridge_token'),
      }
      };