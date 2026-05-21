import { auth, db } from "../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    doc,
    getDoc,
} from "firebase/firestore";
import {Section} from '../../src/types/section'
import {User, Student} from '../../src/types/user'

export const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export interface LoggedUserData {
    user: User | null;
    student?: Student | null;
    section?: Section | null;
}


export const getLoggedUser = async (): Promise<LoggedUserData | null> => {
    try {
        // current logged in auth user
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.log("No logged in user");
            return null;
        }

        const uid = currentUser.uid;

        // fetch user document
        const userRef = doc(db, "user", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            console.log("User document not found");
            return null;
        }

        const userData = {
            id: userSnap.id,
            ...userSnap.data(),
        } as User;

        // result object
        const result: LoggedUserData = {
            user: userData,
        };

        // if student, fetch student info
        if (userData.type === "student") {

            const studentRef = doc(db, "students", uid);
            const studentSnap = await getDoc(studentRef);

            if (studentSnap.exists()) {

                const studentData = {
                    id: studentSnap.id,
                    ...studentSnap.data(),
                } as Student;

                result.student = studentData;

                // fetch section using section_id
                if (studentData.section_id) {

                    const sectionRef = doc(
                        db,
                        "sections",
                        studentData.section_id
                    );

                    const sectionSnap = await getDoc(sectionRef);

                    if (sectionSnap.exists()) {

                        const sectionData = {
                            id: sectionSnap.id,
                            ...sectionSnap.data(),
                        } as Section;

                        result.section = sectionData;
                    }
                }
            }
        }

        return result;

    } catch (error) {
        console.error("Error fetching logged user:", error);
        return null;
    }
};