import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SolarSystemComponent } from "./solar-system/solar-system.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SolarSystemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Solar_System';
}



     