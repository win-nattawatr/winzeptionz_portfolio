import { About } from './about.model';
import { Contact } from './contact.model';
import { Home } from './home.model';
import { Portfolio } from './portfolio.model';
import { Qualification } from './qualification.model';
import { Services } from './services.model';
import { Skills } from './skills.model';

export class Main {
  constructor() {}

  home?: Home;
  about?: About;
  qualification?: Qualification;
  services?: Services;
  skills?: Skills;
  portfolio?: Portfolio;
  contact?: Contact;
}
