import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const CreateExercise = () => {
  const userID = useGetUserID();
  const [exercise, setExercise] = useState({
    name: "",
    equipment: [],
    instructions: "",
    imageUrl: "",
    duration: 0,
    creator: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExercise({ ...exercise, [name]: value });
  };

  const addEquipment = () => {
    setExercise({ ...exercise, equipment: [...exercise.equipment, ""] });
  };

  const handleEquipmentChange = (event, idx) => {
    const { value } = event.target;
    const equipment = exercise.equipment;
    equipment[idx] = value;
    setExercise({ ...exercise, equipment });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.post("http://localhost:3001/exercise", exercise);
      console.log(resp);
      alert("Exercise added!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-exercise">
      <h2>Create Exercise</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="equipment">Equipment</label>
        {exercise.equipment.map((equipment, idx) => (
          <input
            key={idx}
            type="text"
            name="equipment"
            value={equipment}
            onChange={(event) => handleEquipmentChange(event, idx)}
          />
        ))}
        <button onClick={addEquipment} type="button">
          Add Equipment
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="duration">Duration (seconds)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          onChange={handleChange}
        />
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};
