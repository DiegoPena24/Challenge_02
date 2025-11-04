import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Project } from '../../../models/project.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  displayedColumns = ['id', 'title', 'status', 'actions'];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private api: ApiService, private snack: MatSnackBar, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.api.getProjects().subscribe({
      next: data => { this.projects = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  edit(p: Project) { this.router.navigate(['/projects/edit', p.id]); }

  delete(p: Project) {
    if (!p.id) return;
    if (!confirm(`Eliminar proyecto "${p.title}"?`)) return;
    this.api.deleteProject(p.id).subscribe({
      next: () => {
        this.snack.open('Proyecto eliminado', 'Cerrar', { duration: 2000 });
        this.projects = this.projects.filter(x => x.id !== p.id);
        this.table.renderRows();
      }
    });
  }
}
