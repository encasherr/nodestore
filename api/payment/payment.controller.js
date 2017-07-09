var Payment = require('./payment.model');
var paypal = require('./paypal');
var config  = require('../../config/environment');
var Orders = require('../order/order.model');
var Carts = require('../cart/cart.model');

exports.pay_with_paypal = function(req, res) {
    var data = req.body;
    data.amount_to_pay = data.order_amount + data.shipping_amount;
	console.log('total amount_to_pay : ' + data.amount_to_pay);
    if(data.items_list && data.items_list.length > 0){
        var payment_description = '';
        for(var i=0; i < data.items_list.length; i++){
            payment_description += data.items_list[i].title.substring(0,10);
        }
        data.payment_description = payment_description;
    }

    paypal.paynow(data, function(err, result){
        if(err){
            console.log('error occured in paypal payment - ' + err);
            return handleError(res, err); 
		}
        else{
            console.log('payment sent successfully redirecting to - ' + result.redirectUrl);
            console.log('payment id - ' + result.paymentID);
            return res.json(result);
        }
    });
}

exports.execute_payment = function(req, res) {
    // var sessionInfo = req.session;	
		var paymentInfo = {};
		const PayerID = req.body.payerID;
		const paymentId = req.body.paymentID;
		const shippingAddressId = req.body.shippingAddressId;
		paymentInfo.paymentId = req.body.paymentID;
		paymentInfo.payerId = req.body.payerID;
		paymentInfo.userId = req.user.user_id;
		var result = {};
		// if (typeof sessionInfo.sessionData == "undefined" || sessionInfo.sessionData=="") {
			// res.redirect("/");
			// res.end();
            // console.log('session info not defined, payment failed');
		// } else{
			// sessionInfo.state ="success";
			paypal.execute(paymentInfo, function(error, response) {
				if(error) {
					result.status = 'fail';
					result.error = error;
					result.message = 'Payment Execution Failed';
					console.log('payment execution failed - ' + error);
					return res.json(result);
				}
				else {
					console.log('payment executed successfully - ' + response);
					var orderObject = {};
					orderObject.user_id = paymentInfo.userId;
					orderObject.shipping_address_id = shippingAddressId;
					orderObject.payment_id = response.paymentId;
					orderObject.status = 'created';

					Orders.create(orderObject, function(err, orderResult) {
						if(err) {
							result.status = 'fail';
							result.error = err;
							result.message = 'Order Creation Failed';
							console.log('order creation failed - ' + err);
							return res.json(result);
						}
						else {
							var orderId = orderResult.id;
							console.log('sending cart updates for order - ' + orderId);
							Carts.update(orderObject.user_id, orderId,function(err1,res1){
								result.status = 'success';
								result.error = '';
								result.message = 'Order Created Successfully';
								result.order = orderResult;
								console.log('Order created successfully - ' + orderResult);
								return res.json(result);
							})
						}
					});
				}
			});
}

exports.cancel_payment = function(req, res) {
    // sessionInfo = req.session;
		// if (typeof sessionInfo.sessionData == "undefined" || sessionInfo.sessionData=="") {
		// 	res.redirect("/");
		// 	res.end();
		// } else{
			var response ={};
			response.error = true;
			response.message = "Payment unsuccessful.";
			// response.userData = {
			// 	name : sessionInfo.sessionData.name
			// };
			response.status = 'cancelled';
    		console.log('payment cancelled by payer - ' + response);
			return res.json(response);
	
		// }
}

function handleError(res, err) {
  console.log('error: ' + err);
  return res.status(500).send(err);
}