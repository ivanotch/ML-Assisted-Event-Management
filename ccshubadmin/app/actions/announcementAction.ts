// feedbackActions.ts
'use server'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function deleteAnnouncement(id: string) {
    await deleteDoc(doc(db, 'announcement', id))
}