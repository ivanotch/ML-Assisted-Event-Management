import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

export async function POST(req: NextRequest) {
    try {
        const { email, password, role, name } = await req.json();

        // 1. Create Auth user
        const user = await admin.auth().createUser({
            email,
            password,
        });

        // 2. Set admin claim if needed
        if (role === "admin") {
            await admin.auth().setCustomUserClaims(user.uid, {
                role: role, 
            });
        }

        return NextResponse.json({ uid: user.uid });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}