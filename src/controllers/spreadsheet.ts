import { Connection } from "typeorm";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { Registered } from "../db/entity/registered";

/**
 * Connect to the GoogleSheet document
 */
const getSheet = async (): Promise<any> => {
  console.log("Getting the GoogleSpreadsheet");
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

  console.log("Authing");
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEET_PRIVATE_KEY,
  });

  console.log("Loading doc info");
  await doc.loadInfo();
  console.log("Loaded doc info success");
  return doc;
};

/**
 * Get all registrations from DB
 * @param connection Active DB connection
 */
const getRegistrations = async (connection: Connection): Promise<Registered[]> => {
  return await connection.manager.find(Registered);
};

/**
 * Main handler for fetching Registered info from DB and updating GoogleSheet
 */
export default async (connection: Connection): Promise<boolean> => {
  console.log("Starting to update GoogleSheet");
  console.log(JSON.stringify(process.env));

  // Load all deps in async, entries from DB and GoogleSheet info
  const [registrations, doc]: [Registered[], any] = await Promise.all([getRegistrations(connection), getSheet()]);

  // First sheet is going to be "latest"
  const sheet = doc.sheetsByIndex[0];

  // Store the current headers for when we overwrite the sheet
  await sheet.loadHeaderRow();
  const headers = sheet.headerValues;

  // Convert all Registered rows into GoogleSheet rows
  const rowsToAdd = [];

  for (let r of registrations) {
    const attending = r.attending ? 1 : 0;
    for (let user of r.users) {
      const { rsvpUser } = r;
      rowsToAdd.push({
        ID: r._id,
        Name: user.name,
        Attending: attending,
        "Registered By": `${rsvpUser.firstName} ${rsvpUser.lastName}`,
        Message: r.message,
        Timestamp: new Date(r.timestamp).toLocaleString("en-US", { timeZone: "America/Chicago" }),
      });
    }
  }

  console.log(`Rows adding to GoogleSheet ${JSON.stringify(rowsToAdd)}`);

  // Commit changes to the GoogleSheet with a full wipe+update
  await sheet.clear();
  await sheet.setHeaderRow(headers);
  await sheet.addRows(rowsToAdd);
  console.log("Success updating GoogleSheet");
  return true;
};
