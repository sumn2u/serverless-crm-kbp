import * as moment from "moment";

export function buildHelperMessage(user, fbName) {
  const {
    user_metadata: {
      name,
      address,
      agent,
      lastPurchaseDate,
      lastPurchaseAmount,
      accountBalance,
      created,
    },
  } = user;

  const list = [
    "שם פייסבוק: " + fbName,
    "שם במערכת: " + name,
    "כתובת: " + address,
    "מדריך: " + agent,
    "תאריך קנייה אחרונה: " + moment(lastPurchaseDate).format("DD/MM/YYYY"),
    "סכום קנייה אחרונה: " + lastPurchaseAmount,
    "מאזן חוב: " + accountBalance,
    "תאריך הצטרפות: " + moment(created).format("DD/MM/YYYY"),
  ];

  return `
   ${list[0]}
   ${list[1]}  
   ${list[2]}  
   ${list[3]}  
   ${list[4]}  
   ${list[5]}  
   ${list[6]}  
   ${list[7]}  
  `;
}
