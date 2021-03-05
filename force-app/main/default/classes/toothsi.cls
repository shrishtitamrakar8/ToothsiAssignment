public class toothsi {

    @AuraEnabled
    public static String getToothsiAPIReponse(Integer field9){
        Http http =new Http();
        
        HttpRequest request = new HttpRequest(); 
        request.setEndpoint('https://www.random.org/integers/?num=1&min=1&max='+field9+'&col=1&base=10&format=plain&rnd=new');
        request.setMethod('GET');

        HttpResponse httpRes = http.send(request);
        String strResponse = '';
        
        if(httpRes.getStatusCode()==200){            
            strResponse = string.valueOf(httpRes.getBody());
        }
        return strResponse;
    }
    
}