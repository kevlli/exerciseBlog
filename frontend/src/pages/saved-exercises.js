import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedExercises = () => {
  const [savedExercises, setSavedExercises] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedExercise = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/exercise/savedExercises/${userID}`
        );
        setSavedExercises(response.data.savedExercises);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedExercise();
  }, []);

  return (
    <div>
      <h1>Workout Routine</h1>
      <h3>
        {" "}
        Total Workout Duration:{" "}
        {savedExercises.reduce(
          (result, current) => result + current.duration,
          0
        )}{" "}
        minutes
      </h3>
      <ul>
        {savedExercises.map((exercise) => (
          <li key={exercise._id}>
            <div>
              <h2>{exercise.name}</h2>
            </div>
            <div className="instructions">
              <p>{exercise.instructions}</p>
            </div>
            <img src={exercise.imageUrl} alt={exercise.name} />
            <p>Duration: {exercise.duration} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
