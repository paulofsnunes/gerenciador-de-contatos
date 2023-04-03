import Logo from '../../assets/img/ipmlogo.png'
import './style.css'

const Header = () => {
  return (
    <header className="header">
      <div>
        <img src={Logo} alt="Logo da IPM"/>
      </div>
    </header>
  )
}

export default Header;