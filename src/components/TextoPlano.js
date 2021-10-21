import React, { useCallback, useContext, useEffect } from "react";
import { Typography, TextField } from "@mui/material";
import { ViewContext } from "./View";

export const TextoPlano = () => {
	const { textPlain, key, setTextPlain, setKey } = useContext(ViewContext);

	const handleReset = useCallback(() => {
		setTextPlain("");
		setKey("");
	}, [setTextPlain, setKey]);

	useEffect(() => {
		handleReset();
	}, [handleReset]);

	const handleTextPlain = (e) => {
		setTextPlain(e.target.value);
	};

	const handleKey = (e) => {
		setKey(e.target.value);
	};

	return (
		<React.Fragment>
			<Typography variant="h6" sx={{ mb: 3 }}>
				Introduce un texto plano
			</Typography>
			<TextField
				id="outlined-multiline-flexible"
				label="Texto Plano"
				multiline
				maxRows={4}
				value={textPlain}
				onChange={handleTextPlain}
				fullWidth
			/>
			<Typography variant="h6" sx={{ mb: 3, mt: 5 }}>
				Introduce una clave
			</Typography>
			<TextField
				id="outlined-multiline-flexible"
				label="Clave secreta"
				value={key}
				onChange={handleKey}
				fullWidth
			/>
		</React.Fragment>
	);
};
