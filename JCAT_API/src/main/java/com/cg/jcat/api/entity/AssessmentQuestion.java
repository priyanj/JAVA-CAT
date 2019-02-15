package com.cg.jcat.api.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.cg.jcat.api.utility.QuestionTypeEnum;

/**
 * @author priyanj
 *
 */
@Entity
@Table(name = "assessment_question", uniqueConstraints = { @UniqueConstraint(columnNames = { "question_text_en" }) })
@EntityListeners(AuditingEntityListener.class)
public class AssessmentQuestion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int questionId;

	private boolean assessmentTypeForCloudable;

	private boolean assessmentTypeForCloudProvider;

	private boolean assessmentTypeForMigration;

	@Enumerated(EnumType.STRING)
	private QuestionTypeEnum questionType;

	@NotNull
	@Lob
	@Column(name = "question_text_en")
	private String questionTextEN;

	@Lob
	private String questionTextLang2;

	@Lob
	@Column(name = "question_description_en")
	private String questionDescriptionEN;

	@Lob
	private String questionDescriptionLang2;

	private int numberOfOptions;

	private int displayOrder;

	private boolean isDeleted;

	@NotNull
	@CreatedBy
	private String createdBy;

	@NotNull
	@CreatedDate
	private Date createdTime;

	@LastModifiedBy
	private String modifiedBy;

	@LastModifiedDate
	private Date modifiedTime;

	@OneToMany(mappedBy = "assessmentQuestion",cascade=CascadeType.ALL)
	private List<QuestionOption> questionOption;

	public List<QuestionOption> getQuestionOption() {
		return questionOption;
	}

	public void setQuestionOption(List<QuestionOption> questionOption) {
		this.questionOption = questionOption;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public boolean isAssessmentTypeForCloudable() {
		return assessmentTypeForCloudable;
	}

	public void setAssessmentTypeForCloudable(boolean assessmentTypeForCloudable) {
		this.assessmentTypeForCloudable = assessmentTypeForCloudable;
	}

	public boolean isAssessmentTypeForCloudProvider() {
		return assessmentTypeForCloudProvider;
	}

	public void setAssessmentTypeForCloudProvider(boolean assessmentTypeForCloudProvider) {
		this.assessmentTypeForCloudProvider = assessmentTypeForCloudProvider;
	}

	public boolean isAssessmentTypeForMigration() {
		return assessmentTypeForMigration;
	}

	public void setAssessmentTypeForMigration(boolean assessmentTypeForMigration) {
		this.assessmentTypeForMigration = assessmentTypeForMigration;
	}

	public QuestionTypeEnum getQuestionType() {
		return questionType;
	}

	public void setQuestionType(QuestionTypeEnum questionType) {
		this.questionType = questionType;
	}

	public String getQuestionTextEN() {
		return questionTextEN;
	}

	public void setQuestionTextEN(String questionTextEN) {
		this.questionTextEN = questionTextEN;
	}

	public String getQuestionTextLang2() {
		return questionTextLang2;
	}

	public void setQuestionTextLang2(String questionTextLang2) {
		this.questionTextLang2 = questionTextLang2;
	}

	public String getQuestionDescriptionEN() {
		return questionDescriptionEN;
	}

	public void setQuestionDescriptionEN(String questionDescriptionEN) {
		this.questionDescriptionEN = questionDescriptionEN;
	}

	public String getQuestionDescriptionLang2() {
		return questionDescriptionLang2;
	}

	public void setQuestionDescriptionLang2(String questionDescriptionLang2) {
		this.questionDescriptionLang2 = questionDescriptionLang2;
	}

	public int getNumberOfOptions() {
		return numberOfOptions;
	}

	public void setNumberOfOptions(int numberOfOptions) {
		this.numberOfOptions = numberOfOptions;
	}

	public int getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	
	@Override
	public String toString() {
		return "AssessmentQuestion [questionId=" + questionId + ", assessmentTypeForCloudable="
				+ assessmentTypeForCloudable + ", assessmentTypeForCloudProvider=" + assessmentTypeForCloudProvider
				+ ", assessmentTypeForMigration=" + assessmentTypeForMigration + ", questionType=" + questionType
				+ ", questionTextEN=" + questionTextEN + ", questionTextLang2=" + questionTextLang2
				+ ", questionDescriptionEN=" + questionDescriptionEN + ", questionDescriptionLang2="
				+ questionDescriptionLang2 + ", numberOfOptions=" + numberOfOptions + ", displayOrder=" + displayOrder
				+ ", isDeleted=" + isDeleted + ", createdBy=" + createdBy + ", createdTime=" + createdTime
				+ ", modifiedBy=" + modifiedBy + ", modifiedTime=" + modifiedTime + ", questionOption=" + questionOption
				+ "]";
	}

}
