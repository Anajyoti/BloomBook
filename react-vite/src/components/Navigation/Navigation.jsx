import { NavLink } from "react-router-dom";
//import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  //const user = useSelector((store)=> store.session.user);

  return (
    <div className="wrapper">
      <div className="nav-link-area">
      <NavLink to="/">Home</NavLink>
        <div><ProfileButton /></div>
      </div>

    </div>
  );
}

export default Navigation;

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>

//       <li>
//         <ProfileButton />
//       </li>
//     </ul>
//   );
// }

// export default Navigation;
