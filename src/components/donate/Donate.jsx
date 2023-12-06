import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style = {"layout":"vertical"};

function Donate() {
	async function createOrder() {
			// replace this url with your server
			try {
				const results = await fetch("http://localhost:4000/donation/donate", {
					method: "POST",
					headers: {
							"Content-Type": "application/json",
					},
					// use the "body" param to optionally pass additional order information
					// like product ids and quantities
					body: JSON.stringify({
							cart: [
									{
										sku: "etanod01",
                    quantity: 1,
									},
							],
							"intent": "capture"
					}),
			})
			const response = await results.json();
			console.log(response);
			const {id} = response;
			// console.log(order);
			return id;
		} catch (error) {
			console.log(error);
		}


			// return fetch("http://localhost:4000/donation/donate", {
			// 		method: "POST",
			// 		headers: {
			// 				"Content-Type": "application/json",
			// 		},
			// 		// use the "body" param to optionally pass additional order information
			// 		// like product ids and quantities
			// 		body: JSON.stringify({
			// 				cart: [
			// 						{
											
			// 						},
			// 				],
			// 				"intent": "capture"
			// 		}),
			// })
			// 		.then((response) => response.json())
			// 		.then((order) => {
			// 				// Your code here after create the order
			// 				console.log(order);
			// 				return order.id;
			// 		});
	}
	async function onApprove(data) {
		try {
			console.log(data);
			const response = await fetch("http://localhost:4000/donation/complete_donate", {
				method: "POST",
				headers: {
						"Content-Type": "application/json",
				},
				body: JSON.stringify({
						orderID: data.orderID,
						"intent": "capture"
				}),
			});
			const results = await response.json();
			console.log(results);
		} catch (error) {
			console.log(error);
		}

			// replace this url with your server
			// return fetch("http://localhost:4000/donation/complete_donate", {
			// 		method: "POST",
			// 		headers: {
			// 				"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify({
			// 				orderID: data.orderID,
			// 				"intent": "capture"
			// 		}),
			// })
			// 		.then((response) => response.json())
			// 		.then((orderData) => {
			// 				// Your code here after capture the order
			// 				console.log(orderData);
			// 		});
	}

	// Custom component to wrap the PayPalButtons and show loading spinner
	const ButtonWrapper = ({ showSpinner }) => {
			const [{ isPending }] = usePayPalScriptReducer();

			return (
					<>
							{ (showSpinner && isPending) && <div className="spinner" /> }
							<PayPalButtons
									fundingSource="paypal"
									style={{"layout":"vertical","label":"donate"}}
									disabled={false}
									forceReRender={[style]}
									createOrder={createOrder}
									onApprove={onApprove}
							/>
					</>
			);
	}

	return (
		<PayPalScriptProvider options={{ clientId: "AbyIxXLDlr4cgKa-KLMdsF7MJXFIf_CBasZjrtfAnCZUeoutO3Y7ZSPiYut8K33WaKWuHOnb_cUKaqMu", components: "buttons", currency: "USD" }}>
			<ButtonWrapper showSpinner={false} />
		</PayPalScriptProvider>
	);
}

export default Donate;