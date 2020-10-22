import React, {FunctionComponent, useState} from 'react';

interface IProps {
  onSignin: (userName: string, pwd: string) => void;
}

export const Login:FunctionComponent<IProps> = ({onSignin}) => {
  const [userName, setUserName] = useState("dan@mycompany.com");
  const [password, setPassword] = useState("123");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSignin(userName, password)
  }

  return (

  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>User Name:</label>
      <input className="form-control" type="text"  
               value={userName} 
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} />
    </div>
    <div className="form-group">
    <label>Password:
        <input className="form-control" type="text" 
                value={password} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

      </label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  );
}

export default Login;