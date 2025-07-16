import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Subtask from "../components/Subtask";
import SubtaskForm from "../components/SubtaskForm";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
// import "./Mindmap.css";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 프로젝트 불러오기
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

  // 초기 노드 & 엣지 세팅
  useEffect(() => {
    if (project) {
      const CENTER_NODE_ID =  "center";

      const initialNodes = [
        {
          id: CENTER_NODE_ID,
          type: "default",
          data: { label: project.title, page: "/center" },
          position: { x: 300, y: 200 },
          draggable: false,
          className: "my-node center-node",
        },
        {
          id: "1",
          type: "default",
          data: { label: "Node 1" },
          position: { x: 100, y: 100 },
          className: "my-node",
        },
        {
          id: "2",
          type: "default",
          data: { label: "Node 2" },
          position: { x: 500, y: 100 },
          className: "my-node",
        },
      ];

      const initialEdges = [
        {
          id: "e-center-1",
          source: CENTER_NODE_ID,
          target: "1",
        },
        {
          id: "e-center-2",
          source: CENTER_NODE_ID,
          target: "2",
        },
      ];

      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [project, setNodes, setEdges]);

  const updateProjectInStorage = (updatedProject) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProjects = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const onNodeClick = useCallback(
    (event, node) => {
      if (node.id !== (project?.title || "center")) {
        navigate(`/page/${node.id}`);
      } else {
        alert("페이지 정보가 없습니다.");
      }
    },
    [navigate, project]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddSubtask = (newSubtask) => {
    const updated = {
      ...project,
      subtasks: [...(project.subtasks || []), { id: Date.now(), ...newSubtask }],
    };
    setProject(updated);
    updateProjectInStorage(updated);
    setShowForm(false);
  };

  const handleAddNode = () => {
    const newId = (nodes.length + 1).toString();

    const newNode = {
      id: newId,
      type: "default",
      data: { label: project.subtasks.title},
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
      className: "my-node",
    };

    const newEdge = {
      id: `e-center-${newId}`,
      source: project?.title || "center",
      target: newId,
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>
      <h1>{project.title}</h1>
      <h2>마감일: {project.deadline}</h2>
      <h2>{project.progress}%</h2>
      <button onClick={() => 
        setShowForm(true)}>노드 추가</button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      />

      {showForm && (
        <SubtaskForm
          onSubmit={handleAddSubtask}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Detail;