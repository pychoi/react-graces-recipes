import firebase from 'firebase';
import { config } from '../config/constants';

export function login(email, pw) {
  return firebase.auth().signInWithEmailAndPassword(email, pw);
}

export function logout() {
  return firebase.auth().signOut();
}
