"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Question_1 = require("../Question");
var assessment_questions_service_1 = require("../assessment-questions.service");
var ImportQuestionComponent = /** @class */ (function () {
    function ImportQuestionComponent(router, assessmentQuestionsService) {
        this.router = router;
        this.assessmentQuestionsService = assessmentQuestionsService;
        this.extCheck = false;
        this.extation = ".csv";
        this.AssessmentQuestions = new Question_1.AssessmentQuestions();
        this.AssessmentQuestion = new Question_1.AssessmentQuestions();
        this.lines = [];
    }
    ImportQuestionComponent.prototype.ngOnInit = function () {
    };
    ImportQuestionComponent.prototype.fileChangeListener = function (event) {
        var _this = this;
        this.filename = event.target.files[0].name;
        this.link = event.target.files[0];
        this.ext = this.filename.substring(this.filename.lastIndexOf('.')).toLowerCase();
        if (this.isCSVFile(this.ext)) {
            var reader_1 = new FileReader();
            reader_1.readAsText(this.link);
            reader_1.onload = function (data) {
                var csvData = reader_1.result;
                var csvRecordsArray = csvData.split(/\r|\n|\n/);
                var headersRow = _this.getHeaderArray(csvRecordsArray);
                _this.AssessmentQuestions = _this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
            };
        }
        else {
            alert("please enter a csv file");
        }
        console.log(this.filename[0] + "___________");
        console.log(this.link + "**************");
    };
    ImportQuestionComponent.prototype.getDataRecordsArrayFromCSVFile = function (csvRecordsArray, headerLength) {
        for (var i_1 = 1; i_1 < csvRecordsArray.length; i_1++) {
            var data = csvRecordsArray[i_1].split(',');
            if (data.length == headerLength) {
                var dataArr = [];
                for (var j = 0; j < headerLength; j++) {
                    dataArr.push(data[j]);
                }
                this.lines.push(dataArr);
            }
        }
        console.log(this.lines.length);
        for (var i = 0; i < this.lines.length; i++) {
            console.log("adduser of row" + this.lines[i][0]);
        }
        return null;
    };
    ImportQuestionComponent.prototype.getHeaderArray = function (csvRecordsArr) {
        var headers = csvRecordsArr[0].split(',');
        var headerArray = [];
        for (var j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    };
    ImportQuestionComponent.prototype.isCSVFile = function (extn) {
        this.extCheck = (extn === this.extation);
        return this.extCheck;
    };
    ImportQuestionComponent.prototype.importData = function () {
        for (var i = 0; i < this.lines.length; i++) {
            this.AssessmentQuestion.questionId = this.lines[i][0];
            this.AssessmentQuestion.assessmentTypeForCloudProvider = this.lines[i][1];
            this.AssessmentQuestion.assessmentTypeForCloudable = this.lines[i][2];
            this.AssessmentQuestion.assessmentTypeForMigration = this.lines[i][3];
            this.AssessmentQuestion.createdBy = this.lines[i][4];
            this.AssessmentQuestion.cteatedTime = this.lines[i][5];
            this.AssessmentQuestion.isActive = this.lines[i][6];
            this.AssessmentQuestion.isDelete = this.lines[i][7];
            this.AssessmentQuestion.modifiedBy = this.lines[i][8];
            this.AssessmentQuestion.modifiedTime = this.lines[i][9];
            this.AssessmentQuestion.numberOfOption = this.lines[i][10];
            this.AssessmentQuestion.questionDescription = this.lines[i][11];
            this.AssessmentQuestion.questionDisplayOrder = this.lines[i][12];
            this.AssessmentQuestion.questionText = this.lines[i][13];
            this.AssessmentQuestion.questionType = this.lines[i][14];
            console.log("this.lines[i][0]" + this.lines[i][0]);
            console.log("this.lines[i][1]" + this.lines[i][1]);
            console.log("this.lines[i][2]" + this.lines[i][2]);
            console.log("this.lines[i][3]" + this.lines[i][3]);
            this.assessmentQuestionsService.createQuestionn(this.AssessmentQuestion)
                .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
            console.log("success");
            this.router.navigate(['/assessment-questions']);
        }
    };
    ImportQuestionComponent = __decorate([
        core_1.Component({
            selector: 'app-import-question',
            templateUrl: './import-question.component.html',
            styleUrls: ['./import-question.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, assessment_questions_service_1.AssessmentQuestionsService])
    ], ImportQuestionComponent);
    return ImportQuestionComponent;
}());
exports.ImportQuestionComponent = ImportQuestionComponent;
//# sourceMappingURL=import-question.component.js.map