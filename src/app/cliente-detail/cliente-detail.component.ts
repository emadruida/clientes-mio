import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css'],
})
export class ClienteDetailComponent implements OnInit {
  cliente?: Cliente;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteService
      .getCliente(id)
      .subscribe((cliente) => (this.cliente = cliente));
  }

  goBack() {
    this.location.back();
  }

  guardarCliente(): void {
    if (this.cliente) {
      this.clienteService
        .updateCliente(this.cliente)
        .subscribe(() => this.goBack());
    }
  }
}
