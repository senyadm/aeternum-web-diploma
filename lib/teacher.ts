export default function isTeacher(userId?: string | null) {
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID
}
