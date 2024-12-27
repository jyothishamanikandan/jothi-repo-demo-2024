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
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getDynamicContent();
  }

  // Api fetching 
  getDynamicContent() {
    console.log("inside code");
    this.apiService.fetchDynamicContent().subscribe({
      next: (data) => {
        console.log('Fetched data:', data);  // Log the fetched data to the console
        // Map the response data to the Service model
        this.services = data.map((item: any) => new Service(item.name, item.description));
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


}
