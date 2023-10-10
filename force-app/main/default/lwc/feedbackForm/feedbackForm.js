import { LightningElement, track, wire, api } from 'lwc';
import createFeedbackRecord from '@salesforce/apex/FeedbackController.createFeedbackRecord';



export default class FeedbackCollector extends LightningElement {

  isModalOpen = false;
  @track errorMessage;
  @track showErrorModal = '';
  @track selectedOption = '';
  friendlinessrating;
  knowledgeRating;
  guidanceRating;
  efficiencyRating;
  @track name = '';
  @track email = '';
  @track phone = '';
  @track feedbackRating = '';
  feedbackRating2;
  feedbackRating3;
  feedback2;
  firstName;
  lastName;

  closeErrorModal(event) {
   
    this.showErrorModal = false;
    location.reload();
  }




  @track selectedOption = ''; // To store the selected option
  @track picklistOptions = [
    { label: 'Very Satisfied', value: 'Very Satisfied' },
    { label: 'Fairy Satisfied	', value: 'Fairy Satisfied' },
    { label: 'Neither Satisfied nor Dissatisfied', value: 'Neither Satisfied nor Dissatisfied' },
    { label: 'Fairly Dissatisfied', value: 'Fairly Dissatisfied' },
    { label: 'Very Dissatisfied', value: 'Very Dissatisfied' },
    // Add more options as needed
  ];
  handlePicklistChange(event) {
    this.selectedOption = event.detail.value;

  }

  rating(event) {
    event.preventDefault();

    console.log(event.target.name);
    if (event.target.name === "friendliness") {
      this.friendlinessrating = event.target.value;
    }
    if (event.target.name === "knowledge") {
      this.knowledgeRating = event.target.value;
    }
    if (event.target.name === "guidance") {
      this.guidanceRating = event.target.value;
    }
    if (event.target.name === "efficiency") {
      this.efficiencyRating = event.target.value;
      console.log(this.efficiencyRating);
    }
  }




  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handleFeedbackChange(event) {
    console.log(event.target.name);

    if (event.target.name === "feedback") {
      this.feedbackRating = event.target.value;
    }
    if (event.target.name === "feedback2") {
      this.feedbackRating2 = event.target.value;
    }
    if (event.target.name === "feedback3") {
      this.feedbackRating3 = event.target.value;
    }
    this.feedback = event.target.value;
  }
  handlePhoneChange(event) {
    this.phone = event.target.value;
  }
  handlefirstNameChange(event) {
    this.firstName = event.target.value;
  }
  handlelastNameChange(event) {
    this.lastName = event.target.value;
  }
  handleSubmit() {
    const feedbackRecord = {
      Name: this.name,
      Email__c: this.email,
      Feedback__c: this.feedbackRating,
      Feedback2__c: this.feedbackRating2,
      Feedback3__c: this.feedbackRating3,
      Knowledge_Rating__c: this.knowledgeRating,
      Friendliness_Rating__c: this.friendlinessrating,
      Guidance_Rating__c: this.guidanceRating,
      Satisfaction_Rating__c: this.selectedOption,
      Efficiency_Rating__c: this.efficiencyRating,
      Phone__c: this.phone,
      First_Name__c: this.firstName,
      Last_Name__c: this.lastName


    };

    createFeedbackRecord({ feedbackRecord })
      .then(result => {
        // Handle success, e.g., show a success message
        console.log('Feedback submitted successfully', result);
       
        this.showErrorModal = true;


      })
      .catch(error => {
        // Handle errors, e.g., display an error message
        console.error('Error submitting feedback', error.log);
      });
  }
}