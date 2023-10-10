trigger Case_assignment_trigger on Sentiment_Analysis__c (before insert) {
for (sentiment_Analysis__c sc:trigger.new){
        if(sc.Name=='-1'){
			AssignmentRule AR = new AssignmentRule();
			AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true limit 1];

			//Creating the DMLOptions for "Assign using active assignment rules" checkbox
			Database.DMLOptions dmlOpts = new Database.DMLOptions();
			dmlOpts.assignmentRuleHeader.assignmentRuleId= AR.id;
			dmlOpts.EmailHeader.TriggerUserEmail=true;
            dmlopts.EmailHeader.triggerAutoResponseEmail=true;
			Case newCase = new Case(Status = 'New') ;
			//Setting the DMLOption on Case instance
			newCase.setOptions(dmlOpts);
            System.debug(sc.Id);
            System.debug(newCase.Sentiment_Analysis__c);
            System.debug('dtdth    '+dmlOpts.assignmentRuleHeader.assignmentRuleId);
           	newCase.Sentiment_Analysis__c=sc.Id;
			insert newCase ;
        }
    }
}