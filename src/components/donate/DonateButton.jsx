import { useRef, useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function Message({ content }) {
	return <p>{content}</p>
}

export function DonateButton({ amount }) {
  const [message, setMessage] = useState("");
	const navigate = useNavigate();

  return (
    <>
      <PayPalButtons
				disabled={false}
				forceReRender={[ { label: "donate" }]}
        style={[true, { label: "donate" }]}
        createOrder={async () => {
          try {
            const response = await fetch("http://localhost:4000/donation/order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // use the "body" param to optionally pass additional order information
              // like product ids and quantities
              body: JSON.stringify({
                amount,

              }),
            });

            const orderData = await response.json();
						console.log(orderData);

            if (orderData.id) {
              return orderData.id;
            } else {
              const errorDetail = orderData?.details?.[0];
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

              throw new Error(errorMessage);
            }
          } catch (error) {
            console.error(error);
            setMessage(`Could not initiate PayPal Checkout...${error}`);
          }
        }}
        onApprove={async (data, actions) => {
          try {
            const response = await fetch(
              `http://localhost:4000/donation/order/${data.orderID}/capture`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const orderData = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
              return actions.restart();
            } else if (errorDetail) {
              // (2) Other non-recoverable errors -> Show a failure message
              throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`
              );
            } else {
              // (3) Successful transaction -> Show confirmation or thank you message
              // Or go to another URL:  actions.redirect('thank_you.html');
							console.log(orderData);
              const transaction =
                orderData.links[1].href;
							// actions.redirect(transaction);
              setMessage(
                `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
              );
              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );
            }
          } catch (error) {
            console.error(error);
            setMessage(
              `Sorry, your transaction could not be processed...${error}`
            );
          }
        }}
      />
      <Message content={message} />
    </>
  );
}

export default DonateButton;