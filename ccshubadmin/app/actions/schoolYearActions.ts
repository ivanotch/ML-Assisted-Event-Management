import {getDocs, collection} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { SchoolYears } from '@/types/schoolyears'

export async function getAllSchoolYear() {
    const snapshot = await getDocs(collection(db, "school_year"))

    const school_years: SchoolYears[] = snapshot.docs.map(doc => {
        const data = doc.data()

        return {
            id: doc.id,
            start_year: data.start_year,
            end_year: data.end_year,
            is_active: data.is_active
        }
    })

  return school_years
}