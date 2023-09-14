import './App.css';
import { useState } from 'react'
import api from './services/api'

function App() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!cpf || !password) {
      alert("Cpf ou Senha invalidos");
      return;
    }
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic YXBwLXUyZC1waXg6NDE1NzgyQFUyZA==',
        'User-Id': cpf
      }
      console.log(headers);
      const body = {
        grant_type: 'password',
        client: 'app-u2d-pix',
        username: cpf,
        password: password
      }
      console.log(body);
      const response = await api.post('/oauth/token', body, {headers: headers})
      console.log(response.data);
    } catch (error) {
      alert("Ops erro ao buscar token");
      setCpf('');
      setPassword('');
    }
    
  }
  return (
    <div className="container">
      <div className="container-login">
        <form className="form-login">

          <div className="input-cpf">
            <input 
            type="text" 
            value={cpf} 
            placeholder="Digite seu CPF..."
            onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className='input-password'>
            <input 
            type="password" 
            value={password} 
            placeholder="Digite sua Senha..."
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button-login">
            <button onClick={handleLogin}>Login</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default App;
