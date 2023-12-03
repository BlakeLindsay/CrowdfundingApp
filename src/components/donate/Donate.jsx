import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style = {"layout":"vertical"};

function Donate() {
	function createOrder() {
			// replace this url with your server
			return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/create-order", {
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
											quantity: 2,
									},
							],
					}),
			})
					.then((response) => response.json())
					.then((order) => {
							// Your code here after create the order
							return order.id;
					});
	}
	function onApprove(data) {
			// replace this url with your server
			return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
					method: "POST",
					headers: {
							"Content-Type": "application/json",
					},
					body: JSON.stringify({
							orderID: data.orderID,
					}),
			})
					.then((response) => response.json())
					.then((orderData) => {
							// Your code here after capture the order
					});
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
		<PayPalScriptProvider options={{ clientId: "AXy-0JzMIvts3Z2ido6QQjaA7uEoTzHiz25pnvRjhAzlrKysP6h0VKj5SlYlj3DThWiPwAgPn7dMWWKG", components: "buttons", currency: "USD" }}>
      <ButtonWrapper showSpinner={false} />
    </PayPalScriptProvider>
	);
}

export default Donate;