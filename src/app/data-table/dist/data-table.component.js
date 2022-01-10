"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataTableComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DataTableComponent = /** @class */ (function () {
    function DataTableComponent(dataService, modalService, formBuilder, nbgModal) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.nbgModal = nbgModal;
        this.dataList = [];
        this.dataList2 = [];
    }
    DataTableComponent.prototype.ngOnInit = function () {
        this.getDta();
    };
    DataTableComponent.prototype.getDta = function () {
        var _this = this;
        this.dataService.getData().subscribe(function (res) {
            _this.dataList = res;
            _this.dataList2 = _this.dataList;
            console.log(_this.dataList);
        }, function (err) {
            console.log(err);
        });
    };
    /***
   * For delete Function
   */
    DataTableComponent.prototype.deleteValue = function (id) {
        var _this = this;
        this.dataList2.forEach(function (ele, index) {
            if (ele.id == id) {
                _this.dataList2.splice(index, 1);
            }
        });
    };
    /***
     * For edit Function
     */
    DataTableComponent.prototype.getEditFromBinding = function (data) {
        this.editDataForm = this.formBuilder.group({
            editTitle: [data.title, forms_1.Validators.required],
            editBody: [data.body, forms_1.Validators.required],
            editUser_Id: [data.userId, forms_1.Validators.required]
        });
    };
    Object.defineProperty(DataTableComponent.prototype, "editTitle", {
        get: function () { var _a; return (_a = this.editDataForm) === null || _a === void 0 ? void 0 : _a.get('editTitle'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "editBody", {
        get: function () { var _a; return (_a = this.editDataForm) === null || _a === void 0 ? void 0 : _a.get('editBody'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "editUser_Id", {
        get: function () { var _a; return (_a = this.editDataForm) === null || _a === void 0 ? void 0 : _a.get('editUser_Id'); },
        enumerable: false,
        configurable: true
    });
    DataTableComponent.prototype.confirmEditModal = function (content, value) {
        var _this = this;
        this.editValue = value;
        this.getEditFromBinding(value);
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static',
            keyboard: false
        })
            .result.then(function (result) {
            var _a;
            _this.submitEditDetails(value);
            (_a = _this.editDataForm) === null || _a === void 0 ? void 0 : _a.reset();
        }, function (reason) {
            var _a;
            (_a = _this.editDataForm) === null || _a === void 0 ? void 0 : _a.reset();
        });
    };
    DataTableComponent.prototype.submitEditDetails = function (value) {
        var _this = this;
        this.dataList2.forEach(function (ele, index) {
            var _a, _b, _c;
            if (ele.id == value.id) {
                _this.dataList2[index].title = (_a = _this.editTitle) === null || _a === void 0 ? void 0 : _a.value;
                _this.dataList2[index].body = (_b = _this.editBody) === null || _b === void 0 ? void 0 : _b.value;
                _this.dataList2[index].userId = (_c = _this.editUser_Id) === null || _c === void 0 ? void 0 : _c.value;
            }
        });
    };
    /***
     * For add Function
     */
    DataTableComponent.prototype.confirmAddModal = function (content) {
        var _this = this;
        this.getAddFromBinding();
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static',
            keyboard: false
        })
            .result.then(function (result) {
            var _a;
            _this.submitAddDetails();
            (_a = _this.addDataFrom) === null || _a === void 0 ? void 0 : _a.reset();
        }, function (reason) {
            var _a;
            (_a = _this.addDataFrom) === null || _a === void 0 ? void 0 : _a.reset();
        });
    };
    DataTableComponent.prototype.getAddFromBinding = function () {
        this.addDataFrom = this.formBuilder.group({
            addTitle: ["", forms_1.Validators.required],
            addBody: ["", forms_1.Validators.required],
            addUser_Id: ["", forms_1.Validators.required]
        });
    };
    Object.defineProperty(DataTableComponent.prototype, "addTitle", {
        get: function () { var _a; return (_a = this.addDataFrom) === null || _a === void 0 ? void 0 : _a.get('addTitle'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "addBody", {
        get: function () { var _a; return (_a = this.addDataFrom) === null || _a === void 0 ? void 0 : _a.get('addBody'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "addUser_Id", {
        get: function () { var _a; return (_a = this.addDataFrom) === null || _a === void 0 ? void 0 : _a.get('addUser_Id'); },
        enumerable: false,
        configurable: true
    });
    DataTableComponent.prototype.submitAddDetails = function () {
        var _a, _b, _c;
        this.dataList2.unshift({
            body: (_a = this.addBody) === null || _a === void 0 ? void 0 : _a.value,
            id: this.dataList2[this.dataList2.length - 1].id + 1,
            title: (_b = this.addTitle) === null || _b === void 0 ? void 0 : _b.value,
            userId: (_c = this.addUser_Id) === null || _c === void 0 ? void 0 : _c.value
        });
    };
    DataTableComponent.prototype.filterData = function () {
        var _this = this;
        if (this.searchTitle) {
            this.dataList2 = this.dataList.filter(function (data) { return data.title == _this.searchTitle; });
        }
        else if (this.searchBody) {
            console.log("this.dataList", this.dataList);
            this.dataList2 = this.dataList.filter(function (word) { return word.body.toLowerCase().indexOf(_this.searchBody.toLowerCase()) > -1; });
        }
        else if (this.searchuserId) {
            console.log(this.searchuserId);
            this.dataList2 = this.dataList.filter(function (data) { return data.userId === _this.searchuserId; });
            console.log(this.dataList2);
        }
        else {
            this._blankValue = " No Data Found";
            console.log(" No Data Found");
        }
    };
    DataTableComponent.prototype.clearFiltler = function () {
        this.searchuserId = null;
        this.searchBody = null;
        this.searchTitle = null;
        this.dataList2 = this.dataList;
    };
    DataTableComponent = __decorate([
        core_1.Component({
            selector: 'app-data-table',
            templateUrl: './data-table.component.html',
            styleUrls: ['./data-table.component.scss']
        })
    ], DataTableComponent);
    return DataTableComponent;
}());
exports.DataTableComponent = DataTableComponent;
