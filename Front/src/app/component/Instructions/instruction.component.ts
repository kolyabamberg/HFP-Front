import {Component, NgModule} from "@angular/core";
import {Instruction} from "../../model/Instruction";
import {User} from "../../model/user";
import {Step} from "../../model/Step";
import {Section} from "../../model/Section";
import {AuthGuard} from "../../service/guards/auth.guards";
import {ListStepComponent} from "./List/listStep.component";
import {EditorStepComponent} from "./Editor/editorStep.component";
import {InstructionService} from "../../service/InstructionService";

// @NgModule({
//   imports:[ListStepComponent, EditorStepComponent]
// })

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})

export class InstructionComponent {
  protected project: Instruction = new Instruction;
  user: User;
  tags: string[];
  position: number = 0;
  isDisabledButtonAdd: boolean = false;
  instruction: Instruction;
  steps: Step[];

  currentTopic: Section = new Section();
  sections: Section[] = [new Section(1, 'IT'), new Section(2, 'Books')];

  constructor(private instructionService: InstructionService,
              protected authGuard: AuthGuard) {
    // this.project.image = 'http://res.cloudinary.com/crowbanding/image/upload/v1505210950/azufvfotm2nypj55ebnm.png';
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.instruction = new Instruction();
  }

  ngOnInit() {
    this.getSection();
  }

  getSection() {
    this.instructionService
      .getSections()
      .subscribe(sections => this.sections = sections);
  }

  getSteps(instructionId: number) {
    this.instructionService
      .getSteps(instructionId)
      .subscribe( steps => this.steps = steps);
  }
}
