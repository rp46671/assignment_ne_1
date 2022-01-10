import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  dataList: any[] = [];
  dataList2: any[] = [];
  editDataForm!: FormGroup;
  addDataFrom!: FormGroup;
  _blankValue: any;
  editValue: any;
  searchTitle: any;
  searchuserId: any;
  searchBody: any;
  constructor(private dataService: DataService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private nbgModal: NgbModal) { }

  ngOnInit(): void {
    this.getDta();
  }
  getDta() {
    this.dataService.getData().subscribe(
      (res: any) => {
        this.dataList = res;
        this.dataList2 = this.dataList;
        console.log(this.dataList);
      },
      (err) => {
        console.log(err);
      }
    );

  }
  /***
 * For delete Function
 */
  deleteValue(id: any) {
    this.dataList2.forEach((ele, index) => {
      if (ele.id == id) {
        this.dataList2.splice(index, 1);
      }
    })
  }
  /***
   * For edit Function
   */
  getEditFromBinding(data: any) {
    this.editDataForm = this.formBuilder.group({
      editTitle: [data.title, Validators.required],
      editBody: [data.body, Validators.required],
      editUser_Id: [data.userId, Validators.required],

    });
  }
  get editTitle() { return this.editDataForm?.get('editTitle'); }
  get editBody() { return this.editDataForm?.get('editBody'); }
  get editUser_Id() { return this.editDataForm?.get('editUser_Id'); }

  confirmEditModal(content: any, value: any) {
    this.editValue = value;
    this.getEditFromBinding(value)
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static',
      keyboard: false,
    })
      .result.then((result) => {
        this.submitEditDetails(value);
        this.editDataForm?.reset();
      }, (reason) => {
        this.editDataForm?.reset();
      });


  }

  submitEditDetails(value: any) {
    this.dataList2.forEach((ele, index) => {
      if (ele.id == value.id) {
        this.dataList2[index].title = this.editTitle?.value
        this.dataList2[index].body = this.editBody?.value
        this.dataList2[index].userId = this.editUser_Id?.value
      }
    })

  }

  /***
   * For add Function
   */

  confirmAddModal(content: any) {
    this.getAddFromBinding()
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static',
      keyboard: false,
    })
      .result.then((result) => {
        this.submitAddDetails();
        this.addDataFrom?.reset();
      }, (reason) => {
        this.addDataFrom?.reset();
      });


  }
  getAddFromBinding() {
    this.addDataFrom = this.formBuilder.group({
      addTitle: ["", Validators.required],
      addBody: ["", Validators.required],
      addUser_Id: ["", Validators.required],

    });
  }
  get addTitle() { return this.addDataFrom?.get('addTitle'); }
  get addBody() { return this.addDataFrom?.get('addBody'); }
  get addUser_Id() { return this.addDataFrom?.get('addUser_Id'); }

  submitAddDetails() {
    this.dataList2.unshift({
      body: this.addBody?.value,
      id: this.dataList2[this.dataList2.length - 1].id + 1,
      title: this.addTitle?.value,
      userId: this.addUser_Id?.value
    })
  }

  filterData() {
    if (this.searchTitle) {
      this.dataList2 = this.dataList.filter(data => data.title == this.searchTitle)
    } else if (this.searchBody) {
      console.log("this.dataList",this.dataList)
      this.dataList2 = this.dataList.filter(word => word.body.toLowerCase().indexOf(this.searchBody.toLowerCase()) > -1);
    }
    else if (this.searchuserId) {
      console.log(this.searchuserId)
      this.dataList2 = this.dataList.filter(data => data.userId === this.searchuserId);
      console.log(this.dataList2)
    } else {
      this._blankValue = " No Data Found"
      console.log(" No Data Found")
    }
  }
  clearFiltler() {
    this.searchuserId = null;
    this.searchBody = null;
    this.searchTitle = null;
    this.dataList2 = this.dataList;
  }
}