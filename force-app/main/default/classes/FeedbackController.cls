/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 10-09-2023
 * @last modified by  : Meenakshi Telu
**/

public without sharing class FeedbackController {
    @AuraEnabled
    public static String createFeedbackRecord(Feedback_Collector__c feedbackRecord) {
      try {
        insert feedbackRecord;
        return 'Success';
        throw new AuraHandledException('Please select atlease one Contact Role');
      


      } catch (Exception e) {
        return 'Error: ' + e.getMessage();
      }
    }
  }