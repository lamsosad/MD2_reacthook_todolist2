import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
let idEdit;
function App() {
  const [tasks, setTasks] = useState([
    { id: 1, task: "đi học", isComplete: false },
    { id: 2, task: "làm bài tập", isComplete: false },
    { id: 3, task: "đi đá bóng", isComplete: false },
    { id: 4, task: "chơi đàn guitar", isComplete: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  //Thêm mới
  const addTask = () => {
    setTasks((preTasks) => {
      const newId = preTasks[preTasks.length - 1].id + 1; // truy cập phần tử thư i của mảng  arr[i]
      return [
        ...preTasks,
        {
          id: newId,
          task: newTask,
          isComplete: false,
        },
      ];
    });
    setNewTask("");
  };

  //Xoá
  const deleteTask = (idDel) => {
    const newTasks = tasks.filter((current) => current.id !== idDel);
    setTasks(newTasks);
  };
  //Sửa
  const editTask = (taskUpdate, idEdit) => {
    let updateArr = [];
    tasks.forEach((current) => {
      if (current.id === idEdit) {
        updateArr.push({ id: idEdit, task: taskUpdate, isComplete: false });
      } else {
        updateArr.push(current);
      }
    });
    setTasks(updateArr);
    setNewTask("");
    setEditStatus(false);
  };
  const completeTask = (idEdit) => {
    let updateArr = [];
    tasks.forEach((current) => {
      if (current.id === idEdit) {
        updateArr.push({ id: idEdit, task: current.task, isComplete: true });
      } else {
        updateArr.push(current);
      }
    });
    setTasks(updateArr);
    setNewTask("");
    setEditStatus(false);
  };
  const handleEdit = (idE, taskEdit) => {
    idEdit = idE;
    setEditStatus(true);
    setNewTask(taskEdit);
  };
  const btn = editStatus ? (
    <button
      type="button"
      className="btn btn-warning mx-3"
      onClick={() => editTask(newTask, idEdit)}
    >
      Update
    </button>
  ) : (
    <button type="button" className="btn btn-primary mx-3" onClick={addTask}>
      Add
    </button>
  );

  return (
    <div className="App my-4">
      <div>
        <input
          type="text"
          value={newTask}
          placeholder="nhập task mới"
          onChange={(e) => setNewTask(e.target.value)}
        />
        {btn}
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Status</th>
            <th colspan="3">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((current) => (
            <tr key={current.id}>
              <td>{current.id}</td>
              <td>{current.task}</td>
              <td>
                {current.isComplete ? (
                  <i class="bi bi-check2"></i>
                ) : (
                  <i class="bi bi-hourglass-bottom"></i>
                )}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(current.id, current.task)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(current.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => completeTask(current.id)}
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;