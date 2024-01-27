import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeTableModule } from 'primeng/treetable';
import { SharedService } from './services/shared.service';
import { BranchDetails } from './enums/branch-details.enums';
import { Courses } from './models/row-data.dto';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TreeTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 public treeData: WritableSignal<any[]> = signal([]);

  constructor(private sharedService: SharedService) {
    effect(() => {
      console.log('treeData::', this.treeData());
    });
  }

  ngOnInit(): void {
    const DATA: Courses[] = [...this.sharedService.getRawCourseData()];
    let treeData: any[] = [];
    DATA.forEach((ele: Courses) => {
      if (ele.subBranchOf !== BranchDetails.NONE) {
        const indexOf = DATA.findIndex(d => d.name === ele.subBranchOf);
        if (indexOf !== -1) {
          if (!(DATA as any[])[indexOf].children || !((DATA as any[])[indexOf]?.children as any[][]).length) {
            (DATA as any[])[indexOf].children = [];
          }
          (DATA as any[])[indexOf]?.children.push(ele);
        }
      }
    });

    DATA.forEach(ele => {
      if (ele.subBranchOf == BranchDetails.NONE) {
        treeData.push(ele);
      }
    });

    this.treeData.set(treeData);
    treeData = this.transformData(this.treeData());
    this.treeData.set(treeData);
  }

  transformData(data: any[]): any[] {
    return data.map(item => {
      const { children, ...parent } = item;
      const transformedItem = {
        data: {
          ...parent
        },
        children: [] as any[]
      };
      if (children && children.length > 0) {
        transformedItem.children = this.transformData(children);
      }
      return transformedItem;
    });
  }
}
