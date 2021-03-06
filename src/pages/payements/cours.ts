import {Course} from "../../app/models/course";
import {SyllabusView} from "../../app/models/syllabusView";
import {User} from '../../app/models/user';
import {SyllabusService} from "../../app/services/syllabus.service";
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {CoursEditPage} from './cours-edit'; 
@Component({
  selector: 'page-cours',
  templateUrl: 'cours.html'
})
export class CoursPage {
  syllabuses: SyllabusView[];
  public courses: Course[];
  course: Course = new Course();
  user: User = JSON.parse(Cookie.get('loggedInUser'));
  constructor(public navCtrl: NavController,
    private syllabusService: SyllabusService) {
    this.getCourseByTeacher(this.user);
  }
  public getCourseByTeacher(user: User): void {
    this.courses = [];
    this.syllabusService.getByTeacher(user)
      .subscribe((data: Course[]) => {
        this.courses = data
      },
      error => console.log(error),
      () => console.log('Get all Courses complete'));
  }
  public getSyllabuses(evt) {
    this.course = evt.data;
    this.syllabusService.getSyllabuses(this.course.id + '', this.course.classe.level.id + '',
      this.course.subject.id + '')
      .subscribe((data: SyllabusView[]) => {
        this.syllabuses = data
      },
      error => console.log(error),
      () => console.log('Get syllabuses complete'));
  }

  public saveSyllabusEvent(event) {
    this.syllabusService.save(event.data).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(event.data)] = data;
      var onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }

  public saveSyllabus(syllabusView) {
    var sy: SyllabusView = syllabusView;
    this.syllabusService.save(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }

  public saveSyllabusStatus(syllabusView) {
    const sy: SyllabusView = syllabusView;
    this.syllabusService.saveStatus(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }

  chooseCourse(aCourse: Course){
        this.navCtrl.push(CoursEditPage, {
      course: aCourse
    });
  }

}
