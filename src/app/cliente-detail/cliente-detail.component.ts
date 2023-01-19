import { Location } from '@angular/common';
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
  titulo?: string;
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
    if (id) {
      this.titulo = "Modificación del cliente";
      this.clienteService
        .getCliente(id)
        .subscribe((cliente) => (this.cliente = cliente));
    } else {
      this.titulo = "Nuevo cliente";
      this.cliente = {} as Cliente;
    }
  }

  goBack() {
    this.location.back();
  }

  guardarCliente(): void {
    if (this.cliente) {
      if (this.cliente.id) {
        this.clienteService
          .updateCliente(this.cliente)
          .subscribe(() => this.goBack());
      } else {
        this.clienteService
          .addCliente(this.cliente)
          .subscribe(() => this.goBack());
      }
    }
  }
}
