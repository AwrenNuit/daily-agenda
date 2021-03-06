import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonButton, IonLabel, IonInput, IonItem } from '@ionic/react';
import { withRouter, useHistory } from 'react-router';
import './LoginPage.css';
import { loginUser, getCurrentUser } from '../firebase';
import { toast } from './toast';
import { useDispatch } from 'react-redux';

const LoginPage: React.FC = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    getCurrentUser().then((user: any) => {      
      if(user){
        history.push('/home'); // Why does url update, but component does not render?
      }
    });
  }, [history]);

  async function handleLogin(e: any){
    e.preventDefault();
    const res: any = await loginUser(email, password);
    if(res.user.email){
      dispatch({type: `SET_USER`, payload: res.user.email});
      history.push('/home');
    }
    else {
      toast('Email or Password incorrect. Did you sign up?');
    }
  }

  return(
    <div className="login-container">
      <IonCard>
        <div className="login-card-container">
          <IonCardHeader style={{fontSize:"1.5em",color:"#FECC27"}}>Log In</IonCardHeader>
          <form onSubmit={(e: any)=>handleLogin(e)}>
            <div className="login-input">
              <IonItem>
                <IonLabel className="login-label" position="floating">Email </IonLabel>
                <IonInput value={email} onIonChange={(e: any)=>setEmail(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel className="login-label" position="floating">Password </IonLabel>
                <IonInput 
                  type="password" 
                  value={password} 
                  onIonChange={(e: any)=>setPassword(e.target.value)} 
                />
              </IonItem>
            </div>
            <IonButton type="submit" style={{margin:"30px"}}>Login</IonButton>
          </form>
          <div>
            <IonButton 
              color="medium" 
              style={{marginBottom:"10px"}}
              onClick={()=>history.push('/register')}>register</IonButton>
          </div>
        </div>
      </IonCard>
    </div>
  );
};

export default withRouter(LoginPage);