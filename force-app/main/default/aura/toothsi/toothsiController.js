({
    doInit:function(component,event,helper){
        console.log('usr:'+component.get('v.CurrentUser.Profile.Name'));
        if(component.get("v.CurrentUser.Profile.Name")=='System Administrator'){
            component.set("v.recordTypeId","0120I000001HxBz");
        }
        else if(component.get("v.CurrentUser.Profile.Name")=='Standard User'){
            component.set("v.recordTypeId","0120I000001HxC4QAK");
        }
    },
	onRecordSubmit:function(component,event,helper){
        event.preventDefault(); // stop form submission
        var eventFields = event.getParam("fields");
        var object1RecordId = $A.get("$Label.c.toothsiCustomLabel");
        eventFields["trialshrishti__Object_1__c"] = object1RecordId;
        component.find('recordEditForm').submit(eventFields);
    },
    
    onRecordSuccess:function(component,event,helper){
        var record = event.getParam("response");
        console.log('Record event='+JSON.stringify(record));
        console.log('Record:'+record.id);
    },
    
    field1Change:function(component,event,helper){
        //console.log('Changed Field 1'+JSON.stringify(event.Xo.value));
        var displayField=event.getParam("value");
        /*Value 1.1 changes start*/
        if(displayField=='Value-1.1'){
           component.set("v.displayField2AndField3",true);
        }
        else{
            component.set("v.displayField2AndField3",false);
        }
        /*Value 1.1 changes end*/
        
        /*Value 1.2 changes start*/
        if(displayField=='Value-1.2'){
           component.set("v.displayField4AndField5",true);
        }
        else{
            component.set("v.displayField4AndField5",false);
        }
        /*Value 1.2 changes end*/
        
        /*Value 1.2 changes start*/
        if(displayField=='Value-1.3'){
            if(component.get("v.CurrentUser.Profile.Name")=='System Administrator'){
                component.set("v.displayField6AndField7",true);
            }
            else if(component.get("v.CurrentUser.Profile.Name")=='Standard User'){
                component.set("v.displayField6AndField8",true);
            }
        }
        else{
            component.set("v.displayField6AndField7",false);
            component.set("v.displayField6AndField8",false);
        }
        /*Value 1.3 changes end*/
    },
    field9FocusOut:function(component,event,helper){
        
        var field9Value=component.find("field9").get("v.value");
        console.log('field9='+field9Value);
        //var RegExp = new RegExp(/^\d*\.?\d*$/); 
        /*if (!/^\d*\.?\d*$/.test(field9Value)) { 
                //val = elem.value; 
                console.log('Yes');
            }*/
        if((field9Value!='' || field9Value!==null || field9Value!==undefined) && (/^\d*\.?\d*$/.test(field9Value))){
            var action=component.get("c.getToothsiAPIReponse");
            action.setParams({ field9 : field9Value });
            action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                alert("Respone value: " + response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log('Incomplete Request');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
        }
        else{
            alert('Please enter only a number type value in Field9');
        }
        
    },
    
    selectingField6Value:function(component, event, helper){
        var field6 =event.getParam("value");
        if(field6=='Value-6.1'){
            window.open('https://toothsi.in',"_blank", "width=600", "height=600");
            component.set("v.displayField9",false);
        }
        else if(field6=='Value-6.2'){
            window.open('https://skinnsi.in',"_blank", "width=600", "height=600");
            component.set("v.displayField9",false);
        }else if(field6=='Value-6.3'){
            component.set("v.displayField9",true);
        }
    }
    
})