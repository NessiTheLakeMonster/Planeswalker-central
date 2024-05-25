import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tienda-detail',
  standalone: true,
  imports: [],
  templateUrl: './tienda-detail.component.html',
  styleUrl: './tienda-detail.component.css'
})
export class TiendaDetailComponent implements OnInit {
  idArticulo: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.idArticulo = params.get('id') ?? '';
    });
  }
}
