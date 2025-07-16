import { useState } from "react";
import EditSubtaskForm from "./EditSubtaskForm";

function Subtask({
  subtask, //subtask 객체 props
  onDeleteSubtask, //삭제 함수 props
  onEditSubtask, //수정 함수 props
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="subtask-card">
      <h1>{subtask.title}</h1>
      <p>마감일: {subtask.deadline}</p>
      <p>진행도: {subtask.progress}%</p>

      <button onClick={() => setShowEditForm(true)}>수정</button>
      <button onClick={() => onDeleteSubtask(subtask.id)}>삭제</button>

      {showEditForm && (
        <EditSubtaskForm
          subtask={subtask} //Edit할 때, 객체 / 콜백 정보 / 폼 닫기 위한 정보 보내줌
          onSubmit={onEditSubtask}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}

export default Subtask;