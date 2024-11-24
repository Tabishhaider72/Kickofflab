// components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.navLink}>
        <button style={styles.button}>Login</button>
      </Link>
      <Link to="/register" style={styles.navLink}>
        <button style={styles.button}>Register</button>
      </Link>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    gap: '10px',
    padding: '10px 20px',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  navLink: {
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#04AA6D',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Navbar;
