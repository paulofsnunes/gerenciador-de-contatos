import Logo from '../../assets/img/ipmlogo.png'
import './style.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="info">
        <p>Criado em Abril de 2023</p>
        <img className="logo" src={Logo} alt="Logo da IPM"/>
      </div>
    </footer>
  )
}

export default Footer;