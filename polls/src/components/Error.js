import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div text-align='center'>
      <h1>404 - Not Found</h1>
      <p>The page does not exist</p>
      <button onClick={handleClick}>Back to Home</button>
    </div>
  );
}

export default ErrorPage;
