import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HomeService } from './services/home.service';
import { AboutService } from './services/about.service';
import { SkillsService } from './services/skills.service';
import { QualificationComponent } from './components/qualification/qualification.component';
import { QualificationService } from './services/qualification.service';
import { ServicesComponent } from './components/services/services.component';
import { ServicesService } from './services/services.service';
import { AppRoutingModule } from './app-routing.module';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioService } from './services/portfolio.service';
import { ContactComponent } from './components/contact/contact.component';
import { ContactService } from './services/contact.service';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './main/main.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    QualificationComponent,
    ServicesComponent,
    PortfolioComponent,
    ContactComponent,
    FooterComponent,
    MainComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    HomeService,
    AboutService,
    SkillsService,
    QualificationService,
    ServicesService,
    PortfolioService,
    ContactService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
