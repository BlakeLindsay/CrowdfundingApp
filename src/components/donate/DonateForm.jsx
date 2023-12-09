import DonateButton from "./DonateButton";

import { useState } from "react";

export function DonateForm() {
	// ** State for the `proudctId`
	const [amount, setAmount] = useState(10);

	return (
		<form>
			<input type="number" onChange={(e) => {setAmount(e.target.value)}}/>
			<DonateButton amount={amount} />
		</form>
	);
};

export default DonateForm;