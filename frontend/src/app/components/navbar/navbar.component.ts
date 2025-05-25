import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../lib/auth/firebase';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public loggedIn: boolean = false;
  public user: any;

  ngOnInit() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        this.loggedIn = true;
        this.user = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
      } else {
        this.loggedIn = false;
      }
    });
  }

  logout() {
    firebaseAuth.signOut().then(() => {
      this.loggedIn = false;
      this.user = null;
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  }
}
