import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isMenuOpen: boolean = false;

  // Toggle the menu visibility
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
