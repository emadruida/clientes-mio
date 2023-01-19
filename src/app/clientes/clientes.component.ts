import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }

  borrar(id: number): void {
    const opcion = confirm(
      `¿Seguro que quieres borrar a '${this.describeCliente(id)}'?`
    );
    if (opcion) {
      this.clienteService
        .deleteCliente(id)
        .subscribe(
          () => (this.clientes = this.clientes.filter((c) => id !== c.id))
        );
    }
  }

  private describeCliente(id: number): string {
    const cliente = this.clientes.find((c) => c.id === id)!;
    return `${cliente.nombre} ${cliente.apellidos} (id=${cliente.id})`;
  }
}
