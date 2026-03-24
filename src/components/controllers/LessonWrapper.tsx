import { useParams } from "react-router-dom";
import LessonPlayer from "../pages/dashboard/LessonPlayer";

export default function LessonWrapper() {
  const { id } = useParams();

  if (!id) return <div>Invalid Package</div>;

  return <LessonPlayer packageId={id} />;
}