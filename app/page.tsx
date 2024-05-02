"use client";
import { useState } from "react";

const Home = () => {
	const [key, setKey] = useState("");
	const [value, setValue] = useState("");

	return (
		<div>
			<h1>Home</h1>
			<input type="text" placeholder="Key" value={key} onChange={(e) => setKey(e.target.value)} />
			<input type="text" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
			<button
				onClick={async () => {
					const res = await fetch("/api/createEntry", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ key, value }),
					});
					if (res.ok) {
						alert("Entry created");
					} else {
						alert("Failed to create entry");
					}
				}}>
				Create Entry
			</button>
		</div>
	);
};

export default Home;
