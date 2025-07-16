// pages/SubtasksPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Subtask from "../components/Subtask";

function SubtasksPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const found = projects.find((p) => String(p.id) === id);
    if (found) {
      setProject(found);
    } else {
      alert("프로젝트를 찾을 수 없습니다.");
      navigate("/home");
    }
  }, [id, navigate]);

  const updateProjectInStorage = (updatedProject) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProjects = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const editSubtask = (updatedSubtask) => {
    const updated = {
      ...project,
      subtasks: project.subtasks.map((s) =>
        s.id === updatedSubtask.id ? updatedSubtask : s
      ),
    };
    setProject(updated);
    updateProjectInStorage(updated);
  };

  const deleteSubtask = (subtaskId) => {
    const updated = {
      ...project,
      subtasks: project.subtasks.filter((s) => s.id !== subtaskId),
    };
    setProject(updated);
    updateProjectInStorage(updated);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>
      <h1>{project.title} - 세부 세부 페이지</h1>
      <ul>
        {project.subtasks?.map((subtask) => (
          <Subtask
            key={subtask.id}
            subtask={subtask}
            onDeleteSubtask={deleteSubtask}
            onEditSubtask={editSubtask}
          />
        ))}
      </ul>
    </div>
  );
}

export default SubtasksPage;