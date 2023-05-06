import { Link } from "react-router-dom";
const Missing = () => {
  return <main className="Missing">
    <h2>Page Not Found (404)</h2>
    <p>Well, That's disappointing.</p>
    <Link to='/'>
      Return To Homepage
    </Link>
  </main>;
};

export default Missing;
