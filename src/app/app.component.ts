import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SolarSystemComponent } from "./solar-system/solar-system.component";
import { TransformToolComponent } from "./transform-tool/transform-tool.component";
import { InstancingComponent } from "./instancing/instancing.component";
import { BufferGeometryComponent } from "./buffer-geometry/buffer-geometry.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SolarSystemComponent, TransformToolComponent, InstancingComponent, BufferGeometryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Solar_System';
}



     