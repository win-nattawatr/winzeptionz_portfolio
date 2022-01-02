import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Home } from 'src/app/models/home.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() contactData?: Contact;
  @Input() homeData?: Home;

  constructor() {}

  ngOnInit(): void {}
}
