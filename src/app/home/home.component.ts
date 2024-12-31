import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Service } from './.././service.model'; // Import the model

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  content: string | null = null;
  services: Service[] = [];
  isModalOpen = false;
  selectedService: any = null;
  greetingMessage!: string;
  //greetingMessage: string = 'Explore our amazing products!';
  dynamicBackgroundColor: string = '#ffffff'; // Default color
  products = [
    { name: 'Product 1', description: 'This is a great product', image: 'https://via.placeholder.com/250' },
    { name: 'Product 2', description: 'Another fantastic product', image: 'https://via.placeholder.com/250' },
    { name: 'Product 3', description: 'You will love this one', image: 'https://via.placeholder.com/250' },
    { name: 'Product 4', description: 'Best in class product', image: 'https://via.placeholder.com/250' }
  ];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.setGreetingMessage();
    this.getDynamicContent();
  }

  // Api fetching 
  getDynamicContent() {
    console.log("inside code");
    this.apiService.fetchDynamicContent().subscribe({
      next: (data) => {
        console.log('Fetched data:', data);  // Log the fetched data to the console
        // Map the response data to the Service model
        this.services = data.map((item: any) => new Service(item.name, item.description,item.id,item.features));
      },
      error: () => {
        // Handle error if needed
        console.error('Error fetching data');
      }
    });
  }
  
  
  navigateToHome() {
    this.router.navigate(['/contact']); 
  }
  
  openModal(service: any): void {
    this.isModalOpen = true;
    this.selectedService = service;
  }

  closeModal(event?: Event): void {
    this.isModalOpen = false;
    this.selectedService = null;
  }

  setGreetingMessage(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greetingMessage = 'Good Morning!';
    } else if (hour < 18) {
      this.greetingMessage = 'Good Afternoon!';
    } else {
      this.greetingMessage = 'Good Evening!';
    }
  }
  trackMouse(event: MouseEvent): void {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
  
    // Calculate color based on mouse position, ensuring a smoother transition
    const r = Math.floor((mouseX / window.innerWidth) * 150 + 100); // Ranges from 100 to 255 for lighter color
    const g = Math.floor((mouseY / window.innerHeight) * 150 + 100); // Ranges from 100 to 255 for lighter color
    const b = Math.floor(((mouseX + mouseY) / (window.innerWidth + window.innerHeight)) * 150 + 100); // Ranges from 100 to 255 for smoother color
  
    // Update the dynamic background color
    this.dynamicBackgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
  
}
