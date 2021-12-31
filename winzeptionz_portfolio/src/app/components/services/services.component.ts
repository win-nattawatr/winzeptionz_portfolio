import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Services } from 'src/app/models/services.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  servicesData?: Services;
  activeModalIndex: number;
  constructor(private servicesService: ServicesService) {
    this.activeModalIndex = -1;
  }

  ngOnInit(): void {
    this.servicesService
      .getServicesData()
      .pipe(map((services) => services.pop()))
      .subscribe((serviceData) => {
        this.servicesData = serviceData;
      });
  }

  activeModal(modalIndex: number) {
    this.activeModalIndex = modalIndex;
  }

  closeModal() {
    this.activeModalIndex = -1;
  }
}
