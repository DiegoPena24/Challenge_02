import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnInit {
  loading = false;
  id?: number;
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['PENDING']
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    public router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) this.load();
  }

  load(): void {
    if (!this.id) return;
    this.loading = true;
    this.api.getProject(this.id).subscribe({
      next: (p) => { this.form.patchValue(p); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  save(): void {
    if (this.form.invalid) return;
    const payload: Project = {
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      status: (this.form.value.status as 'PENDING' | 'ACTIVE' | 'DONE') ?? 'PENDING'
    };
    this.loading = true;
    if (this.id) {
      this.api.updateProject(this.id, payload).subscribe({
        next: () => { this.snack.open('Proyecto actualizado', 'Cerrar', { duration: 2000 }); this.router.navigate(['/projects']); },
        error: () => { this.loading = false; }
      });
    } else {
      this.api.createProject(payload).subscribe({
        next: () => { this.snack.open('Proyecto creado', 'Cerrar', { duration: 2000 }); this.router.navigate(['/projects']); },
        error: () => { this.loading = false; }
      });
    }
  }
}
