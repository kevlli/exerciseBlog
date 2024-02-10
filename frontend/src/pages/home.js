import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [exercises, setExercises] = useState([]);

  const [savedExercises, setSavedExercises] = useState([]);

  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get("http://localhost:3001/exercise");
        setExercises(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedExercise = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/exercise/savedExercises/ids/${userID}`
        );
        setSavedExercises(response.data.savedExercises);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExercise();

    if (cookies.access_token) fetchSavedExercise();
  }, []);

  const saveExercise = async (exerciseID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/exercise",
        {
          exerciseID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedExercises(response.data.savedExercises);
    } catch (err) {
      console.error(err);
    }
  };

  const isExerciseSaved = (id) => savedExercises.includes(id);

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            <div>
              <h2>{exercise.name}</h2>
              <button
                onClick={() => saveExercise(exercise._id)}
                disabled={isExerciseSaved(exercise._id)}
              >
                {isExerciseSaved(exercise._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{exercise.instructions}</p>
            </div>
            <img src={exercise.imageUrl} alt={exercise.name} />
            <p>Duration: {exercise.duration} seconds</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
