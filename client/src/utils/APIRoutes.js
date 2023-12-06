export const { baseURL } = require("./config.json");

// Auth
export const loginRoute = `${baseURL}/login`;

export const logoutRoute = `${baseURL}/logout`;

export const ChangePasswordRoute = `${baseURL}/login/changepass`;

export const imageRoute = `${baseURL}/login/getimage`;

export const getType = `${baseURL}/gettype`;

export const refreshRoute = `${baseURL}/login/refreshtoken`;

// Dashboard
export const amCardsRoute = `${baseURL}/dashboard/amcards`;
export const graphsRoute = `${baseURL}/dashboard/amgraphs`;
export const topCompaniesRoute = `${baseURL}/dashboard/amtable`;
export const topCoursesRoute = `${baseURL}/dashboard/topcourses`;

export const CollabDashboard = `${baseURL}/dashboard/collab`;

// Societe Dashboard
export const SocCardsRoute = `${baseURL}/dashboard/soccards`;
export const graphsSocRoute = `${baseURL}/dashboard/socgraph`;
export const quotaSocRoute = `${baseURL}/dashboard/socquota`;
export const topCollabRoute = `${baseURL}/dashboard/soccollab`;
export const topChallengesRoute = `${baseURL}/dashboard/topcourses`;

// Companies
export const registerRoute = `${baseURL}/register`;
export const allCompaniesRoute = `${baseURL}/societe/browse`;
export const addCollabRouteAdmin = `${baseURL}/societe/addcollabadmin`;
export const restoreSocialRoute = `${baseURL}/societe/restore`;

// Partners
export const allPartnersRoute = `${baseURL}/provider/browse`;
export const addPartnersRoute = `${baseURL}/provider/add`;

// Cours
export const allCoursesRoute = `${baseURL}/cours/browse`;
export const CoursesCatalogue = `${baseURL}/cours/catalogue`;
export const addCoursesRoute = `${baseURL}/cours/add`;
export const allCompanyCoursesRoute = `${baseURL}/cours/browsesoc`;
export const CoursesDetailsRoute = `${baseURL}/cours/detail`;
export const CoursesDetailsSocRoute = `${baseURL}/cours/detailsoc`;

// Sessions
export const allSessionsRoute = `${baseURL}/session/browse`;
export const addSessionsRoute = `${baseURL}/session/add`;
export const addSessionsAdminRoute = `${baseURL}/session/addam`;
export const SessionsofSociete = `${baseURL}/session/browsesoc`;
export const AllSessionsAdminRoute = `${baseURL}/session/browseam`;
export const AllSessionsCollabRoute = `${baseURL}/session/browsecollab`;
export const AllSessionsCollabNotEnrolledRoute = `${baseURL}/session/sessionout`;

// Quota
export const AllQuotaRoute = `${baseURL}/quota/browse`;
export const AllQuotaSocRoute = `${baseURL}/quota/browsesoc`;
export const AddQuotaRoute = `${baseURL}/quota/add`;

// Departments
export const allDepartmentsRoute = `${baseURL}/societe/browsedepts`;
export const addDepartementRoute = `${baseURL}/dept/add`;
export const addDepartementAdminRoute = `${baseURL}/dept/adminadd`;
export const allDepartmentsAdminRoute = `${baseURL}/dept/browsedeptsam`;

//DeleteInstances
export const DeleteInstances = `${baseURL}/delete`;

// Requests
export const allRequestsRoute = `${baseURL}/societe/browserequests`;
export const AcceptRequestRoute = `${baseURL}/collab/addsession`;
export const RefuseRequestRoute = `${baseURL}/collab/refuse`;
export const browseCollabRequests = `${baseURL}/collab/requests`;
export const allRequestsCollabRoute = `${baseURL}/collab/requests`;

//Upload images
export const uploadRoute = `${baseURL}/upload`;

// Session Details
export const SessionGraph = `${baseURL}/session/graph`;
export const SessionCollabRoute = `${baseURL}/session/collab`;

//Collabs
export const addManyCollabsRoute = `${baseURL}/societe/addcollabs`;
export const addCollabsRoute = `${baseURL}/societe/addcollab`;
export const browseCollabsRoute = `${baseURL}/collab/browse`;
export const browseCollabsOutOfSessionRoute = `${baseURL}/collab/browseout`;
export const browseCollabsAdminRoute = `${baseURL}/collab/browseadmin`;
export const addCollabsSessionRoute = `${baseURL}/collab/addsession`;
export const sendRequestRoute = `${baseURL}/collab/sendrequest`;
export const getCollabroute = `${baseURL}/collab/get`;
// proofs
export const acceptProofRoute = `${baseURL}/proof/accept`;
export const refuseProofRoute = `${baseURL}/proof/refuse`;
export const setProofRoute = `${baseURL}/proof/set`;

//Vouchers
export const browseVouchersAdminRoute = `${baseURL}/voucher/browseAdmin`;
export const browseVouchersSocRoute = `${baseURL}/voucher/browseSoc`;
export const browseVouchersCollabRoute = `${baseURL}/voucher/browseCol`;
export const addVouchersAdminRoute = `${baseURL}/voucher/add`;
export const asignOneVoucherRoute = `${baseURL}/voucher/assign`;
export const asignVoucherSessionRoute = `${baseURL}/voucher/assignall`;

// Notifs
export const addNotifRoute = `${baseURL}/notifs/add`;
export const getNotifsSocRoute = `${baseURL}/notifs/browsesoc`;
export const getNotifsCollabRoute = `${baseURL}/notifs/browsecollab`;
export const marknoptifReadRoute = `${baseURL}/notifs/readonenotif`;
export const markallnoptifReadRoute = `${baseURL}/notifs/readallnotifsoc`;

// Profile
export const getProfileRoute = `${baseURL}/profile/`;
export const updateProfileRoute = `${baseURL}/profile/update`;
export const validatepasswordRoute = `${baseURL}/profile/validatepassword`;

// Emails
export const sendEmailRoute = `${baseURL}/email/send`;
