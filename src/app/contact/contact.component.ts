import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary Angular classes
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  successMessage: string | null = null;
  showMessage = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form group with validations
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],  // Field is required
      email: ['', [Validators.required, Validators.email]],  // Field is required and should be a valid email
      message: ['', [Validators.required]],  // Field is required
    });
  }

  // Submit handler
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);  // Here we can send the form data to an API
      // Simulate form submission (e.g., send data to API)
      // Here we'll just display a success message
      this.sendEmail(this.contactForm.value); // Pass the entire form value object
      this.successMessage = 'Your message has been sent successfully!';

      // reset the form after submission
      this.contactForm.reset();
      this.showMessage = true;

    } else {
      console.log('Form is invalid');
    }
  }

  close(): void {
    this.showMessage = false; // Close modal
  }

  // Update sendEmail method to accept the full form data
  sendEmail(formData: { email: string, name: string, message: string }) {
    const templateParams = {
      to_email: formData.email, // Receiver's email
      reply_to: formData.email,
      subject: 'Confirmation Mail From My Business', // Email subject
      message: `

      Name :  ${formData.name}
      Email : ${formData.email}
      Message :  ${formData.message}
  
    `,
    };

    emailjs
      .send('service_r3vzupu', 'template_fmyu8vt', templateParams, 'pDY4-8vyeh_IAsPng')
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.error('Failed to send email:', error);
        }
      );
  }
}
