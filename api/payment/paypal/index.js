var PaymentModel= require('../payment.model');

var paypal_api = {};
const paypal = require('paypal-rest-sdk');

var config = {
  "port" : 5000,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AUDrebZK9jn0hHSlKuCYIL0Cy3meT_y8IdlAMdcCAgsS2A9XX_GUlaSxoDSQOGUkKlDLGEE4DCo9fE7H",  // your paypal application client id
    "client_secret" : "EDfVIwq0FJRj1A7_-5DG2w2A9g0ZmavSuprPWOv2TgrC2LTlWlvWLNqwNOW3sI2wey_1AkmvbiCOIwKw" // your paypal application secret id
  }
}
paypal.configure(config.api);
 
paypal_api.paynow = function(paymentData, callback) {
    var response = {};
	var execute_url = 'http://localhost:9000/api/payment/paypal/execute';
	var cancel_url = 'http://localhost:9000/api/payment/paypal/cancel';
    const payment = {
        "intent" : "authorize",
        "payer": {
				"payment_method": "paypal"
			},
			"redirect_urls": {
				"return_url": "http://localhost:8080/redirect/?url=" + execute_url,
				"cancel_url": "http://localhost:8080/redirect/?url=" + cancel_url
			},
			"transactions": [{
				"amount": {
					"total": "2", // paymentData.amount_to_pay,
					"currency": "USD"
				},
				"description": paymentData.payment_description
			}]
    }

    paypal.payment.create(payment, function (error, payment) {
			if (error) {
				console.log(error);
			} else {
		    	if(payment.payer.payment_method === 'paypal') {
		    		response.paymentID = payment.id;
		    		var redirectUrl;
		    		response.payment = payment;
		    		for(var i=0; i < payment.links.length; i++) {
		    			var link = payment.links[i];
		    			if (link.method === 'REDIRECT') {
		    				redirectUrl = link.href;
		    			}
		    		}
		    		response.redirectUrl = redirectUrl;
		    	}
		    }
		    /* 
		    * Sending Back Paypal Payment response 
		    */
		    callback(error,response);
		});

}

paypal_api.execute = function(paymentInfo, callback) {
	console.log('execute payment called');
    var response = {};
		
		// const serverAmount = parseFloat(data.paypalData.payment.transactions[0].amount.total);
		// const clientAmount = parseFloat(data.clientData.price);
		// const paymentId = data.paypalData.paymentId;
		const details = {
			"payer_id": paymentInfo.payerId
		};

        console.log('payer id - ' + paymentInfo.payerId);
        console.log('payment id - ' + paymentInfo.paymentId);
        console.log('user id - ' + paymentInfo.userId);
		// response.userData= {
		// 	userID : data.sessionData.userID,
		// 	name : data.sessionData.name
		// };

		// if (serverAmount !== clientAmount) {
		// 	response.error = true;
		// 	response.message = "Payment amount doesn't matched.";
		// 	callback(response);
		// } else{
			
			paypal.payment.execute(paymentInfo.paymentId, details, 
								function (error, payment) {
				if (error) {
					console.log(error);
					response.error = true;
					response.message = "Execute Payment Failed from Paypal.";
					callback(error, response);
				} else {

					/*
					* inserting paypal Payment in DB
					*/
					var totalAmountPaid = 0;
					if(payment.transactions) {
						payment.transactions.forEach(function(element) {
							totalAmountPaid += element.amount;
						}, this);
					}
					const insertPayment={
					    user_id : paymentInfo.userId,
					    gateway_payment_id : payment.id,
						gateway_payer_id: payment.payer.payer_info.payer_id,
					    payment_time : payment.create_time,
						payer_email: payment.payer.payer_info.email,
						payer_first_name: payment.payer.payer_info.first_name,
						payer_last_name: payment.payer.payer_info.last_name,
					    status : payment.state,
					    currency : "USD",
					    amount: totalAmountPaid,
					    cr_date_time : new Date().toISOString()
					}

					PaymentModel.insertPayment(insertPayment,function(err,result){

						if(err){
							response.error = true;
							response.message = "Payment Successful, but not stored.";
							callback(err, response);
						}else{
							response.error = false;
							response.paymentId = result.insertId;
							response.message = "Payment Successfully Stored in DB.";
							callback(err, response);
						};
					});
				};
			});
		
    }



module.exports = paypal_api;