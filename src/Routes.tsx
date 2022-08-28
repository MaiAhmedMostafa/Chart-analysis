import { BrowserRouter, Routes, Route } from "react-router-dom";
import LessonsContainer from "components/lessons/LessonsContainer";
import LessonsForm from "components/lessons/lessonForm/LessonForm";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LessonsContainer />} />
        <Route path="/details" element={<LessonsForm />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesContainer;
