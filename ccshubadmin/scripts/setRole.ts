import admin from "../lib/firebaseAdmin";

async function setRole(email: string, role: string) {
  const user = await admin.auth().getUserByEmail(email);

  await admin.auth().setCustomUserClaims(user.uid, {
    role: role,
  });

  console.log(`${email} is now ${role}`);
}

setRole("studentcommittee@gmail.com", "student_committee");
// npx tsx --env-file=.env.local scripts/setRole.ts