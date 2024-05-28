import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planificador-manual',
  standalone: true,
  imports: [],
  templateUrl: './planificador-manual.component.html',
  styleUrl: './planificador-manual.component.css'
})
export class PlanificadorManualComponent {

  constructor(
    private router: Router
  ) { }

  btnRecomendador() {
    this.router.navigate(['/recomendador']);
  }

}
