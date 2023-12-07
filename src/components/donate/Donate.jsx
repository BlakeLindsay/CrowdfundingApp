import {useState} from 'react';
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style = {"layout":"vertical"};

function Donate() {
	const [paidFor, setPaidFor] = useState(false);
	const [error, setError] = useState(null);

	const handleApprove = (orderID) => {
		// Call backend function to fulfill order

		// if response is successful
		setPaidFor(true);
		// refresh user's account or subscription status

		// if the response returns an error
		setError('approval error');
	}

	if (paidFor) {
		alert('payment success');
	}

	if (error) {
		alert(error);
	}

	return (
		<PayPalScriptProvider options={{ clientId: "AbyIxXLDlr4cgKa-KLMdsF7MJXFIf_CBasZjrtfAnCZUeoutO3Y7ZSPiYut8K33WaKWuHOnb_cUKaqMu", components: "buttons", currency: "USD" }}>
			{/* <ButtonWrapper showSpinner={false} /> */}
			<PayPalButtons
			fundingSource="paypal"
									style={{"layout":"vertical","label":"donate"}}
									disabled={false}
									forceReRender={[style]}
									createOrder={(data, actions) => {
										// return fetch()
										return actions.order.create({
											purchase_units: [{
												amount: {
													breakdown: {
														item_total: {
															currency_code: 'USD',
															value: '10.00'
														}
													},
													currency_code: 'USD',
													value: '10.00'
												},
												items: [{
													category: 'DONATION',
													name: 'test1',
													quantity: '1',
													unit_amount: {
														currency_code: 'USD',
														value: '10.00'
													}
												}]
											}],
											intent: 'CAPTURE'
										})
									}}
									onApprove={async (data, actions) => {
										console.log("data", data);
										console.log('actions: ', actions);
										const order = await actions.order.capture();
										console.log("order: ", order);
										try {
											const response = await fetch(`http://localhost:4000/donation/${data.paymentID}`, {
												method: "POST",
												headers: {
														"Content-Type": "application/json",
												}
												// body: JSON.stringify({
												// 	facilitatorToken: data.facilitatorAccessToken
												// })
											});
											console.log(response);
											const results = await response.json();
											console.log(results);
										} catch (error) {
											console.log(error);
										}
									}}
									onCancel={() => {
										// display cancel message, modal, or redirect user
									}}
									onError={(err) => {
										setError(err);
										console.error('paypal checkout onError', err);
									}}
							/>
		</PayPalScriptProvider>
	);
}

export default Donate;