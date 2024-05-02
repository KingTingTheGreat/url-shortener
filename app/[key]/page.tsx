"use client";
import { useParams, redirect } from "next/navigation";
import { useState } from "react";

const KeyPage = () => {
	const { key } = useParams();
	const [value, setValue] = useState("");

	fetch(`/api/getEntry?key=${key}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			setValue(data.value);
		});

	if (value) {
		return redirect(value);
	}

	// if no value, show loading
	// if no entry exists for this key, will show loading forever
	return <div>loading...</div>;
};

export default KeyPage;
