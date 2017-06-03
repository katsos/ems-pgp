import LogoutButton from "../../LogoutButton";

export default function DrawerUser(props) {
  return (
    <div className="drawer-user">
      <img className="drawer-user__photo" src={window.user.picture}/>
      <span className="drawer-user__email mdl-color-text--grey-600">{window.user.email}</span>
      <button className="drawer-user__logout mdl-button mdl-js-button mdl-button--raised">
        <LogoutButton>Logout</LogoutButton>
      </button>
    </div>
  )
}
